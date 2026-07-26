# Arte-fonte da marca

| Arquivo | Uso |
|---|---|
| `logo-wash-on-07-2026-v1.3.svg` | **Arte original entregue** (Inkscape, 1440×810). Fonte da verdade — não editar em produção. |
| `../logo-wash-on.svg` | Master limpo derivado da arte acima: defs mortas removidas, viewBox recortada rente à arte e a tagline "Estética Automotiva" remesclada. |
| `../logo-wash-on.png` | Raster do master (2000×1037, transparente). |
| `../icon.png` | Ícone iOS/Android — 1024×1024, fundo `#0A0A0A`. |
| `../adaptive-icon.png` | Foreground adaptativo Android — 1024×1024, marca em 60% (safe zone). |
| `../splash.png` | Splash nativa — 1242×1242, transparente, `resizeMode: contain`. |
| `../favicon.png` | Build web — 48×48. |

## Atenção

A arte v1.3 **não contém** a linha "Estética Automotiva". O termo é obrigatório no lockup
e foi remesclado no master como glifos vetoriais (grupo `id="washon-tagline"`).
Ao receber uma arte v1.4+, verifique se a tagline voltou; se não, repita a remesclagem.

O termo "Estética Automotiva" é **artwork**, não texto de interface: permanece idêntico
em português, inglês e espanhol.
