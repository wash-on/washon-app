export const en = {
  common: {
    enter: 'Sign in', signup: 'Sign up', guest: 'Continue as guest',
    cancel: 'Cancel', save: 'Save', back: 'Back', confirm: 'Confirm',
    logout: 'Sign out', loading: 'Loading...',
  },
  // Localized UI tagline. The tagline burned into the logo artwork is
  // always "Estética Automotiva" and is never translated.
  splash: { tagline: 'Auto Detailing' },
  auth: {
    email: 'Email', phone: 'Phone', password: 'Password',
    emailLabel: 'Email address', phoneLabel: 'Phone number',
    pwdHint: 'Must contain letters and numbers', pwdPlaceholder: 'Minimum 8 characters',
    role: 'Access profile', client: 'Client', specialist: 'Specialist',
    name: 'Name', surname: 'Surname', cpf: 'CPF',
    phone1: 'Phone 1', phone2: 'Phone 2', prefLang: 'Preferred language',
    confirmPwd: 'Confirm password', repeatPwd: 'Repeat password',
    haveAccount: 'I already have an account', addVehicle: '+ Add vehicle',
    googleSignin: 'Sign in with Google',
    errPwd: 'Password must be at least 8 characters with letters and numbers.',
    errName: 'Enter your name.', errPwdMatch: 'Passwords do not match.',
    created: 'Account created! Welcome',
  },
  guest: { title: 'Our services', sub: 'Professional auto detailing',
    services: 'Available services', social: 'Social media',
    ctaTitle: 'Book now', ctaSub: 'Create your free account and book a service',
    small: 'Small', medium: 'Medium', large: 'Large' },
  dash: {
    scheduled: 'Scheduled', awaiting: 'Awaiting', inService: 'In service',
    ready: 'Ready', delivered: 'Delivered', cancelled: 'Cancelled',
    checkin: 'Check-in', checkout: 'Check-out',
    checkinSub: 'Register entry', checkoutSub: 'Register exit',
    inProgress: 'Vehicles in progress', activeOrders: 'Active orders',
    myVehicles: 'My vehicles', history: 'History',
  },
  status: {
    scheduled: 'Scheduled', awaiting: 'Awaiting', 'in-service': 'In service',
    ready: 'Ready', delivered: 'Delivered', cancelled: 'Cancelled', confirmed: 'Confirmed',
  },
  detail: {
    title: 'Service Order', services: 'Services', timeline: 'Timeline',
    confirmCheckin: '✓ Confirm Check-in', cancel: '✗ Cancel',
    startService: '▶ Start Service', finishService: '✓ Finish Service',
    confirmDelivery: 'Confirm Delivery', finished: 'Service order completed',
    track: 'Track the status above',
    tlScheduled: 'Scheduled', tlCheckin: 'Check-in done',
    tlStarted: 'Service started', tlReady: 'Ready for delivery', tlDelivered: 'Delivered',
  },
  checkin: {
    title: 'Vehicle Check-in', sub: 'Register the vehicle entry',
    plate: 'Plate', make: 'Make', model: 'Model', color: 'Color',
    fuel: 'Fuel', service: 'Service', clientName: 'Client name',
    checklistIn: 'Entry checklist',
    dents: 'Dents', scratches: 'Scratches', glass: 'Glass', parts: 'Defective parts',
  },
  checkout: {
    title: 'Vehicle Check-out', sub: 'Confirm delivery and payment',
    checklistOut: 'Exit checklist', total: 'Total (R$)',
    payment: 'Payment', notes: 'Notes',
    paint: 'Flawless paint', wheels: 'Clean wheels', glass: 'Clean windows',
    vacuum: 'Vacuumed interior', dashboard: 'Clean dashboard',
  },
  vehicleReg: {
    title: 'Register Vehicle', sub: 'Enter the vehicle data',
    category: 'Category (size)', notes: 'Notes',
    saved: 'Vehicle registered!', errPlate: 'Enter the license plate.',
    errDup: 'This plate is already registered.',
  },
  vehicles: { title: 'Vehicles', all: 'All', search: 'Search plate or model...', schedule: '+ Schedule' },
  notifications: { title: 'Notifications', today: 'Today', yesterday: 'Yesterday' },
  profile: {
    title: 'My Profile', language: 'Language', account: 'Account',
    editProfile: 'Edit profile', changePwd: 'Change password', myVehicles: 'My vehicles',
    notifications: 'Notifications', notifStart: 'Service start notif.',
    notifEnd: 'Service end notif.', yes: 'Yes',
    support: 'Support', help: 'Help center', version: 'App version',
  },
  nav: { home: 'Home', vehicles: 'Vehicles', reports: 'Reports', profile: 'Profile', schedule: 'Schedule' },
  toast: { langChanged: 'Language changed', sessionEnded: 'Session ended', soon: 'Coming soon' },
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
