package com.nishany.android.core.rooms

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import com.nishany.android.MainActivity
import com.nishany.android.R

/**
 * Keeps a study-room voice call alive across backgrounding and screen lock.
 *
 * targetSdk 36 requires a typed foreground service for a call that captures
 * audio in the background (`foregroundServiceType="microphone"` in the
 * manifest), so the process is not killed the moment the student switches
 * apps. The [MediasoupVoiceClient] itself lives in the ViewModel; this service
 * is the lifecycle anchor that keeps the process foreground and holds the
 * telephony-style audio route (focus + `MODE_IN_COMMUNICATION`) for as long as
 * the call is up. Started on Join voice, stopped on Leave.
 */
class RoomForegroundService : Service() {

    private var audioManager: AudioManager? = null
    private var focusRequest: AudioFocusRequest? = null
    private var priorMode: Int = AudioManager.MODE_NORMAL

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        ensureChannel()
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle("You're in a study room's voice")
            .setContentText("Tap to return to the room.")
            .setOngoing(true)
            .setSilent(true)
            .setCategory(NotificationCompat.CATEGORY_CALL)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setContentIntent(openAppIntent())
            .build()

        ServiceCompat.startForeground(
            this,
            NOTIFICATION_ID,
            notification,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE else 0,
        )
        acquireAudioRoute()
        // Not restarted if the system kills the process: the call's transports
        // are already dead by then, and the ViewModel restarts the service if
        // the student rejoins.
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        releaseAudioRoute()
        super.onDestroy()
    }

    private fun acquireAudioRoute() {
        val manager = getSystemService(Context.AUDIO_SERVICE) as? AudioManager ?: return
        audioManager = manager
        priorMode = manager.mode
        val request = AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_VOICE_COMMUNICATION)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                    .build(),
            )
            .build()
        focusRequest = request
        manager.requestAudioFocus(request)
        manager.mode = AudioManager.MODE_IN_COMMUNICATION
    }

    private fun releaseAudioRoute() {
        val manager = audioManager ?: return
        focusRequest?.let { manager.abandonAudioFocusRequest(it) }
        manager.mode = priorMode
        focusRequest = null
        audioManager = null
    }

    private fun openAppIntent() = android.app.PendingIntent.getActivity(
        this,
        0,
        Intent(this, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
        android.app.PendingIntent.FLAG_IMMUTABLE,
    )

    private fun ensureChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
        val manager = getSystemService(NotificationManager::class.java)
        if (manager.getNotificationChannel(CHANNEL_ID) != null) return
        manager.createNotificationChannel(
            NotificationChannel(CHANNEL_ID, "Study room voice", NotificationManager.IMPORTANCE_LOW).apply {
                description = "Shown while you are in a study room's voice call."
                setSound(null, null)
            },
        )
    }

    companion object {
        private const val CHANNEL_ID = "study-room-voice"
        private const val NOTIFICATION_ID = 4201

        fun start(context: Context) {
            val intent = Intent(context, RoomForegroundService::class.java)
            context.startForegroundService(intent)
        }

        fun stop(context: Context) {
            context.stopService(Intent(context, RoomForegroundService::class.java))
        }
    }
}
