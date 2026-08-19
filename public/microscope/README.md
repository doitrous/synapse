# Microscope focus animation

`focus.mp4` is the transition into the histology viewer: the camera pushes in
from the whole instrument and ends inside the eyepiece, on a white circular
field. That ending is the point — the chosen slide fades into that circle, so
the animation covers the move from "pick a slide" to "look at it".

Prepared from a 10.04s, 960×960, 3.5 MB source with an AAC track:

    ffmpeg -i <source> -an \
      -vf "setpts=0.22*PTS,scale=720:720:flags=lanczos" -r 30 \
      -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart focus.mp4

- **Audio stripped.** A control that plays sound when a student presses it is a
  defect, and the track was dead weight besides.
- **Sped up to 2.3s.** Ten seconds is a film; a UI transition a student takes
  many times a session is not.
- **H.264, not VP9.** VP9 came out larger on this footage — it is mostly flat
  white — and H.264 needs no fallback.

`focus-poster.jpg` is the first frame (the whole instrument) and is what the
element shows before it plays. `focus-end.jpg` is the last frame, used where
`prefers-reduced-motion` is set: the student lands in the eyepiece without the
journey rather than being denied the destination.
