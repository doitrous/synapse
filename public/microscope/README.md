# The microscope

Two files, cut from a 10.04s / 960×960 / 3.2 MB source that had an audio track.

`microscope.jpg` — the instrument at rest, the first frame at 440px.

`focus-grid.jpg` — **120 frames of the push-in on a 12×10 grid**, 240px each:

    ffmpeg -i <source> -vf "fps=11.9503,scale=240:240,tile=12x10" \
      -frames:v 1 focus-grid.jpg

A grid, not a strip: 120 frames in a row would be nearly 30,000px wide, past
what a GPU holds as one texture. Two axes is also why the frames are stepped
from JavaScript rather than by CSS `steps()`, which walks one — see
`spriteCell` in `src/data/histology.ts`, which is unit-tested, and the driver
in `Microscope.tsx`.

120 frames over 2s is 60fps. Earlier passes used 18 frames at 14fps and then 40
at 25fps; both read as a flip-book, which is what this replaces.

The driver is timed against a real clock rather than advancing one frame per
paint, so the push-in still takes two seconds on a slow machine instead of
running long. `prefers-reduced-motion` jumps to the last frame — the
destination without the journey.

No audio: a control that plays sound when a student presses it is a defect.
Nothing loads an `.mp4`.
