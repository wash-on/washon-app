/**
 * Keys added for the bootstrap screen and the v1.6 §13.1 catalogue.
 *
 * Rule I5 — a missing translation on a not-recommended-setting warning blocks
 * the release of that screen. There is no fallback rendering, so all three
 * locales are written here together and CI asserts key-for-key parity.
 *
 * Merge each block into the matching file in src/i18n/{pt,en,es}.ts.
 */

export const bootstrapPt = {
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

export const bootstrapEn: Record<keyof typeof bootstrapPt, string> = {
  'bootstrap.eyebrow': 'First access',
  'bootstrap.title': 'Create the network administrator',
  'bootstrap.body':
    'Enter the master password generated at deployment. It creates the first network administrator and works only once.',
  'bootstrap.field.fullName': 'Full name',
  'bootstrap.field.masterPassword': 'Master password',
  'bootstrap.placeholder.fullName': 'As you sign documents',
  'bootstrap.placeholder.masterPassword': 'Handed over by the deployment operator',
  'bootstrap.hint.oneReveal':
    'The master password is shown to the operator once. There is no second reveal.',
  'bootstrap.action.claim': 'Create administrator',
  'bootstrap.footnote.expiry':
    'The master password expires 24 hours after deployment if unused.',
  'bootstrap.success.title': 'Administrator created',
  'bootstrap.success.body':
    'Your account is now a network administrator. You can change your password at any time from your profile.',
  'bootstrap.secondAdminPending':
    'The network still has only one administrator. Two active administrators are required before going live. Invite the second — they will set their own password.',
  'bootstrap.error.secretTooShort': 'Invalid master password.',
  'bootstrap.error.nameRequired': 'Enter your full name.',
  'bootstrap.denied.authz.denied.invalidSecret': 'Incorrect master password.',
  'bootstrap.denied.authz.denied.expired':
    'The master password has expired. Ask the deployment operator for a new one.',
  'bootstrap.denied.authz.denied.stateConflict':
    'This master password has already been used. The network already has an administrator.',
  'bootstrap.denied.authz.denied.rateLimited':
    'Too many attempts. Try again in 30 minutes.',
  'bootstrap.denied.generic': 'Could not complete. Check the details and try again.',

  'admin.mfa.override.warning':
    "Not recommended. Disabling MFA reduces the protection of this user's account.",
  'admin.mfa.override.confirm': 'Keep MFA disabled for this specialist?',
  'admin.breakGlass.waived':
    'Dual approval waived. The operation will run in 30 minutes.',
  'admin.catalog.unconfirmed':
    'Service has no confirmed price band or discount limit.',
  'auth.reset.requested': "Request sent. Wait for your unit manager's authorization.",
  'auth.reset.authorized': 'Reset authorized. The link is valid for 60 minutes.',
  'auth.reset.denied': 'Request not authorized. Contact your unit manager.',
  'admin.reset.verifyIdentity':
    "Confirm the requester's identity in person before authorizing.",
  'admin.policy.pendingAck':
    'Permission changes in this release are awaiting your acknowledgement.',
  'admin.policy.expansionStaged':
    'New permissions take effect only after acknowledgement.',

  'common.signOut': 'Sign out',
  'gate.wrongApp.title': 'This account has no access to this app',
  'gate.wrongApp.useClient': 'This is a customer account. Use the WashOn app.',
  'gate.wrongApp.useStaff': 'This is a staff account. Use the WashOn Pro app.',
  'gate.choose.title': 'Choose your context',
  'gate.choose.body': 'Your account has more than one active profile. Select which one to use now.',
  'admin.home.eyebrow': 'Network administration',
  'admin.home.role': 'Role',
  'admin.home.scope': 'Scope',
  'admin.home.activeAdmins': 'Active administrators',
  'role.client': 'Customer',
  'role.specialist': 'Specialist',
  'role.unit_manager': 'Unit manager',
  'role.franchisee': 'Franchisee',
  'role.network_admin': 'Network administrator',
  'role.auditor': 'Auditor',
  'scope.self': 'Personal',
  'scope.account': 'Account',
  'scope.unit': 'Unit',
  'scope.unit_group': 'Unit group',
  'scope.network': 'Whole network',
};

export const bootstrapEs: Record<keyof typeof bootstrapPt, string> = {
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
