import type { ServiceOrder } from '@/types';

// Demo data mirroring the prototype. Replace with Supabase queries.
export const MOCK_ORDERS: ServiceOrder[] = [
  { service_order_id: '0000000001', vehicle_id: '0001', license_plate: 'ABC-1234', make: 'Honda', model: 'Civic', service_name: 'Polimento', color: 'Prata', vehicle_status: 'in-service', service_value_final: 420, service_order_payment_status: false },
  { service_order_id: '0000000002', vehicle_id: '0002', license_plate: 'XYZ-5678', make: 'Toyota', model: 'Corolla', service_name: 'Lavagem Premium', color: 'Branco', vehicle_status: 'awaiting', service_value_final: 150, service_order_payment_status: false },
  { service_order_id: '0000000003', vehicle_id: '0003', license_plate: 'DEF-9012', make: 'VW', model: 'Polo', service_name: 'Higienização Interna', color: 'Azul', vehicle_status: 'ready', service_value_final: 340, service_order_payment_status: false },
  { service_order_id: '0000000004', vehicle_id: '0004', license_plate: 'GHI-3456', make: 'Ford', model: 'Ka', service_name: 'Cristalização', color: 'Vermelho', vehicle_status: 'scheduled', service_value_final: 1000, service_order_payment_status: false },
  { service_order_id: '0000000005', vehicle_id: '0005', license_plate: 'JKL-7890', make: 'Jeep', model: 'Compass', service_name: 'Vitrificação', color: 'Preto', vehicle_status: 'delivered', service_value_final: 2000, service_order_payment_status: true },
  { service_order_id: '0000000006', vehicle_id: '0006', license_plate: 'MNO-2345', make: 'Hyundai', model: 'HB20', service_name: 'Lavagem Básica', color: 'Cinza', vehicle_status: 'cancelled', service_value_final: 80, service_order_payment_status: false },
];

export const CLIENT_ORDERS: ServiceOrder[] = [
  { service_order_id: '0000000010', vehicle_id: 'c001', license_plate: 'MSA-0001', make: 'Fiat', model: 'Argo', service_name: 'Lavagem Premium', color: 'Branco', vehicle_status: 'in-service', service_value_final: 150, service_order_payment_status: false },
];

export const SERVICE_NAMES = [
  'Lavagem Básica', 'Lavagem Premium', 'Polimento', 'Higienização Interna',
  'Cristalização', 'Vitrificação', 'Insulfilm',
];

export const colorHex: Record<string, string> = {
  Prata: '#b0b0b0', Branco: '#f5f5f5', Azul: '#3578e5', Vermelho: '#e53935',
  Preto: '#222', Cinza: '#888', Verde: '#2e7d32',
};
