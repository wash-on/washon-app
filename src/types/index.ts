export type UserProfile = 'Guest' | 'Client' | 'Specialist' | 'Manager' | 'Administrator';
export type Lang = 'pt' | 'en' | 'es';

export type VehicleStatus =
  | 'scheduled' | 'awaiting' | 'in-service' | 'ready' | 'delivered' | 'cancelled';
export type ServiceOrderStatus =
  | 'scheduled' | 'confirmed' | 'cancelled' | 'started' | 'finished';

export interface AppUser {
  user_id: string;
  username: string;
  name: string;
  surname: string;
  cellphone_1: string;
  cellphone_2?: string;
  email: string;
  cpf: string;
  notification_at_start: boolean;
  notification_at_end: boolean;
  user_profile: UserProfile;
  lang: Lang;
}

export interface Vehicle {
  vehicle_id: string;
  make: string;
  model: string;
  license_plate: string;
  color: string;
  fuel: string;
  detailing_category: string;
}

export interface Service {
  service_id: string;
  service_name: string;
  service_enabled: boolean;
  service_value_global_small: number;
  service_value_global_medium: number;
  service_value_global_large: number;
  service_description: string;
}

export interface ServiceOrder {
  service_order_id: string;
  vehicle_id: string;
  vehicle_status: VehicleStatus;
  service_name?: string;
  make?: string;
  model?: string;
  color?: string;
  license_plate?: string;
  service_value_final?: number;
  service_order_start?: string;
  service_order_end?: string;
  service_order_payment_status: boolean;
}

export interface ChecklistItemDef {
  id: string;
  name: string;
  description?: string;
}
