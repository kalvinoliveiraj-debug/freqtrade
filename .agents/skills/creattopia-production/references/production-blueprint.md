# Actionable Creation Blueprint: Narrative Faceless Channel

Step-by-step blueprint for launching an asset-driven, faceless storytelling channel using the wobbly, MS-Paint aesthetic popularized by Casually Explained (see `faceless-channels.md`), combined with the Creattopia pre-production frameworks (see `vision-ikigai-icon.md` and `aaa-vva-dream-avatar.md`).

## Shot/segment abbreviations

Use these in scripts and shot lists so shot type and post-production intent are unambiguous to everyone on the team:

| Abbreviation | Meaning |
|---|---|
| `th` | Talking Head/Body — directly on camera, speaking to the lens. |
| `cs` | Cinematic Shot/Scene — action sequence or cinematic environmental detail. |
| `vo` | Voiceover — narration over visual assets or B-roll. |
| `pp` | Post-Production/Premiere Pro — visual editing, masking, color grading, or transitions. |
| `hv` | Handheld Vlog — dynamic, handheld camera movement. |
| `vo/sd` | Voiceover Sound Design — narration paired with stylized sound design elements. |

## Step 1 — Pre-production and script engineering

Write a word-for-word script (a Notion Kanban board works well for tracking script → asset → VO → edit stages per video). Structure the script around one specific Dream Avatar pain point and its actionable solution (see `aaa-vva-dream-avatar.md`) so the narrative has a single throughline rather than a loose collection of observations:

1. Cold open on the Dream Avatar's micro challenge, stated concretely (not abstractly) so the target viewer recognizes themselves immediately.
2. Escalate to the macro challenge underneath it.
3. Walk through the creator's actual lived solution — specific, not generic advice.
4. Close on the payoff/resolution and, where relevant, the CTA.

Mark each script beat with a shot abbreviation (`th`/`cs`/`vo`/`hv`) as you write it, so the visual designer and editor know what asset type to build for that line before recording starts.

## Step 2 — Graphic asset generation (wobbly MS Paint aesthetic)

Once the script/shot list is locked and every beat carries a timestamp, generate exactly one image per timestamp using the full director spec in `wobbly-image-sequence-prompt.md` — it defines the continuity guide, fixed art style, canvas/format, line style, character design, color palette, text rules, composition rules, and a final validation checklist. Don't improvise a lighter version of that spec; it's written to prevent style drift across a long sequence, which is the main failure mode of this aesthetic.

Practical notes on top of that spec:

1. Build one image per script beat that was marked `cs` or `vo` in Step 1 — talking-head (`th`) beats don't need a drawn asset.
2. Export assets as transparent-background layers (or plan to key out the pure-white background) so they can be composited and animated independently in the edit rather than as flattened backgrounds.
3. Run the spec's Final Validation checklist against the whole batch before handing assets to editing, not per-image as you go — style drift is only obvious in hindsight across the full sequence.

## Step 3 — Post-production and audio-visual assembly

With voiceover recorded and assets illustrated, assemble in the multi-timeline structure from `editing-post-production.md`:

1. Lay the VO track first — it's the spine the whole edit is timed against.
2. Place the matching drawn asset under each `vo`/`cs` beat, applying the visual-asset refresh cadence so no single drawing sits static for too long (animate in with a simple pop/slide rather than a hard cut where it helps pacing).
3. Cut in any `th`/`hv` footage on its own track per the abbreviation markers from the script.
4. Apply pattern breaks and J-cuts per `editing-post-production.md` to keep the low-fi visual style from reading as low-energy.
5. Add music/SFX last, once visual pacing is locked, so sound design supports the cut rather than dictating it.
6. Export per `export-protocols.md` for each target platform.
