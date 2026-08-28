# The microscope

Three files, cut from a 10.04s / 960×960 / 3.5 MB source with an audio track. The
source is a studio shot on white. The browser transition uses an alpha-keyed
WebP sprite so only the instrument moves across the page; the rectangular
studio ground is not rendered.

(A second video was tried and rejected: it was shot in a lab, so the instrument
carried a grey background that read as a box floating in the white.)

`microscope.png` — the instrument at rest, with the flat white keyed out so it
sits on the page rather than in a card:

    ffmpeg -i <source> -frames:v 1 \
      -vf "scale=440:440,colorkey=0xFFFFFF:0.12:0.06,format=rgba" microscope.png

`focus-grid.jpg` — **120 frames of the push-in on a 12×10 grid**, 240px each:

    ffmpeg -i <source> -vf "trim=start=0:end=9.2,setpts=PTS-STARTPTS,\
      fps=13.043,scale=240:240,tile=12x10" -frames:v 1 focus-grid.jpg

`focus-grid-alpha.webp` — the runtime sprite, with the white studio ground
removed and the result compressed with alpha intact:

    ffmpeg -i focus-grid.jpg \
      -vf "colorkey=0xFFFFFF:0.20:0.08,format=rgba" focus-grid-alpha.png
    cwebp -q 82 -alpha_q 90 -m 6 -mt \
      focus-grid-alpha.png -o focus-grid-alpha.webp

A grid, not a strip: 120 frames in a row would be nearly 30,000px wide, past
what a GPU holds as one texture. Two axes is also why the frames are stepped
from JavaScript rather than by CSS `steps()`, which walks one — see `spriteCell`
in `src/data/histology.ts`, which is unit-tested.

120 frames over 2s is 60fps. Eighteen at 14fps and forty at 25fps were both
tried first and both read as a flip-book.

Every frame earns its place: sampling the mean brightness of each cell shows a
continuous progression — 208 at the start, darkening to 128 as the barrel fills
the frame, then opening to 245 at the white field. There is no run of identical
frames to trim.

The driver is timed against a real clock rather than advancing one frame per
paint, so the push-in takes two seconds on a slow machine instead of running
long. Sprite cells are square, so the transition layer lands on a measured,
centred square over the real rectangular slide stage instead of stretching the
instrument to the stage's aspect ratio. There is no circular CSS clip or iris:
the alpha-keyed instrument is allowed to move intact. The slide viewer remains
laid out but visually, interactively, and semantically hidden during the
push-in, then is revealed in the same paint as the final keyed frame — never
after a blank or delayed fade. `prefers-reduced-motion` opens the destination
without the journey.

No audio: a control that plays sound when a student presses it is a defect.
