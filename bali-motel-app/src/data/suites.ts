import type { Suite } from "../types";

export const SUITES: Suite[] = [
  {
    id: "tropical",
    name: "Suíte Tropical",
    tag: "Mais reservada",
    rating: 4.9,
    description:
      "Ambiente amplo com decoração inspirada em Bali, iluminação em camadas e cama king size. Ideal para quem busca conforto e privacidade sem abrir mão do requinte.",
    amenities: ["wifi", "tv", "ar", "garagem"],
    hue: "gold",
    price: { agora: 129, pernoite: 219 },
  },
  {
    id: "jacuzzi",
    name: "Suíte Jacuzzi",
    tag: "Mais romântica",
    rating: 4.8,
    description:
      "Hidromassagem privativa para dois, iluminação de espera dimerizável e closet com espelho. A escolha certa para uma noite mais especial.",
    amenities: ["wifi", "tv", "jacuzzi", "ar", "garagem"],
    hue: "teal",
    price: { agora: 169, pernoite: 289 },
  },
  {
    id: "garden",
    name: "Suíte Garden",
    tag: "Mais discreta",
    rating: 4.7,
    description:
      "Varanda privativa com jardim vertical, entrada reservada e garagem individual fechada — máxima discrição do início ao fim.",
    amenities: ["wifi", "tv", "ar", "garagem"],
    hue: "moss",
    price: { agora: 109, pernoite: 189 },
  },
];
