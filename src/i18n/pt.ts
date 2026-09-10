export const pt = {
  common: {
    enter: 'Entrar', signup: 'Criar conta', guest: 'Continuar como visitante',
    cancel: 'Cancelar', save: 'Salvar', back: 'Voltar', confirm: 'Confirmar',
    logout: 'Sair da conta', loading: 'Carregando...',
  },
  // UI tagline (localizada). O termo gravado no logotipo é sempre
  // "Estética Automotiva" — arte, não texto de interface.
  splash: { tagline: 'Estética Automotiva' },
  auth: {
    email: 'E-mail', phone: 'Celular', password: 'Senha',
    emailLabel: 'Endereço de e-mail', phoneLabel: 'Número de celular',
    pwdHint: 'Deve conter letras e números', pwdPlaceholder: 'Mínimo 8 caracteres',
    role: 'Perfil de acesso', client: 'Cliente', specialist: 'Especialista',
    name: 'Nome', surname: 'Sobrenome', cpf: 'CPF',
    phone1: 'Celular 1', phone2: 'Celular 2', prefLang: 'Idioma preferido',
    confirmPwd: 'Confirmar senha', repeatPwd: 'Repita a senha',
    haveAccount: 'Já tenho conta', addVehicle: '+ Adicionar veículo',
    googleSignin: 'Entrar com Google',
    errPwd: 'Senha deve ter mínimo 8 caracteres com letras e números.',
    errName: 'Informe seu nome.', errPwdMatch: 'As senhas não coincidem.',
    created: 'Conta criada! Bem-vindo(a)',
  },
  guest: { title: 'Nossos serviços', sub: 'Estética automotiva profissional',
    services: 'Serviços disponíveis', social: 'Redes sociais',
    ctaTitle: 'Agende agora', ctaSub: 'Crie sua conta grátis e agende um serviço',
    small: 'Pequeno', medium: 'Médio', large: 'Grande' },
  dash: {
    scheduled: 'Agendados', awaiting: 'Aguardando', inService: 'Em serviço',
    ready: 'Prontos', delivered: 'Entregues', cancelled: 'Cancelados',
    checkin: 'Check-in', checkout: 'Check-out',
    checkinSub: 'Registrar entrada', checkoutSub: 'Registrar saída',
    inProgress: 'Veículos em andamento', activeOrders: 'Ordens ativas',
    myVehicles: 'Meus veículos', history: 'Histórico',
  },
  status: {
    scheduled: 'Agendado', awaiting: 'Aguardando', 'in-service': 'Em serviço',
    ready: 'Pronto', delivered: 'Entregue', cancelled: 'Cancelado', confirmed: 'Confirmado',
  },
  detail: {
    title: 'Ordem de Serviço', services: 'Serviços', timeline: 'Histórico',
    confirmCheckin: '✓ Confirmar Check-in', cancel: '✗ Cancelar',
    startService: '▶ Iniciar Serviço', finishService: '✓ Finalizar Serviço',
    confirmDelivery: 'Confirmar Entrega', finished: 'Ordem de serviço finalizada',
    track: 'Acompanhe o status acima',
    tlScheduled: 'Agendado', tlCheckin: 'Check-in realizado',
    tlStarted: 'Serviço iniciado', tlReady: 'Pronto para entrega', tlDelivered: 'Entregue',
  },
  checkin: {
    title: 'Check-in de Veículo', sub: 'Registre a entrada do veículo no pátio',
    plate: 'Placa', make: 'Marca', model: 'Modelo', color: 'Cor',
    fuel: 'Combustível', service: 'Serviço', clientName: 'Nome do cliente',
    checklistIn: 'Checklist de entrada',
    dents: 'Amassados', scratches: 'Arranhões', glass: 'Vidros', parts: 'Peças defeituosas',
  },
  checkout: {
    title: 'Check-out de Veículo', sub: 'Confirme a entrega e pagamento',
    checklistOut: 'Checklist de saída', total: 'Valor total (R$)',
    payment: 'Pagamento', notes: 'Observações',
    paint: 'Pintura impecável', wheels: 'Rodas limpas', glass: 'Vidros limpos',
    vacuum: 'Interior aspirado', dashboard: 'Dashboard limpo',
  },
  vehicleReg: {
    title: 'Cadastrar Veículo', sub: 'Informe os dados do veículo',
    category: 'Categoria (porte)', notes: 'Observações',
    saved: 'Veículo cadastrado!', errPlate: 'Informe a placa do veículo.',
    errDup: 'Esta placa já está cadastrada.',
  },
  vehicles: { title: 'Veículos', all: 'Todos', search: 'Buscar placa ou modelo...', schedule: '+ Agendar' },
  notifications: { title: 'Notificações', today: 'Hoje', yesterday: 'Ontem' },
  profile: {
    title: 'Meu Perfil', language: 'Idioma', account: 'Conta',
    editProfile: 'Editar perfil', changePwd: 'Alterar senha', myVehicles: 'Meus veículos',
    notifications: 'Notificações', notifStart: 'Notif. início do serviço',
    notifEnd: 'Notif. fim do serviço', yes: 'Sim',
    support: 'Suporte', help: 'Central de ajuda', version: 'Versão do app',
  },
  nav: { home: 'Início', vehicles: 'Veículos', reports: 'Relatórios', profile: 'Perfil', schedule: 'Agendar' },
  toast: { langChanged: 'Idioma alterado', sessionEnded: 'Sessão encerrada', soon: 'Em breve' },
    'bootstrap.eyebrow': 'Primeiro acesso',
    'bootstrap.title': 'Criar o administrador da rede',
    'bootstrap.body':
      'Informe a senha mestra gerada na implantação. Ela cria o primeiro administrador da rede e é válida uma única vez.',
    'bootstrap.field.fullName': 'Nome completo',
    'bootstrap.field.masterPassword': 'Senha mestra',
    'bootstrap.placeholder.fullName': 'Como você assina documentos',
    'bootstrap.placeholder.masterPassword': 'Entregue pelo operador da implantação',
    'bootstrap.hint.oneReveal':
      'A senha mestra é exibida uma única vez ao operador. Não há segunda exibição.',
    'bootstrap.action.claim': 'Criar administrador',
    'bootstrap.footnote.expiry':
      'A senha mestra expira 24 horas após a implantação se não for utilizada.',
    'bootstrap.success.title': 'Administrador criado',
    'bootstrap.success.body':
      'Sua conta agora é administradora da rede. Você pode alterar sua senha a qualquer momento no perfil.',
    'bootstrap.secondAdminPending':
      'A rede ainda tem apenas um administrador. São exigidos dois administradores ativos antes da entrada em produção. Convide o segundo administrador — ele definirá a própria senha.',
    'bootstrap.error.secretTooShort': 'Senha mestra inválida.',
    'bootstrap.error.nameRequired': 'Informe seu nome completo.',
    'bootstrap.denied.authz.denied.invalidSecret': 'Senha mestra incorreta.',
    'bootstrap.denied.authz.denied.expired':
      'A senha mestra expirou. Solicite uma nova ao operador da implantação.',
    'bootstrap.denied.authz.denied.stateConflict':
      'Esta senha mestra já foi utilizada. A rede já possui um administrador.',
    'bootstrap.denied.authz.denied.rateLimited':
      'Muitas tentativas. Tente novamente em 30 minutos.',
    'bootstrap.denied.generic': 'Não foi possível concluir. Verifique os dados e tente novamente.',

    // v1.6 §13.1 — required catalogue
    'admin.mfa.override.warning':
      'Não recomendado. Desativar a MFA reduz a proteção da conta deste usuário.',
    'admin.mfa.override.confirm': 'Manter MFA desativada para este especialista?',
    'admin.breakGlass.waived':
      'Aprovação dupla dispensada. A operação será executada em 30 minutos.',
    'admin.catalog.unconfirmed':
      'Serviço sem banda de preço ou limite de desconto confirmados.',
    'auth.reset.requested':
      'Solicitação enviada. Aguarde a autorização do gerente da unidade.',
    'auth.reset.authorized': 'Redefinição autorizada. O link é válido por 60 minutos.',
    'auth.reset.denied': 'Solicitação não autorizada. Procure o gerente da sua unidade.',
    'admin.reset.verifyIdentity':
      'Confirme a identidade do solicitante pessoalmente antes de autorizar.',
    'admin.policy.pendingAck':
      'Alterações de permissões desta versão aguardam sua confirmação.',
    'admin.policy.expansionStaged':
      'Novas permissões só entram em vigor após a confirmação.',

    // Access gate, admin landing, role and scope labels
    'common.signOut': 'Sair',
    'gate.wrongApp.title': 'Conta sem acesso a este aplicativo',
    'gate.wrongApp.useClient': 'Esta conta é de cliente. Use o aplicativo WashOn.',
    'gate.wrongApp.useStaff': 'Esta conta é da equipe. Use o aplicativo WashOn Pro.',
    'gate.choose.title': 'Escolha o contexto',
    'gate.choose.body': 'Sua conta tem mais de um perfil ativo. Selecione com qual deseja entrar agora.',
    'admin.home.eyebrow': 'Administração da rede',
    'admin.home.role': 'Perfil',
    'admin.home.scope': 'Abrangência',
    'admin.home.activeAdmins': 'Administradores ativos',
    'role.client': 'Cliente',
    'role.specialist': 'Especialista',
    'role.unit_manager': 'Gerente de unidade',
    'role.franchisee': 'Franqueado',
    'role.network_admin': 'Administrador da rede',
    'role.auditor': 'Auditor',
    'scope.self': 'Pessoal',
    'scope.account': 'Conta',
    'scope.unit': 'Unidade',
    'scope.unit_group': 'Grupo de unidades',
    'scope.network': 'Rede inteira',
};
