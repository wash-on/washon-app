/// <reference types="expo/types" />

// Typings for the EXPO_PUBLIC_* variables read from .env at build time.
// Keep in sync with .env.example.
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_SUPABASE_URL: string;
    EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
