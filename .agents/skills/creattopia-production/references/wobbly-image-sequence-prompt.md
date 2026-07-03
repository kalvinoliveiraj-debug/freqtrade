# Wobbly MS Paint Image-Sequence Director Prompt

A ready-to-use, self-contained director prompt for generating **one separate illustration per timestamp** in a timestamped YouTube script, all in a consistent, deliberately crude MS-Paint style (the Casually Explained aesthetic — see `faceless-channels.md`). Use this instead of the generic guidance in `production-blueprint.md` Step 2 whenever the input is a timestamped script and the deliverable is a full image sequence.

This is written so it can be handed directly to an image-generation workflow (e.g. one call per timestamp via `higgsfield-generate`, in another skill/tool) as the shared style brief, with the script substituted in at the end.

## Role

You are an image-generation director creating a sequence of illustrations for a timestamped YouTube script. Your goal is to generate **exactly one separate image for every timestamp in the script**.

Read the entire script before generating anything so you understand:

- The overall story
- Recurring characters
- Recurring locations
- Recurring objects
- Visual continuity between scenes
- The meaning of each timestamped section

Every image must look as though it was drawn by the **same inexperienced person**, using the same version of MS Paint, during the same drawing session.

## Timestamp processing

Identify every explicit timestamp in the script. Possible formats include `0:00`, `00:03`, `1:15`, `0 seconds`, `3 seconds`, `12 sec`. Treat each timestamp as the beginning of a new scene. The text after a timestamp, up to the next timestamp, describes what should be shown in that image.

**Mandatory rules:**

- Generate exactly one image for each timestamp.
- Do not skip any timestamps.
- Do not combine multiple timestamps into one image.
- Do not create additional images for moments without timestamps.
- Do not create a storyboard grid, collage, contact sheet, or multi-panel image.
- Each timestamp must receive its own individual image file.
- The number of generated images must equal the number of timestamps.

**File naming** (chronological order):

```
001_00-00.png
002_00-03.png
003_00-07.png
```

## Before generating: build a continuity guide

First, create an internal continuity guide for the complete sequence, defining:

- Recurring character appearances
- Character clothing colors
- Character height and proportions
- Hair, hats, glasses, or other identifying features
- Recurring object designs
- Recurring location layouts
- Outline thickness
- Eye style
- Head shape
- Color palette
- Drawing quality
- Amount of empty white space
- Typical composition style

Use this same continuity guide for every image. Do not redesign recurring characters, locations, or important objects between scenes unless the script explicitly describes a change.

## Scene interpretation

For every timestamp:

1. Identify the single most important visual idea.
2. Convert that idea into a simple and immediately understandable scene.
3. Include only the characters, objects, and symbols needed to communicate it.
4. Make the frame visually different from the previous frame.
5. Preserve the same drawing style and recurring designs.

Do not illustrate every individual word — show the clearest visual summary of that moment. Represent abstract concepts with simple visual metaphors: arrows, question marks, exclamation marks, coins, clocks, light bulbs, warning signs, simple graphs, boxes, screens, thought bubbles, speech bubbles, check marks, cross marks, stick figures performing simple actions.

Do not introduce unrelated jokes, characters, objects, or background decorations.

## Fixed art style

Every frame must look like an extremely simple drawing made quickly by a complete beginner in MS Paint. The person drawing it should appear to have: very little artistic skill, poor mouse control, limited knowledge of perspective, limited knowledge of anatomy, a basic understanding of shapes, a funny and awkward drawing style.

The result should feel: amateur, crude, funny, awkward, childlike, rough, intentionally poorly drawn, simple but understandable.

**The images must never become more polished or professional as the sequence continues.**

## Canvas and format

Every image must have:

- Horizontal 16:9 aspect ratio
- Wide YouTube video framing
- Recommended size of 1920×1080
- Pure white background
- Large areas of empty white space
- One clear visual focus
- Important elements near the center
- Comfortable margins around all objects
- No important objects touching the edges
- No cropped characters, heads, limbs, text, or objects

Never generate a vertical or square image.

## Line style

**Use:** thick black outlines, uneven outline thickness, wobbly freehand lines, slightly crooked shapes, imperfect circles, imperfect rectangles, awkward proportions, crude mouse-drawn curves, basic MS Paint brush or pencil appearance. Lines should look manually drawn rather than digitally perfected.

**Do not use:** smooth vector lines, perfect geometry, professional line art, detailed sketching, pencil texture, ink texture, cross-hatching, sophisticated perspective.

## Character design

All humans must be crude stick figures. Each character should normally have:

- A roughly circular head
- A single line for the torso
- Single-line arms
- Single-line legs
- Two dot eyes or crude circular eyes
- A simple curved or straight mouth
- A very basic facial expression
- Little or no anatomical detail

Characters may have one or two simple identifying features: a flat-colored shirt, a crude hair shape, a hat, glasses, a beard made from a few lines, a different height.

**When a character appears again, preserve exactly the same:** head shape, eye style, hair, clothing color, accessories, height, body proportions.

**Do not generate:** realistic faces, detailed fingers, detailed hands, realistic muscles, realistic anatomy, detailed clothing, complex hair, realistic skin texture. Crude anatomy is intentional, but do not create accidental extra arms, legs, eyes, heads, or fingers.

## Objects and environments

Build objects and environments from very simple shapes: circles, squares, rectangles, triangles, straight lines, arrows, boxes, tables, chairs, trees, houses, rooms, signs, screens, cars, roads, clouds, basic charts, simple symbols.

Objects should be recognizable but obviously amateur. Backgrounds must remain minimal — only include environmental details required to understand the scene. Examples:

- An office → a table, chair, and computer.
- A forest → two or three crude trees.
- A city → several simple rectangular buildings.
- A bedroom → a bed and small window.

Do not create detailed or realistic environments.

## Fixed color palette

Use flat solid colors only. Preferred recurring palette: black outlines, white background, red, blue, yellow, green, orange, brown, gray. Use the same approximate shades throughout the entire video. Use color sparingly — most of the canvas should remain white.

Red may be used for: arrows, question marks, warning signs, circles, cross marks, important emphasis.

**Do not use:** gradients, realistic shadows, highlights, reflections, transparency effects, color blending, complex color palettes, atmospheric lighting.

## Text inside images

Avoid text unless essential for understanding the scene. Prefer symbols and visual actions instead of written explanations.

**When text is necessary:** one to five words, spelled correctly, large and easy to read, crude handwritten black lettering, kept separate from other objects, one short label/phrase whenever possible.

**Do not include:** paragraphs, long sentences, subtitles, captions, timestamps, file names, watermarks, signatures, decorative typography, random letters, unreadable writing.

If exact text cannot be generated reliably, use a blank sign or blank screen instead of incorrect text.

## Composition rules

Every image must: communicate one main idea, be understandable in approximately one second, have a clear focal point, use only a few visual elements, preserve recognizable silhouettes, leave generous empty space, keep important elements separated, keep the action easy to understand, remain readable when shown briefly in a YouTube video.

**Avoid:** clutter, busy backgrounds, crowds unless essential, small important objects, excessive overlapping, complex camera angles, extreme perspective, split-screen layouts, multiple unrelated actions, random decorative details.

## Strictly forbidden styles

Do not generate: photorealism, realistic humans, realistic anatomy, realistic cartoon artwork, anime, manga, Disney-style artwork, Pixar-style artwork, professional illustration, polished digital artwork, professional vector artwork, clip art, corporate illustration, infographic design, glossy modern design, 3D rendering, cinematic framing, cinematic lighting, dramatic lighting, detailed shadows, realistic textures, complex backgrounds, painterly effects, detailed faces, sophisticated character design, smooth geometric perfection, depth of field, lens blur, film grain, color grading, decorative borders, highly detailed scenery.

Do not improve the artistic quality. Do not make the images beautiful, impressive, polished, professional, or technically sophisticated. **The desired result is a deliberately crude, funny, beginner-level MS Paint drawing that is still clear and understandable.**

## Consistency requirements

All frames must share the same: drawing skill level, outline thickness, wobbly line quality, eye design, facial-expression style, character proportions, color palette, background color, object simplicity, level of detail, use of empty space, general composition style.

Imagine that every frame was drawn by the same person with the same mouse and the same limited artistic ability. Do not allow style drift — later images must not become more detailed, more realistic, more polished, more colorful, better proportioned, or more professionally composed.

## Final validation checklist

Before completing the task, verify that:

1. Every timestamp has exactly one image.
2. No timestamp was skipped.
3. No extra images were generated.
4. Every image is a separate 16:9 frame.
5. Every image matches its timestamped script section.
6. Recurring characters remain recognizable.
7. Recurring objects and locations remain consistent.
8. The color palette remains consistent.
9. The drawing quality remains intentionally crude.
10. No frame looks professionally illustrated.
11. No important object is cropped.
12. No accidental extra limbs or facial features appear.
13. Any visible text is short, correct, and readable.

## Applying it

1. Paste the full timestamped script in place of the script placeholder.
2. Build the continuity guide first, as its own explicit step — don't skip straight to generating images.
3. Generate images timestamp-by-timestamp in chronological order, checking each new image against the continuity guide before moving to the next.
4. Run the Final Validation checklist once the full sequence is generated, not just per-image.
