export type Flow = "agora" | "agendar";

export type ConfirmMode = "mensagem" | "ligar";

export type ThemeId = "tropical" | "romance" | "night";

export type AmenityId = "wifi" | "tv" | "jacuzzi" | "ar" | "garagem";

export type SuiteHue = "gold" | "teal" | "moss";

export interface Suite {
  id: string;
  name: string;
  tag: string;
  rating: number;
  description: string;
  amenities: AmenityId[];
  hue: SuiteHue;
  price: {
    agora: number;
    pernoite: number;
  };
}

export type Screen = "home" | "detail" | "confirm" | "done";

export interface Booking {
  suite: Suite;
  flow: Flow;
  date: string | null;
  time: string | null;
  name: string;
  confirmMode: ConfirmMode;
}
