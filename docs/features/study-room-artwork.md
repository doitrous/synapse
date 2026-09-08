# Reference room artwork

Generated with the built-in image generation tool from the user-provided study-room reference. These are separate sprite atlases, not a flattened room background. White mattes are removed by an SVG display filter at render time.

## Final assets

- [students-rear.png](/Users/doitrous/Documents/ChatGPT/Nishany/public/assets/study-room/students-rear.png)
- [students-front.png](/Users/doitrous/Documents/ChatGPT/Nishany/public/assets/study-room/students-front.png)
- [students-stools.png](/Users/doitrous/Documents/ChatGPT/Nishany/public/assets/study-room/students-stools.png)
- [furniture-clean.png](/Users/doitrous/Documents/ChatGPT/Nishany/public/assets/study-room/furniture-clean.png)

## Prompt set

### 1

Use case: stylized-concept. Create a production sprite ATLAS for a 2.5D interactive medical university study room, matching the realistic architectural render in the supplied visual reference (oak desks, blue chairs, realistic adult anatomy). This is a sprite sheet asset, NOT a room image or UI screenshot. Transparent alpha background. Exactly 8 isolated seated adult students, in a precise 4 columns x 2 rows grid, each occupying identical equal-sized cells. Every student viewed FROM BEHIND, camera 35 degrees downward, centered straight behind, parallel projection. Full body including shoes visible. Each sits on the SAME upholstered dusty navy-blue chair, slim four dark wooden legs, rounded rectangular backrest, as the reference. Each leans forward slightly with elbows bent and both hands extended forward as if typing on an INVISIBLE desk at elbow height. NO DESK, NO DEVICE, no floor, no contact shadows extending outside cell, NO TEXT, no labels, no background, no border. Consistent scale, consistent chair and viewpoint, 15% clear padding each cell. Top row: 1 man navy hoodie short black hair; 2 man olive hoodie short black hair; 3 man light grey hoodie dark curly hair; 4 man dark brown knitwear swept dark hair. Bottom row: 5 woman white blouse long dark hair; 6 woman muted blue shirt dark hair in bun; 7 woman mustard sweater long wavy dark hair; 8 woman navy blouse muted taupe hijab. Real young adult proportions, lifelike folded fabric, realistic hair, detailed hands, tasteful soft daylight from upper left. The figures should feel like the seated students in the reference, NOT cartoon avatars or toys. High resolution atlas 2048x1536 if possible.

### 2

Edit this sprite atlas: change ONLY the checkerboard background to perfectly flat pure white (#ffffff). Remove every grey checker square including between chair legs and gaps around people. No grey studio backdrop, no floor shadow. Keep all eight people, their chairs, their scale, their positions, the exact same 4x2 grid and high quality realistic appearance absolutely unchanged. This white matte sprite atlas will be composited on a light floor. Output same dimensions and framing.

### 3

Product-mockup / production 2.5D furniture sprite atlas. Pure flat white (#FFFFFF) backdrop, no checkerboard. Exactly 4 isolated furniture objects arranged in a precise 2 columns x 2 rows equal cell grid, no overlaps. Realistic architectural visualization like the supplied university study room reference. Camera 35 degrees down, viewed straight from front, no horizontal yaw, near orthographic parallel perspective, gentle daylight from left. Top left: EMPTY warm natural light oak rectangular study desk, thin rounded-edge top, natural horizontal oak grain, slim dark grey square steel four legs, no chair, no items. Top right: EMPTY dusty navy blue upholstered study chair, rounded rectangular backrest, four tapered dark walnut legs, view from BEHIND matching the students' chairs, no wheels. Bottom left: EMPTY round oak discussion table, slim dark metal legs, no chairs, no items. Bottom right: broad-leaf green indoor plant in a pale grey concrete square planter. Every object centered with at least 12% white padding; all 4 full objects visible, shadows very faint and close underneath, no room, no people, NO TEXT, no labels. High quality lifelike furniture materials, match warm oak and blue chair in reference.

### 4

Create the FRONT VIEW companion sprite sheet to this eight-student atlas. Same exact 8 adult students, clothes and navy upholstered chairs in the SAME 4 columns x 2 rows order. Pure flat WHITE #FFFFFF backdrop, no checkerboard or room. All students now viewed from IN FRONT, looking down toward an invisible desk as they study. Camera 35 degrees downward, no horizontal yaw, near orthographic projection. Entire seated figures visible including shoes, hands gently extended forward resting at invisible tabletop height. Realistic young adult proportions, natural faces and anatomy, detailed fabric and hair, daylight from left. No desks or devices or text. Same scale and generous separation between each sprite. Men row navy hoodie/olive hoodie/grey hoodie/brown knit. Women row white blouse long hair/blue shirt bun/mustard sweater long wavy hair/navy blouse taupe hijab. These are separate cutouts for inward-facing students around a discussion table.

### 5

Change ONLY the backdrop/shadows of this four-furniture sprite atlas. Remove ALL floor/contact/cast shadows and all grey illumination gradients under the furniture. The background between every leg and around every object must be uniform pure white #FFFFFF. Keep the desk, empty chair, round table and planter exactly where they are, preserving their materials, dimensions and grid composition. No shadows anywhere outside an object. Do not alter any objects. This is a white matte cutout atlas for compositing, not a studio product image.

### 6

Edit this exact 4 by 2 atlas of eight realistic seated students. Change ONLY their chairs into backless stools: remove every blue chair backrest and replace all chairs with low simple round navy upholstered seat stools with four dark wooden legs. The students remain seated in the exact same posture, each torso now naturally visible down to waist and trousers where the chair backrest previously covered them. Preserve all eight identities, clothing, scale, grid cells and rear camera angle. Uniform pure white #FFFFFF background with NO SHADOWS, no checkerboard, no new objects. Keep all eight students centered in exactly their current cells.


## Front-facing empty chair

Asset: [furniture-front-chair.png](/Users/doitrous/Documents/ChatGPT/Nishany/public/assets/study-room/furniture-front-chair.png), edited with the built-in image generation tool.

Prompt: Edit this exact furniture atlas. Change ONLY the top-right blue chair: turn it around 180 degrees so we see its FRONT, the side a sitter sits on, with the blue seat cushion visible in front of the upholstered backrest. It must face the camera. Same chair, same blue fabric, same four walnut legs, same camera elevation looking downward, same exact size and position within the top-right cell. Keep the rectangular desk, round table and planter absolutely unchanged. Keep 1448x1086 canvas and grid registration exactly unchanged. Pure white #FFFFFF background without shadows or checkerboard. No people or text.

## Evening library props

Asset: [library-props.png](/Users/doitrous/Documents/ChatGPT/Nishany/public/assets/study-room/library-props.png), generated using the supplied evening library image as visual direction. Independently cropped bookcases, raised stone platform with stairs, warm brass lamp and anatomical print. The interactive scene is assembled from these layers, existing seated student atlases, selectable seats and editable desk items. A scoped SVG matte removes the white backdrop at render time.

Prompt: Production 2.5D architectural prop atlas inspired by this softly lit medical library reference. Pure white #FFFFFF background, no room/background/floor shadows, exactly four isolated props in a 2x2 grid with generous spacing. Camera slightly elevated from front, 30 degrees downward, almost orthographic. Top left: tall dark walnut library bookcase filled with muted clothbound medical volumes, five shelves, delicate library ladder leaning against it; full bookcase with subtle warm shelf lighting. Top right: raised dark blue-grey stone study platform, rectangular with softly bevelled corners, stone tiles, platform height three stair risers, a short broad flight of four steps descending from its FRONT edge toward viewer. EMPTY platform, no desk or chairs; entire platform and steps fully visible. Bottom left: elegant small antique brass adjustable desk lamp, glowing warm cream underside, dark base. Bottom right: framed vintage anatomical skeleton study print on aged cream paper, thick dark wood frame, no legible medical labels needed. Realistic architectural rendering, handcrafted material detail matching reference, no text labels or UI. These four props will be layered independently into an interactive room. White matte uniform, no cast shadows outside objects. 1448x1086 landscape atlas.
