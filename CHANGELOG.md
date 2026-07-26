# Changelog

Todas as mudanças relevantes deste projeto são documentadas aqui.
O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

---

## [0.1.8] — 2026-07-25

### Adicionado

- `docs/app-specification-v0.1.3.md` — especificação base, preservada como referência
  (apenas normalizada para quebras de linha LF; conteúdo inalterado).
- `docs/app-specification-v0.1.4.md` — **nova especificação**, escrita a partir do código
  e do schema realmente implantados. Inclui seções novas de identidade de marca,
  regras de i18n, **matriz de permissões por perfil de acesso**, status de implementação
  por módulo e quatro lacunas conhecidas (três delas de segurança).
- `.gitattributes` — normalização de quebras de linha no repositório.

### Alterado

- `src/i18n/{pt,en,es}.ts` — `splash.tagline` volta a ser **localizada por idioma**
  (`pt`: "Estética Automotiva", `en`: "Auto Detailing", `es`: "Estética Automotriz"),
  revertendo a padronização feita em 0.1.7. A tagline **gravada no logotipo** continua
  sendo sempre "Estética Automotiva" — é arte, não texto de interface. Os dois são
  independentes de propósito, e os comentários nos três arquivos explicam isso.
- Versão elevada de `0.1.7` para `0.1.8` em `package.json` e `app.json`
  (`buildNumber` e `versionCode` acompanham).

---

## [0.1.7] — 2026-07-25

### Adicionado

- `assets/icon.png` (1024×1024) — ícone de aplicativo iOS/Android, que **não existia** no projeto.
- `assets/splash.png` (1242×1242) — a `app.json` já referenciava este arquivo, mas ele
  nunca havia sido gerado; a splash nativa estava quebrada.
- `assets/favicon.png` (48×48) — ícone da build web.
- `.gitignore` — o projeto não possuía um, o que faria `node_modules/` (≈ 37.800 arquivos)
  e o `.env` irem para o repositório no primeiro commit.
- `CHANGELOG.md` — este arquivo.
- `expo-env.d.ts` — tipagens de `expo/types` e das variáveis `EXPO_PUBLIC_*`.
  Sem ele, `src/lib/supabase.ts` não compilava (`TS2591: Cannot find name 'process'`).
- `WASHON_LOGO_RATIO` exportado por `src/assets/washOnLogo.ts`, para que a proporção
  do logo nunca divirja da arte.
- `app.json`: campos `icon`, `web.favicon`, `assetBundlePatterns`,
  `ios.buildNumber`, `android.versionCode` e `CFBundleDisplayName`.

### Alterado

- **Identidade visual atualizada para a arte v1.3 (07/2026)** em todos os pontos
  de uso: `assets/logo-wash-on.svg`, `assets/logo-wash-on.png`,
  `assets/adaptive-icon.png` e `src/assets/washOnLogo.ts`.
- `src/components/ui.tsx` — o componente `Logo` assumia proporção quadrada
  (`height = width`), mas a arte é ≈ 1,929:1. Corrigido para a proporção real.
- `src/screens/SplashScreen.tsx` — `LOGO_RATIO` agora consome
  `WASHON_LOGO_RATIO` em vez de repetir o valor da viewBox antiga.
- `src/i18n/{pt,en,es}.ts` — `splash.tagline` passa a ser **"Estética Automotiva"**
  nas três línguas. O termo faz parte do logotipo e não é traduzido
  (antes: `en` = "Auto Detailing", `es` = "Estética Automotriz").
- Versão elevada de `0.1.6` para `0.1.7` em `package.json` e `app.json`.

### Corrigido

- `tsconfig.json` — `baseUrl` está depreciado e passou a ser **erro** no TypeScript 6.0
  (`TS5101`), o que interrompia o `tsc` antes mesmo de checar o código. Migrado para
  `paths: { "@/*": ["./src/*"] }`, resolvido relativo ao `tsconfig.json`
  (equivalente ao alias já configurado no `babel.config.js`).
- `src/lib/supabase.ts` não compilava por falta de tipagem de `process.env`
  (dois erros `TS2591`). Resolvido via `expo-env.d.ts`.
- Com isso, `npx tsc --noEmit` agora passa com **zero erros** no projeto inteiro.
- `assets/adaptive-icon.png` era um duplicado byte-a-byte de `logo-wash-on.png`
  (2000×1037, mesmo MD5). Agora é um foreground quadrado de 1024×1024 com a marca
  dentro da *safe zone* de 66% exigida pelo Android.
- `assets/logo-wash-on.svg` reduzido de **751 KB para 26 KB**. A arte entregue trazia
  três máscaras raster em base64, filtros `feColorMatrix`, manifesto C2PA e a
  `namedview` do Inkscape — nenhum deles referenciado pelo corpo do documento.

### Notas sobre a arte

- A arte v1.3 entregue **não contém** a linha "Estética Automotiva". O termo foi
  reaproveitado sem alteração do lockup anterior e remesclado como glifos vetoriais
  (grupo `id="washon-tagline"`), preservando posição e proporção originais.
- A viewBox foi recortada rente à arte (`93 124 1254 650`), eliminando a margem
  vazia da arte original de 1440×810.

---

## [0.1.6] — 2026-06-03

- Última versão anterior a este changelog.
