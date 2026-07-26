# App Specification

## Control

- Version: 0.1.4
- Supersedes: 0.1.3 (`docs/app-specification-v0.1.3.md`, kept as the baseline)
- Name: WashOn Estética Automotiva
- App release this specification describes: **0.1.8**
- Status legend used throughout: **[done]** implemented and type-checked · **[partial]** implemented with a documented gap · **[todo]** specified, not yet built

### What changed from 0.1.3

| # | Change | Reason |
|---|---|---|
| 1 | New section **Brand and identity** | Logo art v1.3 landed without the tagline; the rule needs to be written down, not remembered |
| 2 | New section **Access profiles and authorization** with a permission matrix | Every module must declare its access policy and be validated against the acting profile |
| 3 | New section **Internationalization rules** | Distinguishes localized UI copy from fixed brand terms |
| 4 | Data models rewritten to match the deployed Supabase schema | 0.1.3 described array columns; the schema uses foreign keys |
| 5 | New section **Implementation status** | 0.1.3 did not distinguish specified from built |
| 6 | New section **Known gaps** | Three of them are security-relevant and block a production release |
| 7 | Status flow and Statistics carried over unchanged | Still valid as written in 0.1.3 |

---

## App overview and goal

- Objective: mobile app for a modern network of automotive detailing units
- Scope: administrative, operational and client-facing modules in a single app, separated by access profile

## Target platform

- Platform: iOS and Android, from one Expo codebase
- Orientation: portrait only
- Theme: dark only (`userInterfaceStyle: "dark"`)

---

## Tech stack

Versions are the ones pinned in `package.json` at app release 0.1.8. All are current stable releases; none are betas or release candidates.

| Layer | Choice | Version |
|---|---|---|
| Framework | React Native + Expo (managed) | `expo` 56.0.11 · `react-native` 0.85.3 |
| UI runtime | React | 19.2.3 |
| Language | TypeScript (`strict: true`) | 6.0.3 |
| Navigation | React Navigation — native stack + bottom tabs | 7.x |
| Backend | Supabase (Postgres + Auth + RLS) | `@supabase/supabase-js` 2.107.0 |
| i18n | `i18n-js` + `expo-localization` | 4.5.3 · 56.0.6 |
| Vector rendering | `react-native-svg` | 15.15.5 |
| Typography | Rajdhani (display) · DM Sans (body), via `@expo-google-fonts` | — |
| Storage | `@react-native-async-storage/async-storage` | 2.2.0 |

**Path alias:** `@/*` → `./src/*`, declared in `tsconfig.json` (`paths`, without the deprecated `baseUrl`) and mirrored in `babel.config.js` via `module-resolver`. Both must be changed together.

---

## Brand and identity

### Assets

| File | Purpose |
|---|---|
| `assets/brand/logo-wash-on-07-2026-v1.3.svg` | Delivered source art. Source of truth, never edited in place |
| `assets/logo-wash-on.svg` | Clean master derived from the art: dead defs removed, viewBox cropped tight (`93 124 1254 650`), tagline merged back in |
| `assets/logo-wash-on.png` | 2000×1037 transparent raster |
| `src/assets/washOnLogo.ts` | The master inlined for `react-native-svg`, plus the exported `WASHON_LOGO_RATIO` |
| `assets/icon.png` | 1024×1024, opaque `#0A0A0A` |
| `assets/adaptive-icon.png` | 1024×1024 Android foreground, mark at 60% (66% safe zone) |
| `assets/splash.png` | 1242×1242 transparent, `resizeMode: contain` |
| `assets/favicon.png` | 48×48 web build |

### Rules

1. **The term "Estética Automotiva" inside the logo is artwork, not interface copy.** It is identical in Portuguese, English and Spanish and is never translated, never re-typed as a `<Text>` element, and never localized.
2. Art v1.3 shipped **without** that tagline. It was carried over from the previous lockup as vector glyphs (group `id="washon-tagline"`). Any future art drop must be checked for it; if absent, the merge is repeated.
3. The aspect ratio is published once, by the asset itself (`WASHON_LOGO_RATIO`). No screen may hardcode a ratio.
4. Primary palette: `#1A56CC` (primary) · `#2B7FFF` (accent) · `#0A0A0A` (background) · `#E5E6EA` (badge stroke). Defined in `src/theme/index.ts`.

---

## Internationalization rules

1. Supported languages: **Brazilian Portuguese (default), English, Spanish**. Type `Lang = 'pt' | 'en' | 'es'`.
2. The language is first chosen on the splash screen, carried into sign-up, and thereafter belongs to the user profile.
3. **Every module and feature renders in the language of the profile currently signed in.** No screen may hardcode user-visible copy; all strings come from `src/i18n/{pt,en,es}.ts` through `useLang().t()`.
4. The three catalogues must stay key-for-key identical. A key present in one and missing in another is a defect.
5. **Localized copy vs. brand terms.** `splash.tagline` is localized — `pt`: "Estética Automotiva", `en`: "Auto Detailing", `es`: "Estética Automotriz". The tagline *drawn inside the logo* is not. The two are independent on purpose: the logo is a fixed asset, the tagline key is for UI surfaces that need the phrase as readable text (accessibility labels, share sheets, store copy).
6. Tone: professional and current, in all three languages. Prose is translated, not transliterated — a Spanish string should read as if written by a Spanish speaker, not as mapped Portuguese.

---

## Access profiles and authorization

### Profiles

| Profile | Authenticated | Purpose |
|---|---|---|
| Guest | No | Public catalogue browsing, conversion to sign-up |
| Client | Yes | Own vehicles, own service orders, scheduling |
| Specialist | Yes | Daily operation: check-in, service execution, check-out |
| Manager | Yes | Unit administration, pricing, templates, reports |
| Administrator | Yes | Network administration, user and profile management |

### Authorization model

Authorization is evaluated at **three independent layers**. A feature is only considered protected when all three agree.

1. **Route layer** — the navigator exposes a route only to profiles that may reach it.
2. **UI layer** — an action control is only rendered when the acting profile holds the permission.
3. **Data layer** — Postgres Row Level Security decides the outcome, independently of the client. **This is the authoritative layer**; layers 1 and 2 are usability, not security.

### Permission codes

Each module below declares permissions in the form `<domain>.<action>[.<scope>]`, where scope is `own` (rows belonging to the acting user), `unit` (rows of the user's unit) or `all`.

| Permission | Guest | Client | Specialist | Manager | Administrator |
|---|:--:|:--:|:--:|:--:|:--:|
| `services.read.public` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `social.read.public` | ✔ | ✔ | ✔ | ✔ | ✔ |
| `account.create` | ✔ | — | — | — | — |
| `vehicle.create.own` | — | ✔ | — | ✔ | ✔ |
| `vehicle.read.own` | — | ✔ | — | — | — |
| `vehicle.read.unit` | — | — | ✔ | ✔ | ✔ |
| `order.read.own` | — | ✔ | — | — | — |
| `order.read.unit` | — | — | ✔ | ✔ | ✔ |
| `order.create.own` | — | ✔ | — | ✔ | ✔ |
| `order.checkin` | — | — | ✔ | ✔ | ✔ |
| `order.service.start` | — | — | ✔ | ✔ | ✔ |
| `order.service.finish` | — | — | ✔ | ✔ | ✔ |
| `order.checkout` | — | — | ✔ | ✔ | ✔ |
| `order.cancel` | — | — | ✔ | ✔ | ✔ |
| `payment.confirm` | — | — | — | ✔ | ✔ |
| `stats.read.unit` | — | — | ✔ | ✔ | ✔ |
| `stats.read.network` | — | — | — | — | ✔ |
| `catalog.write` | — | — | — | ✔ | ✔ |
| `pricing.write` | — | — | — | ✔ | ✔ |
| `template.write` | — | — | — | ✔ | ✔ |
| `checklist.write` | — | — | — | ✔ | ✔ |
| `user.read.unit` | — | — | — | ✔ | ✔ |
| `user.profile.assign` | — | — | — | — | ✔ |
| `profile.self.update` | — | ✔ | ✔ | ✔ | ✔ |

### Rules that hold regardless of profile

- A profile is **never** self-declared by the client application. It is read from the database record that belongs to the authenticated identity.
- `user.profile.assign` is the only path by which a profile changes. No user may raise their own profile.
- Every new module must add its rows to this matrix **before** the screen is built, and must ship a matching RLS policy.

---

## Modules and features

### Module: Public (unauthenticated)

Permissions: `services.read.public`, `social.read.public`, `account.create`

| Feature | Access policy | Status |
|---|---|---|
| Splash screen — logo, sign-in, sign-up, guest, language switch | Open | **[done]** |
| Guest screen — service catalogue with prices and descriptions | `services.read.public` | **[done]** |
| Guest screen — social media links | `social.read.public` | **[done]** |
| "Schedule now" call to action → sign-up | `account.create` | **[done]** |

### Module: Authentication

| Feature | Access policy | Status |
|---|---|---|
| Sign-in by email or cellphone | Open | **[partial]** — email path implemented; cellphone path not wired |
| Password policy: min. 8 chars, letters **and** digits | Open | **[done]** — `validatePassword()` in `AuthContext.tsx` |
| Sign-up, profile fixed to `Client` server-side | `account.create` | **[partial]** — role is written from the client, see Gap A |
| Sign-out returns to splash | Authenticated | **[done]** |
| Demo mode when Supabase is unconfigured | Open | **[done]** — local session, no network |

### Module: Client

Permissions: `vehicle.*.own`, `order.read.own`, `order.create.own`, `profile.self.update`

| Feature | Access policy | Status |
|---|---|---|
| Dashboard — active orders, colour-coded by status | `order.read.own` | **[done]** |
| Vehicle list, restricted to the signed-in owner | `vehicle.read.own` | **[done]** |
| Vehicle registration, duplicate plate rejected | `vehicle.create.own` | **[done]** — `unique` on `license_plate` |
| Vehicle detail with its order history | `order.read.own` | **[done]** |
| Order history (cancelled / delivered) | `order.read.own` | **[done]** |
| Notifications by status | `order.read.own` | **[done]** |
| Schedule a new service order | `order.create.own` | **[todo]** — `PlaceholderScreen` |
| Profile screen with language switch | `profile.self.update` | **[partial]** — see Gap C |

### Module: Specialist

Permissions: `vehicle.read.unit`, `order.read.unit`, `order.checkin`, `order.service.*`, `order.checkout`, `order.cancel`, `stats.read.unit`

| Feature | Access policy | Status |
|---|---|---|
| Daily tiles — counts by status for the current day | `stats.read.unit` | **[done]** |
| Active vehicle list, colour-coded by status | `order.read.unit` | **[done]** |
| Check-in with entry checklist | `order.checkin` | **[done]** |
| Confirm / cancel each service inside an order | `order.cancel` | **[done]** |
| Start a confirmed service | `order.service.start` | **[done]** |
| Finish a service in progress | `order.service.finish` | **[done]** |
| Check-out with exit checklist | `order.checkout` | **[done]** |
| Order history | `order.read.unit` | **[done]** |
| Reports | `stats.read.unit` | **[todo]** — `PlaceholderScreen` |

### Module: Manager

Permissions: `catalog.write`, `pricing.write`, `template.write`, `checklist.write`, `user.read.unit`, `payment.confirm`, `stats.read.unit`, plus everything a Specialist holds.

| Feature | Access policy | Status |
|---|---|---|
| Service catalogue and global pricing | `catalog.write`, `pricing.write` | **[todo]** |
| Notification template editing | `template.write` | **[todo]** |
| Checklist item management | `checklist.write` | **[todo]** |
| Unit staff list | `user.read.unit` | **[todo]** |
| Payment confirmation | `payment.confirm` | **[todo]** |
| Consolidated statistics — day, week, month, year | `stats.read.unit` | **[todo]** |

### Module: Administrator

Permissions: everything above, plus `stats.read.network` and `user.profile.assign`.

| Feature | Access policy | Status |
|---|---|---|
| User management across the network | `user.read.unit` | **[todo]** |
| Access profile assignment | `user.profile.assign` | **[todo]** |
| Network-wide statistics | `stats.read.network` | **[todo]** |
| Unit registration and configuration | `user.profile.assign` | **[todo]** |

---

## Data models

The deployed schema (`supabase/schema.sql`) **normalizes** the array columns described in 0.1.3. Arrays such as `Users.vehicles`, `Vehicles.service_orders` and `Users.quotations` are replaced by foreign keys, which is what makes RLS expressible.

### Deltas from 0.1.3

| 0.1.3 | 0.1.4 (deployed) | Reason |
|---|---|---|
| `Users.vehicles` array | `vehicles.owner_id → users.user_id` | Ownership must be a column for RLS to filter on it |
| `Vehicles.service_orders` array | `services_orders.vehicle_id → vehicles.vehicle_id` | Same |
| `Users.quotations` array | `quotations.user_id → users.user_id` | Same |
| — | `users.auth_id → auth.users(id)` | Binds the business record to the Supabase identity |
| — | `daily_statistics` table | Materializes the daily metrics of the Statistics section |
| Multi-dimension arrays on orders | `jsonb` columns | `services_status`, `services_time`, `checklist_in_status`, `checklist_out_status` |
| — | `users.lang` | **Not yet present** — see Gap C |

Identifier formats from 0.1.3 are unchanged: `users` 7 digits · `vehicles` 4 · `services` 4 · `services_orders` 10 · `quotations` 10 · `checklist_*` 3 · status and profile tables 2 · `social_medias` 3. All sequential and generated.

Lookup tables and their seed data (`user_profiles`, `vehicle_status`, `services_orders_status`, `services`, `checklist_in`, `checklist_out`, `social_medias`, `messages`) are unchanged from 0.1.3; see `supabase/seed.sql`.

### Row Level Security — current state

| Table | RLS | Policy | Effect |
|---|---|---|---|
| `users` | enabled | `select using (auth.uid() = auth_id)` | Self-read only. **No insert/update policy** |
| `vehicles` | enabled | `for all using (owner_id in (select user_id from users where auth_id = auth.uid()))` | Owner-scoped. **Specialists cannot read them** |
| `services_orders` | enabled | **none** | **Denies every request.** See Gap B |
| all other tables | disabled | — | Fully readable by any authenticated client |

---

## Status flow and processing of vehicles and service orders

Unchanged from 0.1.3 — see `docs/app-specification-v0.1.3.md`, section *Status Flow and Processing of Vehicles and Service Orders*. The five vehicle phases (Scheduled → Awaiting → In Service → Ready → Delivered, with Cancelled as a terminal branch) and the five order statuses (Scheduled, Confirmed, Cancelled, Started, Finished) remain authoritative.

Enum values live in `src/types/index.ts` as `VehicleStatus` and `ServiceOrderStatus`, in lowercase-hyphenated form (`in-service`). The lookup tables store the display form (`In-Service`). The mapping must stay in sync.

## Statistics

Unchanged from 0.1.3. The daily cumulative metrics (Scheduled, Cancelled, On the lot = Awaiting + In Service + Ready, Awaiting, In Service, Ready, Delivered) are materialized in `daily_statistics`, keyed by date, and rolled up by day, week, month and year.

Access: `stats.read.unit` for Specialist and Manager, `stats.read.network` for Administrator. A Client never reads aggregate statistics.

## External APIs and integrations

| Integration | Purpose | Status |
|---|---|---|
| WhatsApp Business API | Service start and vehicle ready notifications | **[todo]** |
| Email | Same notifications, fallback channel | **[todo]** |
| Supabase Auth | Identity and session | **[done]** |
| Supabase Postgres | Persistence and RLS | **[partial]** |

Notification dispatch respects `users.notification_at_start` and `users.notification_at_end`, and uses the message template in the recipient's profile language.

## Non-functional requirements

1. TLS on every connection. Supabase enforces HTTPS; no plaintext endpoint may be added.
2. Credentials live in `.env` (git-ignored), surfaced as `EXPO_PUBLIC_*` and typed in `expo-env.d.ts`. **`EXPO_PUBLIC_*` values are embedded in the shipped bundle** — only the anon key belongs there, never the service-role key.
3. `npx tsc --noEmit` must pass with zero errors before any commit.
4. The app degrades to demo mode when Supabase is unconfigured, so the UI can be reviewed without a backend.
5. Dark theme only; `#0A0A0A` background across splash, icons and native launch screen.

---

## Implementation status

| Module | Built | Notes |
|---|:--:|---|
| Public / Guest | ✔ | Complete |
| Authentication | ◑ | Cellphone login path missing |
| Client | ◑ | Scheduling is a placeholder |
| Specialist | ◑ | Reports is a placeholder |
| Manager | ✗ | Not started |
| Administrator | ✗ | Not started |
| Authorization (route layer) | ✗ | See Gap A |
| Authorization (data layer) | ◑ | See Gap B |
| Internationalization | ◑ | See Gap C |
| Brand assets | ✔ | Art v1.3, complete icon set |

---

## Known gaps

These are the items that block a production release. Each is a defect against a requirement stated above, not a missing feature.

### Gap A — the access profile is client-assigned *(security)*

`AuthContext.signIn(email, password, role)` accepts the profile as an argument chosen on the sign-in screen, and `signUp` writes `role` into `auth.user_metadata`. `user_metadata` is writable by the authenticated client, so **a user can grant themselves the Specialist profile**. Separately, `RootNavigator` registers `SpecialistTabs` and `ClientTabs` in the same stack with no guard, so any session can navigate to either.

*Required fix:* make `public.users.user_profile` the only source of truth, read it after sign-in, drop the role argument and the sign-in role selector, add a route guard, and enforce the profile in RLS through a `security definer` helper rather than a client-supplied claim.

### Gap B — `services_orders` is unreachable *(functional)*

RLS is enabled on `services_orders` with no policy attached. Postgres denies all access in that configuration, so every order query fails for any non-service-role client. The screens currently work only because demo mode serves `src/lib/mockData.ts`. `vehicles` has the mirror problem: the owner-scoped policy means a Specialist cannot read the vehicles they are servicing.

*Required fix:* one policy per profile per table, derived from the permission matrix above.

### Gap C — the interface language does not follow the user profile *(requirement)*

The requirement is that every module renders in the language of the signed-in profile. Today `LanguageContext` holds the language in local component state seeded from the device locale. `lang` is captured at sign-up into `user_metadata` and declared on the `AppUser` type, but there is no `users.lang` column, nothing reads it at sign-in, and nothing persists a change made on the profile screen. Signing in on a second device loses the preference.

*Required fix:* add `users.lang`, load it into `LanguageContext` on session restore, and write it back from the profile screen.

### Gap D — cellphone sign-in is unimplemented

The sign-in screen offers email or cellphone, and 0.1.3 requires both. Only the email path calls Supabase. Cellphone sign-in needs Supabase phone auth with an OTP provider.

---

## Backlog for 0.1.5

1. Close Gaps A and B — authorization is a prerequisite for the Manager and Administrator modules.
2. Close Gap C — language persistence.
3. Client scheduling screen (`order.create.own`).
4. Specialist reports screen (`stats.read.unit`).
5. Manager module, starting with catalogue and pricing.
6. WhatsApp and email notification dispatch.
