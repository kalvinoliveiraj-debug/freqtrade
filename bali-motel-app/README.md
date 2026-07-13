# Bali Motel — App de Reservas

App de reservas mobile-first para o Bali Motel (Fortaleza, CE). Sem backend: o app monta a experiência de escolha (suíte, período, data/hora) e, no final, abre o WhatsApp com uma mensagem pronta para o atendente confirmar manualmente — ou registra que o cliente prefere ser chamado de volta.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev/) para ícones
- Sem banco de dados / sem autenticação — 100% client-side

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. O layout é mobile-first — use as devtools do navegador em modo responsivo (ex: iPhone 14) para a melhor experiência.

## Antes de publicar

1. **Número do WhatsApp real** (pendente): edite `src/config.ts` e troque `WHATSAPP_NUMBER` pelo número de *celular* com WhatsApp do motel, em formato internacional só com dígitos (ex: `5585999998888`). O fixo (85) 3278-5005 já está configurado em `MOTEL_PHONE_TEL`/`MOTEL_PHONE_DISPLAY` e é usado no fluxo "Ligar para o motel" — mas esse fixo não recebe WhatsApp, então o `WHATSAPP_NUMBER` continua um placeholder até você passar o número certo.
2. **Fotos das suítes**: as suítes hoje usam ilustrações geradas (gradiente + textura + ícone) em `src/components/SuiteVisual.tsx`. Troque por fotos reais quando disponíveis — cada suíte tem um `hue` (`gold`, `teal`, `moss`) em `src/data/suites.ts` que pode virar uma imagem própria.
3. **Preços e descrições**: ajuste em `src/data/suites.ts`.
4. **Tema visual**: o app suporta 3 paletas alternáveis (ícone de paleta no canto superior direito da Home): Tropical Refinado, Romance Quente e Luxo Noturno. A escolha do usuário fica salva no navegador. Para fixar um único tema em produção, defina o `data-theme` fixo em `index.html` ou remova o `ThemeSwitcher` da Home.

## Build

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`.

## Deploy (Vercel)

1. Suba este diretório (`bali-motel-app/`) como repositório próprio, ou aponte o Root Directory do projeto na Vercel para `bali-motel-app/` se mantiver dentro de um monorepo.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Não são necessárias variáveis de ambiente — tudo roda no cliente.

Um `vercel.json` já está incluso para garantir o fallback de rotas (SPA).
