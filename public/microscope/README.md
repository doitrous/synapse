# The microscope

Two files, both cut from a 10.04s / 960×960 / 3.5 MB source that had an AAC
track on it.

`microscope.png` — the instrument at rest, with the white studio background
keyed out so it sits on the page rather than in a box:

    ffmpeg -i <source> -frames:v 1 \
      -vf "scale=360:360,colorkey=0xFFFFFF:0.12:0.06,format=rgba" microscope.png

`focus-strip.jpg` — forty frames of the push-in on one strip, 280px each:

    ffmpeg -i <source> -vf "trim=start=0:end=9.2,setpts=PTS-STARTPTS,\
      fps=4.35,scale=280:280:flags=lanczos,tile=40x1" -frames:v 1 focus-strip.jpg

Stepped by CSS (`animate-microscope-focus` in `src/index.css`) rather than
played as a video. One request instead of a stream, it stops exactly on the
white field the slide appears in, and the frame count is the only thing the
CSS and the component have to agree on — `FRAMES` and `FRAME_PX` in
`Microscope.tsx`, `steps(40)` and `-11200px` in the stylesheet.

Forty frames over 1.6s is ~25fps. Eighteen over 1.25s was tried first and read
as a flip-book.

No audio: a control that plays sound when a student presses it is a defect.
The video itself is gone — nothing loads an `.mp4` any more.
