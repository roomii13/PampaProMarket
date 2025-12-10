export type UserRole = 'admin' | 'prestador' | 'contratante';

export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  telefono?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  prestadorId: string;
  prestadorNombre: string;
  disponible: boolean;
}

export interface Solicitud {
  id: string;
  servicioId: string;
  servicioNombre: string;
  contratanteId: string;
  contratanteNombre: string;
  prestadorId: string;
  prestadorNombre: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada' | 'completada';
  fecha: string;
  mensaje: string;
}

const USERS_KEY = 'pampapro_users';
const CURRENT_USER_KEY = 'pampapro_current_user';
const SERVICES_KEY = 'pampapro_services';
const SOLICITUDES_KEY = 'pampapro_solicitudes';

export const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@pampapro.com',
    nombre: 'Carlos',
    apellido: 'Administrador',
    rol: 'admin',
    telefono: '+54 11 1234-5678',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'prestador@pampapro.com',
    nombre: 'María',
    apellido: 'González',
    rol: 'prestador',
    telefono: '+54 11 2345-6789',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'contratante@pampapro.com',
    nombre: 'Juan',
    apellido: 'Pérez',
    rol: 'contratante',
    telefono: '+54 11 3456-7890',
    createdAt: new Date().toISOString(),
  },
];

export const defaultServices: Service[] = [
  {
    id: '1',
    nombre: 'Limpieza del Hogar',
    descripcion: 'Servicio completo de limpieza para casas y departamentos. Incluye limpieza de pisos, baños, cocina y áreas comunes.',
    precio: 15000,
    categoria: 'Limpieza',
    prestadorId: '2',
    prestadorNombre: 'María González',
    disponible: true,
  },
  {
    id: '2',
    nombre: 'Plomería General',
    descripcion: 'Reparación de cañerías, instalación de grifos, destape de desagües y todo tipo de trabajos de plomería.',
    precio: 25000,
    categoria: 'Plomería',
    prestadorId: '2',
    prestadorNombre: 'María González',
    disponible: true,
  },
  {
    id: '3',
    nombre: 'Electricidad Residencial',
    descripcion: 'Instalaciones eléctricas, reparación de cortocircuitos, cambio de tomacorrientes y llaves de luz.',
    precio: 20000,
    categoria: 'Electricidad',
    prestadorId: '2',
    prestadorNombre: 'María González',
    disponible: true,
  },
];

export function initializeData() {
  if (typeof window === 'undefined') return;
  
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
  
  const services = localStorage.getItem(SERVICES_KEY);
  if (!services) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(defaultServices));
  }
  
  const solicitudes = localStorage.getItem(SOLICITUDES_KEY);
  if (!solicitudes) {
    localStorage.setItem(SOLICITUDES_KEY, JSON.stringify([]));
  }
}

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function login(email: string, password: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user && password === '123456') {
    setCurrentUser(user);
    return user;
  }
  return null;
}

export function logout() {
  setCurrentUser(null);
}

export function register(userData: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers();
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setCurrentUser(newUser);
  return newUser;
}

export function getServices(): Service[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SERVICES_KEY);
  return data ? JSON.parse(data) : [];
}

export function addService(service: Omit<Service, 'id'>): Service {
  const services = getServices();
  const newService: Service = {
    ...service,
    id: Date.now().toString(),
  };
  services.push(newService);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  return newService;
}

export function updateService(id: string, updates: Partial<Service>) {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...updates };
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  }
}

export function deleteService(id: string) {
  const services = getServices().filter(s => s.id !== id);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}

export function getSolicitudes(): Solicitud[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SOLICITUDES_KEY);
  return data ? JSON.parse(data) : [];
}

export function addSolicitud(solicitud: Omit<Solicitud, 'id' | 'fecha'>): Solicitud {
  const solicitudes = getSolicitudes();
  const newSolicitud: Solicitud = {
    ...solicitud,
    id: Date.now().toString(),
    fecha: new Date().toISOString(),
  };
  solicitudes.push(newSolicitud);
  localStorage.setItem(SOLICITUDES_KEY, JSON.stringify(solicitudes));
  return newSolicitud;
}

export function updateSolicitud(id: string, updates: Partial<Solicitud>) {
  const solicitudes = getSolicitudes();
  const index = solicitudes.findIndex(s => s.id === id);
  if (index !== -1) {
    solicitudes[index] = { ...solicitudes[index], ...updates };
    localStorage.setItem(SOLICITUDES_KEY, JSON.stringify(solicitudes));
  }
}

export function deleteUser(id: string) {
  const users = getUsers().filter(u => u.id !== id);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function updateUser(id: string, updates: Partial<User>) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}
