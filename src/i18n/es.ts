export const es = {
  common: {
    enter: 'Entrar', signup: 'Crear cuenta', guest: 'Continuar como invitado',
    cancel: 'Cancelar', save: 'Guardar', back: 'Atrás', confirm: 'Confirmar',
    logout: 'Cerrar sesión', loading: 'Cargando...',
  },
  // Tagline de interfaz (localizado). El término grabado en el logotipo es
  // siempre "Estética Automotiva" — es arte, no texto de interfaz.
  splash: { tagline: 'Estética Automotriz' },
  auth: {
    email: 'Correo', phone: 'Celular', password: 'Contraseña',
    emailLabel: 'Correo electrónico', phoneLabel: 'Número de celular',
    pwdHint: 'Debe contener letras y números', pwdPlaceholder: 'Mínimo 8 caracteres',
    role: 'Perfil de acceso', client: 'Cliente', specialist: 'Especialista',
    name: 'Nombre', surname: 'Apellido', cpf: 'CPF',
    phone1: 'Celular 1', phone2: 'Celular 2', prefLang: 'Idioma preferido',
    confirmPwd: 'Confirmar contraseña', repeatPwd: 'Repite la contraseña',
    haveAccount: 'Ya tengo cuenta', addVehicle: '+ Agregar vehículo',
    googleSignin: 'Entrar con Google',
    errPwd: 'La contraseña debe tener mínimo 8 caracteres con letras y números.',
    errName: 'Ingresa tu nombre.', errPwdMatch: 'Las contraseñas no coinciden.',
    created: '¡Cuenta creada! Bienvenido(a)',
  },
  guest: { title: 'Nuestros servicios', sub: 'Estética automotriz profesional',
    services: 'Servicios disponibles', social: 'Redes sociales',
    ctaTitle: 'Reserva ahora', ctaSub: 'Crea tu cuenta gratis y reserva un servicio',
    small: 'Pequeño', medium: 'Mediano', large: 'Grande' },
  dash: {
    scheduled: 'Agendados', awaiting: 'En espera', inService: 'En servicio',
    ready: 'Listos', delivered: 'Entregados', cancelled: 'Cancelados',
    checkin: 'Check-in', checkout: 'Check-out',
    checkinSub: 'Registrar entrada', checkoutSub: 'Registrar salida',
    inProgress: 'Vehículos en curso', activeOrders: 'Órdenes activas',
    myVehicles: 'Mis vehículos', history: 'Historial',
  },
  status: {
    scheduled: 'Agendado', awaiting: 'En espera', 'in-service': 'En servicio',
    ready: 'Listo', delivered: 'Entregado', cancelled: 'Cancelado', confirmed: 'Confirmado',
  },
  detail: {
    title: 'Orden de Servicio', services: 'Servicios', timeline: 'Historial',
    confirmCheckin: '✓ Confirmar Check-in', cancel: '✗ Cancelar',
    startService: '▶ Iniciar Servicio', finishService: '✓ Finalizar Servicio',
    confirmDelivery: 'Confirmar Entrega', finished: 'Orden de servicio finalizada',
    track: 'Sigue el estado arriba',
    tlScheduled: 'Agendado', tlCheckin: 'Check-in realizado',
    tlStarted: 'Servicio iniciado', tlReady: 'Listo para entrega', tlDelivered: 'Entregado',
  },
  checkin: {
    title: 'Check-in de Vehículo', sub: 'Registra la entrada del vehículo',
    plate: 'Placa', make: 'Marca', model: 'Modelo', color: 'Color',
    fuel: 'Combustible', service: 'Servicio', clientName: 'Nombre del cliente',
    checklistIn: 'Lista de entrada',
    dents: 'Abolladuras', scratches: 'Rayones', glass: 'Vidrios', parts: 'Piezas defectuosas',
  },
  checkout: {
    title: 'Check-out de Vehículo', sub: 'Confirma la entrega y el pago',
    checklistOut: 'Lista de salida', total: 'Total (R$)',
    payment: 'Pago', notes: 'Notas',
    paint: 'Pintura impecable', wheels: 'Ruedas limpias', glass: 'Vidrios limpios',
    vacuum: 'Interior aspirado', dashboard: 'Tablero limpio',
  },
  vehicleReg: {
    title: 'Registrar Vehículo', sub: 'Ingresa los datos del vehículo',
    category: 'Categoría (tamaño)', notes: 'Notas',
    saved: '¡Vehículo registrado!', errPlate: 'Ingresa la placa del vehículo.',
    errDup: 'Esta placa ya está registrada.',
  },
  vehicles: { title: 'Vehículos', all: 'Todos', search: 'Buscar placa o modelo...', schedule: '+ Agendar' },
  notifications: { title: 'Notificaciones', today: 'Hoy', yesterday: 'Ayer' },
  profile: {
    title: 'Mi Perfil', language: 'Idioma', account: 'Cuenta',
    editProfile: 'Editar perfil', changePwd: 'Cambiar contraseña', myVehicles: 'Mis vehículos',
    notifications: 'Notificaciones', notifStart: 'Notif. inicio del servicio',
    notifEnd: 'Notif. fin del servicio', yes: 'Sí',
    support: 'Soporte', help: 'Centro de ayuda', version: 'Versión de la app',
  },
  nav: { home: 'Inicio', vehicles: 'Vehículos', reports: 'Reportes', profile: 'Perfil', schedule: 'Agendar' },
  toast: { langChanged: 'Idioma cambiado', sessionEnded: 'Sesión finalizada', soon: 'Próximamente' },
    'bootstrap.eyebrow': 'Primer acceso',
    'bootstrap.title': 'Crear el administrador de la red',
    'bootstrap.body':
      'Introduzca la contraseña maestra generada en el despliegue. Crea el primer administrador de la red y solo sirve una vez.',
    'bootstrap.field.fullName': 'Nombre completo',
    'bootstrap.field.masterPassword': 'Contraseña maestra',
    'bootstrap.placeholder.fullName': 'Como firma documentos',
    'bootstrap.placeholder.masterPassword': 'Entregada por el operador del despliegue',
    'bootstrap.hint.oneReveal':
      'La contraseña maestra se muestra al operador una sola vez. No hay una segunda revelación.',
    'bootstrap.action.claim': 'Crear administrador',
    'bootstrap.footnote.expiry':
      'La contraseña maestra caduca 24 horas después del despliegue si no se utiliza.',
    'bootstrap.success.title': 'Administrador creado',
    'bootstrap.success.body':
      'Su cuenta ya es administradora de la red. Puede cambiar su contraseña cuando quiera desde su perfil.',
    'bootstrap.secondAdminPending':
      'La red todavía tiene un solo administrador. Se exigen dos administradores activos antes de la puesta en producción. Invite al segundo — él definirá su propia contraseña.',
    'bootstrap.error.secretTooShort': 'Contraseña maestra no válida.',
    'bootstrap.error.nameRequired': 'Introduzca su nombre completo.',
    'bootstrap.denied.authz.denied.invalidSecret': 'Contraseña maestra incorrecta.',
    'bootstrap.denied.authz.denied.expired':
      'La contraseña maestra ha caducado. Solicite una nueva al operador del despliegue.',
    'bootstrap.denied.authz.denied.stateConflict':
      'Esta contraseña maestra ya se ha utilizado. La red ya tiene un administrador.',
    'bootstrap.denied.authz.denied.rateLimited':
      'Demasiados intentos. Inténtelo de nuevo en 30 minutos.',
    'bootstrap.denied.generic': 'No se pudo completar. Revise los datos e inténtelo de nuevo.',

    'admin.mfa.override.warning':
      'No recomendado. Desactivar la MFA reduce la protección de la cuenta de este usuario.',
    'admin.mfa.override.confirm': '¿Mantener la MFA desactivada para este especialista?',
    'admin.breakGlass.waived':
      'Aprobación doble omitida. La operación se ejecutará en 30 minutos.',
    'admin.catalog.unconfirmed':
      'Servicio sin banda de precio o límite de descuento confirmados.',
    'auth.reset.requested':
      'Solicitud enviada. Espere la autorización del gerente de la unidad.',
    'auth.reset.authorized': 'Restablecimiento autorizado. El enlace es válido por 60 minutos.',
    'auth.reset.denied': 'Solicitud no autorizada. Contacte al gerente de su unidad.',
    'admin.reset.verifyIdentity':
      'Confirme la identidad del solicitante en persona antes de autorizar.',
    'admin.policy.pendingAck':
      'Los cambios de permisos de esta versión esperan su confirmación.',
    'admin.policy.expansionStaged':
      'Los nuevos permisos solo entran en vigor tras la confirmación.',

    'common.signOut': 'Salir',
    'gate.wrongApp.title': 'Esta cuenta no tiene acceso a esta aplicación',
    'gate.wrongApp.useClient': 'Es una cuenta de cliente. Use la aplicación WashOn.',
    'gate.wrongApp.useStaff': 'Es una cuenta del equipo. Use la aplicación WashOn Pro.',
    'gate.choose.title': 'Elija el contexto',
    'gate.choose.body': 'Su cuenta tiene más de un perfil activo. Seleccione con cuál desea entrar ahora.',
    'admin.home.eyebrow': 'Administración de la red',
    'admin.home.role': 'Perfil',
    'admin.home.scope': 'Alcance',
    'admin.home.activeAdmins': 'Administradores activos',
    'role.client': 'Cliente',
    'role.specialist': 'Especialista',
    'role.unit_manager': 'Gerente de unidad',
    'role.franchisee': 'Franquiciado',
    'role.network_admin': 'Administrador de la red',
    'role.auditor': 'Auditor',
    'scope.self': 'Personal',
    'scope.account': 'Cuenta',
    'scope.unit': 'Unidad',
    'scope.unit_group': 'Grupo de unidades',
    'scope.network': 'Toda la red',
};
