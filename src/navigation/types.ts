import type { ServiceOrder } from '@/types';

export type RootStackParamList = {
  Splash: undefined;
  Auth: { mode?: 'login' | 'signup' } | undefined;
  Guest: undefined;
  VehicleReg: { from?: keyof RootStackParamList } | undefined;
  SpecialistTabs: undefined;
  ClientTabs: undefined;
  VehicleDetail: { order: ServiceOrder };
  Notifications: undefined;
};

export type SpecialistTabParamList = {
  Home: undefined;
  Vehicles: undefined;
  Reports: undefined;
  Profile: undefined;
};

export type ClientTabParamList = {
  Home: undefined;
  Vehicles: undefined;
  Schedule: undefined;
  Profile: undefined;
};
