# Native Platform Export Protocols

Wrong export settings trigger platform re-compression, which degrades visual quality even when the source file is high-fidelity. The source table's exact numeric values (resolution, frame rate, bitrate) were not preserved in extraction — the table below fills them with current standard practice for each platform. Platform specs change; verify against each platform's current creator documentation before a high-stakes export rather than trusting this table as permanently authoritative.

| Platform | Resolution | Codec | Frame rate | Bitrate approach | High-quality upload protocol |
|---|---|---|---|---|---|
| Instagram Reels | 1080×1920 (9:16), upscale to 4K source if available | H.264 (MP4) | Match source (24/30/60fps) | VBR, 2-pass | Upload manually (not via cross-post); enable "Upload at Highest Quality"; let the video fully load/process before publishing. |
| TikTok | 1080×1920 (9:16) | H.264 (MP4) | Match source (30/60fps) | VBR, 1-pass, higher target bitrate than Reels | Keep file size under the app's cap; enable "Allow High Quality Uploads" in settings; upload over high-speed Wi-Fi to avoid additional mobile-network compression. |
| YouTube Shorts | 1080×1920 (9:16) | H.264 (MP4) | Match source (24/30/60fps) | VBR, 2-pass, high target bitrate (YouTube re-encodes but rewards higher source bitrate) | Upload via YouTube Studio on desktop; set audience to "Not Made for Kids" unless genuinely child-directed; add relevant keywords to description/tags for discovery. |

## General rules regardless of platform

1. Always export from the highest-resolution timeline you shot/edited at — never upscale in the export step to "match" a platform spec; upscale earlier in the pipeline if needed and export native.
2. Keep frame rate constant (CFR), not variable — variable frame rate is a common cause of platform-side re-encoding artifacts and audio drift.
3. Two-pass VBR generally preserves more detail than one-pass at the same target bitrate, at the cost of longer export time — worth it for hero content, optional for high-volume/low-stakes posts.
4. Re-check each platform's current max resolution/bitrate/frame-rate caps periodically; these specs are revised by platforms over time.
