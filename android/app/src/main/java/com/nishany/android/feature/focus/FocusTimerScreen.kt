package com.nishany.android.feature.focus

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.glance.appwidget.updateAll
import com.nishany.android.AppGraph
import com.nishany.android.design.LocalCortex
import kotlinx.coroutines.launch

/**
 * Wires [FocusViewModel] to [FocusTimerScreen] -- the entry point
 * [com.nishany.android.feature.root.RootScreen] calls from a FAB that stays
 * mounted across every tab, the same way the web shell keeps its Focus
 * Timer trigger mounted regardless of page.
 */
@Composable
fun FocusTimerRoute(graph: AppGraph, onClose: () -> Unit) {
    val appContext = LocalContext.current.applicationContext
    val viewModel: FocusViewModel = viewModel(
        factory = FocusViewModel.factory(
            graph.api,
            FocusSessionStore(appContext),
            FocusTasksStore(appContext),
            FocusNotifier(appContext),
        ),
    )
    FocusTimerScreen(viewModel = viewModel, onClose = onClose)
}

/**
 * The dedicated Focus Timer surface: a full-bleed sheet that slides up from
 * the bottom and retracts the same way it arrived -- a direct mirror of
 * `FocusTimerPanel.tsx`, minus the two things that are the web's alone
 * (fullscreen via the browser's own API is instead this screen's immersive
 * system-bars toggle; the DOM focus trap has no Android analogue, back/close
 * already does the job).
 */
@Composable
fun FocusTimerScreen(viewModel: FocusViewModel, onClose: () -> Unit) {
    val cortex = LocalCortex.current
    val state by viewModel.state.collectAsState()
    val strictSecondsLeft by viewModel.strictWarningSecondsLeft.collectAsState()
    val tasks by viewModel.tasks.tasks.collectAsState()
    val strictBlocking = state.strictArmed && state.running
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    var isFullscreen by rememberSaveable { mutableStateOf(false) }
    var showLeaveConfirm by rememberSaveable { mutableStateOf(false) }
    var showBimaristanComingSoon by rememberSaveable { mutableStateOf(false) }

    fun attemptClose() {
        if (strictBlocking) { showLeaveConfirm = true; return }
        onClose()
    }

    // Strict mode's background grace: this screen's own lifecycle mirrors the
    // single Activity's (there is only one, see MainActivity) -- ON_STOP is
    // "the student left the app" (home button, app switcher, another app to
    // the front), exactly what the web's `blur`/`visibilitychange` pair
    // stands in for. See FocusViewModel's class doc for why the arm/clear
    // calls live here and not on the ViewModel.
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner, viewModel) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_STOP -> viewModel.armStrictGrace()
                Lifecycle.Event.ON_START -> {
                    viewModel.clearStrictGrace()
                    viewModel.resync()
                }
                else -> Unit
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    // Face-down: strict mode's intended "commit" gesture -- OS-level
    // app-blocking is out of scope for this task (deferred), so this is
    // reflected only in copy below, never used to auto-discard or auto-pause.
    // Registered only while strict-blocking, and always unregistered on
    // dispose or the moment strict-blocking stops, per this task's brief.
    var faceDown by remember { mutableStateOf(false) }
    DisposableEffect(strictBlocking) {
        if (!strictBlocking) {
            faceDown = false
            return@DisposableEffect onDispose {}
        }
        val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
        val sensor = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                // Face down: gravity's z-component points strongly negative
                // (a flat phone, screen down, reads close to -9.8 m/s^2).
                faceDown = event.values.getOrNull(2)?.let { it < -8.5f } ?: false
            }
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) = Unit
        }
        if (sensor != null) sensorManager.registerListener(listener, sensor, SensorManager.SENSOR_DELAY_NORMAL)
        onDispose { sensorManager?.unregisterListener(listener) }
    }

    // Immersive fullscreen: hides the system bars for the duration this
    // screen is both open and toggled on; always restored on dispose so
    // closing the panel never leaves the rest of the app in immersive mode.
    val activity = context as? Activity
    fun applyImmersive(hide: Boolean) {
        val window = activity?.window ?: return
        val controller = WindowCompat.getInsetsController(window, window.decorView)
        if (hide) {
            controller.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            controller.hide(WindowInsetsCompat.Type.systemBars())
        } else {
            controller.show(WindowInsetsCompat.Type.systemBars())
        }
    }
    DisposableEffect(Unit) { onDispose { applyImmersive(false) } }

    AnimatedVisibility(
        visible = true,
        enter = slideInVertically(initialOffsetY = { it }),
        exit = slideOutVertically(targetOffsetY = { it }),
    ) {
        Box(modifier = Modifier.fillMaxSize().background(cortex.paper)) {
            Column(modifier = Modifier.fillMaxSize()) {
                FocusTimerHeader(
                    onClose = { attemptClose() },
                    isFullscreen = isFullscreen,
                    onToggleFullscreen = {
                        isFullscreen = !isFullscreen
                        applyImmersive(isFullscreen)
                    },
                    onOpenMusic = { openSystemMusicApp(context) },
                    onOpenBimaristan = { showBimaristanComingSoon = true },
                )

                Column(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth()
                        .verticalScroll(rememberScrollState())
                        .padding(horizontal = 20.dp, vertical = 24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    ModeToggle(mode = state.mode, running = state.running, onSetMode = viewModel::setMode)

                    if (state.mode == FocusMode.COUNTDOWN) {
                        Spacer(Modifier.height(12.dp))
                        DurationPicker(
                            durationSeconds = state.durationSeconds,
                            running = state.running,
                            onSetMinutes = viewModel::setDurationMinutes,
                        )
                    }

                    Spacer(Modifier.height(28.dp))
                    ClockDisplay(state = state, accruedSeconds = viewModel.accruedSeconds())

                    Spacer(Modifier.height(28.dp))
                    TaskPicker(
                        tasks = tasks,
                        selectedTaskId = state.selectedTaskId,
                        onSelect = viewModel::selectTask,
                        onAdd = { title ->
                            viewModel.selectTask(viewModel.tasks.add(title))
                            // Keeps the home-screen to-do widget from waiting on the
                            // OS's own update cadence for a task added just now.
                            scope.launch { FocusTasksWidget().updateAll(context) }
                        },
                    )

                    Spacer(Modifier.height(20.dp))
                    StrictModeRow(
                        armed = state.strictArmed,
                        blocking = strictBlocking,
                        faceDown = faceDown,
                        onSetArmed = viewModel::setStrictArmed,
                    )

                    Spacer(Modifier.height(28.dp))
                    TransportRow(
                        running = state.running,
                        onReset = viewModel::reset,
                        onToggleRunning = viewModel::toggleRunning,
                    )
                }
            }

            if (strictSecondsLeft != null) {
                StrictWarningBanner(secondsLeft = strictSecondsLeft ?: 0, modifier = Modifier.align(Alignment.BottomCenter))
            }
        }
    }

    if (showLeaveConfirm) {
        AlertDialog(
            onDismissRequest = { showLeaveConfirm = false },
            title = { Text("Leave focus timer?") },
            text = { Text("Leaving now discards this focus session. Continue?") },
            confirmButton = {
                Button(onClick = { showLeaveConfirm = false; viewModel.discard(); applyImmersive(false); onClose() }) { Text("Discard and leave") }
            },
            dismissButton = { OutlinedButton(onClick = { showLeaveConfirm = false }) { Text("Stay") } },
        )
    }

    if (showBimaristanComingSoon) {
        AlertDialog(
            onDismissRequest = { showBimaristanComingSoon = false },
            title = { Text("Build Maristanas") },
            text = { Text("This session already counts toward it. The full builder is coming soon on Android -- study time from this block is credited either way.") },
            confirmButton = { Button(onClick = { showBimaristanComingSoon = false }) { Text("Got it") } },
        )
    }
}

@Composable
private fun FocusTimerHeader(
    onClose: () -> Unit,
    isFullscreen: Boolean,
    onToggleFullscreen: () -> Unit,
    onOpenMusic: () -> Unit,
    onOpenBimaristan: () -> Unit,
) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(cortex.surface)
            .padding(horizontal = 8.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        IconButton(onClick = onClose, modifier = Modifier.semantics { contentDescription = "Close focus timer" }) {
            Text("▾", fontSize = 22.sp, color = cortex.ink)
        }
        Text("Focus Timer", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink)
        Row {
            IconButton(onClick = onOpenMusic, modifier = Modifier.semantics { contentDescription = "Focus audio" }) {
                Text("♫", fontSize = 18.sp, color = cortex.ink2)
            }
            IconButton(onClick = onToggleFullscreen, modifier = Modifier.semantics { contentDescription = if (isFullscreen) "Exit fullscreen" else "Fullscreen" }) {
                Text(if (isFullscreen) "⤣" else "⛶", fontSize = 18.sp, color = if (isFullscreen) cortex.primaryStrong else cortex.ink2)
            }
            IconButton(onClick = onOpenBimaristan, modifier = Modifier.semantics { contentDescription = "Build a bimaristan" }) {
                Text("🏛", fontSize = 18.sp, color = cortex.ink2)
            }
        }
    }
    HorizontalDivider(color = LocalCortex.current.line)
}

@Composable
private fun ModeToggle(mode: FocusMode, running: Boolean, onSetMode: (FocusMode) -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(cortex.surface2, RoundedCornerShape(10.dp))
            .padding(4.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        listOf(FocusMode.COUNTDOWN to "Countdown", FocusMode.COUNTUP to "Count up").forEach { (candidate, label) ->
            val selected = mode == candidate
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(if (selected) cortex.surface else Color.Transparent)
                    .clickable(enabled = !running) { onSetMode(candidate) }
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center,
            ) {
                Text(label, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = if (selected) cortex.ink else cortex.ink3)
            }
        }
    }
}

@Composable
private fun DurationPicker(durationSeconds: Int, running: Boolean, onSetMinutes: (Int) -> Unit) {
    val cortex = LocalCortex.current
    var customMinutes by rememberSaveable { mutableStateOf("") }
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        DURATION_PRESETS_MINUTES.forEach { minutes ->
            val selected = durationSeconds == minutes * 60
            OutlinedButton(
                onClick = { onSetMinutes(minutes) },
                enabled = !running,
                colors = ButtonDefaults.outlinedButtonColors(
                    containerColor = if (selected) cortex.primaryTint else Color.Transparent,
                    contentColor = if (selected) cortex.primaryStrong else cortex.ink2,
                ),
            ) { Text("${minutes}m") }
        }
        OutlinedTextField(
            value = customMinutes,
            onValueChange = { customMinutes = it.filter(Char::isDigit).take(3) },
            enabled = !running,
            placeholder = { Text("Custom") },
            modifier = Modifier.width(96.dp).semantics { contentDescription = "Custom minutes" },
            singleLine = true,
        )
    }
    if (customMinutes.isNotEmpty()) {
        Row {
            Spacer(Modifier.weight(1f))
            OutlinedButton(onClick = {
                val value = customMinutes.toIntOrNull()
                if (value != null && value > 0) onSetMinutes(value)
                customMinutes = ""
            }, enabled = !running) { Text("Apply") }
        }
    }
}

@Composable
private fun ClockDisplay(state: FocusSessionState, accruedSeconds: Int) {
    val cortex = LocalCortex.current
    val displaySeconds = if (state.mode == FocusMode.COUNTDOWN) state.remainingSeconds else state.elapsedSeconds
    Text(
        formatClock(displaySeconds),
        fontSize = 56.sp,
        fontWeight = FontWeight.SemiBold,
        fontFamily = FontFamily.Monospace,
        color = cortex.ink,
    )
    if (state.mode == FocusMode.COUNTDOWN) {
        Spacer(Modifier.height(16.dp))
        LinearProgressIndicator(
            progress = { (accruedSeconds.toFloat() / maxOf(1, state.durationSeconds)).coerceIn(0f, 1f) },
            modifier = Modifier.width(220.dp).height(6.dp),
            color = cortex.primary,
            trackColor = cortex.inset,
        )
        if (state.remainingSeconds == 0 && !state.running) {
            Spacer(Modifier.height(10.dp))
            Text("Block complete -- nice work.", fontSize = 12.sp, fontWeight = FontWeight.Medium, color = cortex.success)
        }
    }
}

@Composable
private fun TaskPicker(tasks: List<FocusTask>, selectedTaskId: String?, onSelect: (String?) -> Unit, onAdd: (String) -> Unit) {
    val cortex = LocalCortex.current
    var newTitle by rememberSaveable { mutableStateOf("") }

    fun submitAdd() {
        val trimmed = newTitle.trim()
        if (trimmed.isEmpty()) return
        onAdd(trimmed)
        newTitle = ""
    }

    // Two states, per this screen's brief: an empty task list gets its own
    // prompt (no dropdown to open on nothing); a non-empty list gets the
    // picker. There is no third, "loading" state -- FocusTasksStore reads
    // SharedPreferences synchronously at construction, so there is nothing
    // to wait on here.
    if (tasks.isEmpty()) {
        Column(modifier = Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
            Text("No tasks yet", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink)
            Spacer(Modifier.height(4.dp))
            Text("Add one to focus on this session.", fontSize = 11.sp, color = cortex.ink3, textAlign = TextAlign.Center)
            Spacer(Modifier.height(10.dp))
            AddTaskRow(title = newTitle, onTitleChange = { newTitle = it }, onSubmit = ::submitAdd)
        }
        return
    }

    val selectedTask = tasks.firstOrNull { it.id == selectedTaskId }
    var expanded by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxWidth()) {
        Text("Focusing on", fontSize = 11.sp, color = cortex.ink2)
        Spacer(Modifier.height(4.dp))
        Box {
            OutlinedButton(
                onClick = { expanded = true },
                modifier = Modifier.fillMaxWidth().semantics { contentDescription = "Focusing on" },
            ) {
                Text(selectedTask?.title ?: "No task -- just focus", modifier = Modifier.weight(1f), textAlign = TextAlign.Start)
            }
            DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                DropdownMenuItem(text = { Text("No task -- just focus") }, onClick = { onSelect(null); expanded = false })
                tasks.forEach { task ->
                    DropdownMenuItem(text = { Text(task.title) }, onClick = { onSelect(task.id); expanded = false })
                }
            }
        }
        if (selectedTask == null) {
            Spacer(Modifier.height(8.dp))
            AddTaskRow(title = newTitle, onTitleChange = { newTitle = it }, onSubmit = ::submitAdd)
        }
    }
}

@Composable
private fun AddTaskRow(title: String, onTitleChange: (String) -> Unit, onSubmit: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        OutlinedTextField(
            value = title,
            onValueChange = onTitleChange,
            placeholder = { Text("New task") },
            modifier = Modifier.weight(1f).semantics { contentDescription = "New task" },
            singleLine = true,
        )
        Button(onClick = onSubmit) { Text("Add") }
    }
}

@Composable
private fun StrictModeRow(armed: Boolean, blocking: Boolean, faceDown: Boolean, onSetArmed: (Boolean) -> Unit) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(cortex.surface2, RoundedCornerShape(10.dp))
            .padding(12.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.weight(1f)) {
                Text("Strict mode", fontSize = 12.sp, fontWeight = FontWeight.Medium, color = cortex.ink)
                Spacer(Modifier.height(2.dp))
                Text(
                    "Leaving the app discards the running block within 15s.",
                    fontSize = 10.sp,
                    color = cortex.ink3,
                )
            }
            Switch(
                checked = armed,
                onCheckedChange = onSetArmed,
                modifier = Modifier.semantics { contentDescription = "Strict mode" },
            )
        }
        if (blocking) {
            Spacer(Modifier.height(8.dp))
            Text(
                if (faceDown) "Phone face down -- committed to this block." else "Flip your phone face down to commit to this block.",
                fontSize = 10.sp,
                fontWeight = FontWeight.Medium,
                color = if (faceDown) cortex.success else cortex.ink3,
            )
        }
    }
}

@Composable
private fun TransportRow(running: Boolean, onReset: () -> Unit, onToggleRunning: () -> Unit) {
    val cortex = LocalCortex.current
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(20.dp)) {
        IconButton(onClick = onReset, modifier = Modifier.size(44.dp).semantics { contentDescription = "Reset" }) {
            Text("↺", fontSize = 20.sp, color = cortex.ink2)
        }
        Box(
            modifier = Modifier
                .size(64.dp)
                .clip(CircleShape)
                .background(cortex.primary)
                .clickable { onToggleRunning() }
                .semantics { contentDescription = if (running) "Pause" else "Start" },
            contentAlignment = Alignment.Center,
        ) {
            Text(if (running) "⏸" else "▶", fontSize = 26.sp, color = cortex.onPrimary)
        }
        Spacer(Modifier.size(44.dp))
    }
}

@Composable
private fun StrictWarningBanner(secondsLeft: Int, modifier: Modifier = Modifier) {
    val cortex = LocalCortex.current
    Box(
        modifier = modifier
            .padding(12.dp)
            .fillMaxWidth()
            .background(cortex.dangerTint, RoundedCornerShape(12.dp))
            .padding(16.dp),
        contentAlignment = Alignment.Center,
    ) {
        Text(
            "Come back within ${secondsLeft}s or this session is discarded.",
            fontSize = 13.sp,
            fontWeight = FontWeight.SemiBold,
            color = cortex.danger,
            textAlign = TextAlign.Center,
        )
    }
}

/** Best-effort: opens the device's default music app. No audio is ever played by this app itself -- see this task's brief. */
private fun openSystemMusicApp(context: Context) {
    val intent = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_APP_MUSIC).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    if (intent.resolveActivity(context.packageManager) != null) {
        context.startActivity(intent)
    } else {
        Toast.makeText(context, "No music app found on this device", Toast.LENGTH_SHORT).show()
    }
}
