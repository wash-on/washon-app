# WashOn — Estética Automotiva 🚗✨

App mobile para gestão de estética automotiva.  
Stack: **React Native + Expo (iOS/Android)** · **Supabase** · i18n PT/EN/ES

**Versão atual: 0.1.8** — veja o [CHANGELOG.md](./CHANGELOG.md).

Especificação vigente: [`docs/app-specification-v0.1.4.md`](./docs/app-specification-v0.1.4.md) (base anterior em [`v0.1.3`](./docs/app-specification-v0.1.3.md)).

> A identidade visual fica em `assets/` — leia `assets/brand/README.md` antes de
> trocar qualquer arquivo de logo. O termo **"Estética Automotiva"** faz parte do
> logotipo e não é traduzido em nenhum idioma.

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|---|---|
| Node.js | 20.x |
| npm | 9.x |
| Expo CLI | `npx expo` (sem instalação global) |
| Xcode | 14+ (para simulador iOS) |
| Conta Supabase | [supabase.com](https://supabase.com) — gratuita |

---

## Instalação

```bash
# 1. Clone ou extraia o projeto
cd washon-app

# 2. Instale as dependências
npm install

# 3. Copie o arquivo de variáveis de ambiente
cp .env.example .env
```

Edite `.env` com as credenciais do seu projeto Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA-ANON-KEY
```

> **Modo Demo:** Se você não configurar o `.env`, o app roda em **modo demo** com dados simulados e dois usuários de teste (veja abaixo).

---

## Banco de dados (Supabase)

1. Crie um projeto em [app.supabase.com](https://app.supabase.com)
2. Vá em **SQL Editor** e execute os arquivos nesta ordem:

```
supabase/schema.sql   ← cria as 12 tabelas + RLS
supabase/seed.sql     ← popula dados iniciais
```

---

## Rodando no iOS

```bash
# Inicia o servidor Expo
npx expo start

# Abre direto no simulador iOS (requer Xcode)
npx expo start --ios

# Abre no dispositivo físico via Expo Go
# → Escaneie o QR Code com o app Expo Go
```

---

## Usuários demo (modo sem Supabase)

| Perfil | Nome | E-mail |
|---|---|---|
| Especialista | João Silva | joao@washon.com.br |
| Cliente | Maria Santos | maria@email.com |

Selecione o perfil na tela de login e toque em **Entrar** — qualquer senha aceita no modo demo.

---

## Estrutura do projeto

```
washon-app/
├── App.tsx                  # Raiz: fontes, providers, navegação
├── app.json                 # Config Expo (bundleId, splash, etc.)
├── package.json
├── .env.example             # Template de variáveis de ambiente
│
├── assets/
│   ├── logo-wash-on.svg     # Logo vetorial (1500×1500)
│   └── logo-wash-on.png     # Logo raster 1500×1500
│
├── supabase/
│   ├── schema.sql           # 12 tabelas + RLS
│   └── seed.sql             # Dados iniciais
│
└── src/
    ├── theme/index.ts        # Cores, tipografia, radius, statusColors
    ├── types/index.ts        # Interfaces de domínio (AppUser, Vehicle…)
    │
    ├── lib/
    │   ├── supabase.ts       # Cliente Supabase + flag isSupabaseConfigured
    │   └── mockData.ts       # Dados mock para modo demo
    │
    ├── i18n/
    │   ├── index.ts          # Setup i18n-js + detecção de locale
    │   ├── pt.ts             # Português (padrão)
    │   ├── en.ts             # English
    │   └── es.ts             # Español
    │
    ├── context/
    │   ├── LanguageContext.tsx  # useLang() — t(), setLang(), lang
    │   └── AuthContext.tsx      # useAuth() — signIn, signUp, signOut
    │
    ├── navigation/
    │   ├── types.ts             # RootStackParamList + TabParamLists
    │   └── RootNavigator.tsx    # Stack + bottom-tabs Specialist/Client
    │
    ├── components/
    │   ├── ui.tsx               # Logo, Badge, Button, FauxStatusBar
    │   └── cards.tsx            # VehicleCard, Field, ChecklistRow
    │
    └── screens/
        ├── SplashScreen.tsx         # Tela inicial + seletor de idioma
        ├── AuthScreen.tsx           # Login / Cadastro
        ├── GuestScreen.tsx          # Serviços + redes sociais (sem login)
        ├── VehicleRegScreen.tsx     # Cadastro de veículo
        ├── SpecialistDashboard.tsx  # Dashboard do especialista
        ├── ClientDashboard.tsx      # Dashboard do cliente
        ├── VehicleDetailScreen.tsx  # Detalhe da OS + timeline + ações
        ├── VehiclesScreen.tsx       # Lista de veículos com filtros
        ├── NotificationsScreen.tsx  # Notificações agrupadas
        ├── ProfileScreen.tsx        # Perfil + idioma + suporte
        ├── PlaceholderScreen.tsx    # "Em breve" (Reports, Schedule)
        └── sheets.tsx               # CheckinSheet + CheckoutSheet
```

---

## Fluxo de status do veículo

```
Agendado → [Check-in] → Aguardando → [Iniciar] → Em Serviço
         → [Cancelar] → Cancelado

Em Serviço → [Finalizar] → Pronto → [Confirmar Entrega] → Entregue
```

---

## Versão

**v0.1.5** — Junho 2025  
Desenvolvido com ❤️ para WashOn Estética Automotiva.
