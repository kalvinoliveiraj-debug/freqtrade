/**
 * Theme — derived entirely from the active pack's `branding`. The engine has no
 * hard-coded colors; reskinning is a data change, not a code change.
 */
import { activePack } from '../packs';

const b = activePack.branding;

export const theme = {
  colors: {
    primary: b.primaryColor,
    accent: b.accentColor,
    bg: b.bgColor,
    surface: b.surfaceColor,
    surfaceAlt: '#1F3350',
    text: b.textColor,
    muted: b.mutedColor,
    success: '#1FA363',
    error: '#E5484D',
    heart: '#FF4D6D',
    streak: '#FF9F1C',
    gold: '#F2C14E',
    border: '#2A3D58',
  },
  radius: { sm: 8, md: 14, lg: 22, pill: 999 },
  spacing: (n: number) => n * 8,
  font: {
    h1: 30,
    h2: 22,
    h3: 18,
    body: 16,
    small: 13,
  },
} as const;

export type Theme = typeof theme;
