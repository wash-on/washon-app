-- WashOn — seed.sql (spec v0.1.3)
-- Run AFTER schema.sql in the Supabase SQL editor.

-- ── User profiles ──────────────────────────────────────────
INSERT INTO user_profiles (user_profiles_id, user_profiles_name, user_profiles_description) VALUES
  ('1', 'Guest',         'Visitante sem conta'),
  ('2', 'Client',        'Cliente cadastrado'),
  ('3', 'Specialist',    'Especialista de estética'),
  ('4', 'Manager',       'Gerente da unidade'),
  ('5', 'Administrator', 'Administrador do sistema')
ON CONFLICT (user_profiles_id) DO NOTHING;

-- ── Vehicle statuses ───────────────────────────────────────
INSERT INTO vehicle_status (vehicle_status_id, vehicle_status_name, vehicle_status_description) VALUES
  ('1', 'scheduled',  'Agendado — aguardando chegada'),
  ('2', 'awaiting',   'Aguardando — veículo no pátio'),
  ('3', 'in-service', 'Em serviço — serviço iniciado'),
  ('4', 'ready',      'Pronto — aguardando retirada'),
  ('5', 'delivered',  'Entregue — serviço concluído'),
  ('6', 'cancelled',  'Cancelado')
ON CONFLICT (vehicle_status_id) DO NOTHING;

-- ── Service order statuses ─────────────────────────────────
INSERT INTO services_orders_status (services_orders_status_id, services_orders_status_name, services_orders_status_description) VALUES
  ('1', 'scheduled',  'Ordem agendada'),
  ('2', 'confirmed',  'Check-in confirmado'),
  ('3', 'started',    'Serviço iniciado'),
  ('4', 'finished',   'Serviço finalizado'),
  ('5', 'cancelled',  'Ordem cancelada')
ON CONFLICT (services_orders_status_id) DO NOTHING;

-- ── Social media links ─────────────────────────────────────
INSERT INTO social_medias (social_medias_id, social_medias_name, social_medias_enabled, social_medias_description) VALUES
  ('1', 'Instagram', true, 'https://www.instagram.com/washonestetica'),
  ('2', 'Facebook',  true, 'https://www.facebook.com/p/Wash-on-est%C3%A9tica-automotiva-61555475860948/')
ON CONFLICT (social_medias_id) DO NOTHING;

-- ── Check-in checklist items (4 items) ────────────────────
INSERT INTO checklist_in (checklist_in_id, checklist_in_name, checklist_in_description) VALUES
  ('1', 'Amassados',          'Verificar presença de amassados na carroceria'),
  ('2', 'Arranhões',          'Verificar presença de arranhões na pintura'),
  ('3', 'Vidros',             'Verificar estado dos vidros (trincados, quebrados)'),
  ('4', 'Peças defeituosas',  'Verificar peças com defeito aparente (retrovisores, maçanetas, etc.)')
ON CONFLICT (checklist_in_id) DO NOTHING;

-- ── Check-out checklist items (9 items) ───────────────────
INSERT INTO checklist_out (checklist_out_id, checklist_out_name, checklist_out_description) VALUES
  ('1', 'Pintura impecável',     'Pintura sem manchas, riscos ou resíduos após o serviço'),
  ('2', 'Rodas limpas',          'Rodas e pneus limpos e sem resíduos de produtos'),
  ('3', 'Vidros limpos',         'Vidros internos e externos limpos e sem manchas'),
  ('4', 'Interior aspirado',     'Tapetes, bancos e carpetes aspirados'),
  ('5', 'Dashboard limpo',       'Painel, console e plásticos internos limpos'),
  ('6', 'Porta-malas limpo',     'Porta-malas aspirado e limpo'),
  ('7', 'Cheiro agradável',      'Interior com cheiro agradável após higienização'),
  ('8', 'Sem produtos visíveis', 'Nenhum produto de limpeza residual visível'),
  ('9', 'Documentos no lugar',   'Documentos do veículo conferidos e no lugar')
ON CONFLICT (checklist_out_id) DO NOTHING;

-- ── Services catalog (7 services) ─────────────────────────
INSERT INTO services (
  service_id, service_name, service_enabled,
  service_value_global_small, service_value_global_medium, service_value_global_large,
  service_description
) VALUES
  ('1', 'Lavagem Básica',       true,  60.00,   80.00,  100.00, 'Lavagem externa completa com shampoo neutro, rodas e pneus.'),
  ('2', 'Lavagem Premium',      true, 120.00,  150.00,  190.00, 'Lavagem externa + aspiração interior, painel e vidros internos.'),
  ('3', 'Polimento',            true, 350.00,  420.00,  500.00, 'Correção de pintura, remoção de riscos e brilho profissional.'),
  ('4', 'Higienização Interna', true, 280.00,  340.00,  420.00, 'Limpeza profunda do interior com extratora a vapor.'),
  ('5', 'Cristalização',        true, 800.00, 1000.00, 1300.00, 'Proteção com cristal de sílica. Até 12 meses de brilho.'),
  ('6', 'Vitrificação',         true,1500.00, 2000.00, 2500.00, 'Revestimento cerâmico de longa duração, até 5 anos.'),
  ('7', 'Insulfilm',            true, 450.00,  550.00,  680.00, 'Película de controle solar. Reduz calor e bloqueia UV.')
ON CONFLICT (service_id) DO NOTHING;

-- ── App message defaults ───────────────────────────────────
INSERT INTO messages (start_message_global, end_message_global) VALUES
  (
    'Seu veículo entrou para o serviço. Em breve você receberá uma atualização!',
    'Seu veículo está pronto! Pode vir buscá-lo. Obrigado por escolher a WashOn!'
  );
