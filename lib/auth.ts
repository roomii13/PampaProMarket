export type UserRole = 'admin' | 'prestador' | 'contratante';

export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  telefono?: string;
  createdAt: string;
  ubicacion?: string;
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
  imagenes?: string[];
}

export interface TrabajoRealizado {
  id: string;
  servicioId: string;
  prestadorId: string;
  imagenUrl: string;
  descripcion: string;
  fecha: string;
}

export interface MensajeChat {
  id: string;
  solicitudId: string;
  remitenteId: string;
  destinatarioId: string;
  contenido: string;
  fecha: string;
  leido: boolean;
}

export interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioTipo: 'hora' | 'dia' | 'proyecto' | 'unidad'; 
  categoria: string;
  prestadorId: string;
  prestadorNombre: string;
  imagenes: string[]; // Array de URLs de imágenes
  disponibilidad: {
    lunes: { inicio: string, fin: string }[];
    martes: { inicio: string, fin: string }[];
    miercoles: { inicio: string, fin: string }[];
    jueves: { inicio: string, fin: string }[];
    viernes: { inicio: string, fin: string }[];
    sabado: { inicio: string, fin: string }[];
  };
  ubicacion?: string;
  calificacion: number;
  reseñas: number;
  disponible: boolean;
  createdAt: string;
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
    precioTipo: 'proyecto', // o 'hora', 'dia', 'unidad'
    categoria: 'Limpieza',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1574781330858-1d8eb6d71e8c?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '08:00', fin: '18:00' }],
      martes: [{ inicio: '08:00', fin: '18:00' }],
      miercoles: [{ inicio: '08:00', fin: '18:00' }],
      jueves: [{ inicio: '08:00', fin: '18:00' }],
      viernes: [{ inicio: '08:00', fin: '18:00' }],
      sabado: [{ inicio: '09:00', fin: '14:00' }]
    },
    ubicacion: 'Buenos Aires, Argentina',
    calificacion: 4.8,
    reseñas: 24,
    disponible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    nombre: 'Plomería General',
    descripcion: 'Reparación de cañerías, instalación de grifos, destape de desagües y todo tipo de trabajos de plomería.',
    precio: 25000,
    precioTipo: 'proyecto',
    categoria: 'Plomería',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1621967299229-c6e7085b9d04?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '09:00', fin: '17:00' }],
      martes: [{ inicio: '09:00', fin: '17:00' }],
      miercoles: [{ inicio: '09:00', fin: '17:00' }],
      jueves: [{ inicio: '09:00', fin: '17:00' }],
      viernes: [{ inicio: '09:00', fin: '17:00' }],
      sabado: [{ inicio: '10:00', fin: '13:00' }]
    },
    ubicacion: 'Córdoba, Argentina',
    calificacion: 4.9,
    reseñas: 18,
    disponible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    nombre: 'Electricidad Residencial',
    descripcion: 'Instalaciones eléctricas, reparación de cortocircuitos, cambio de tomacorrientes y llaves de luz.',
    precio: 20000,
    precioTipo: 'proyecto',
    categoria: 'Electricidad',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '08:30', fin: '17:30' }],
      martes: [{ inicio: '08:30', fin: '17:30' }],
      miercoles: [{ inicio: '08:30', fin: '17:30' }],
      jueves: [{ inicio: '08:30', fin: '17:30' }],
      viernes: [{ inicio: '08:30', fin: '17:30' }],
      sabado: []
    },
    ubicacion: 'Mendoza, Argentina',
    calificacion: 4.7,
    reseñas: 32,
    disponible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    nombre: 'Jardinería y Paisajismo',
    descripcion: 'Diseño y mantenimiento de jardines, poda de árboles, instalación de riego automático y césped.',
    precio: 18000,
    precioTipo: 'dia',
    categoria: 'Jardinería',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '07:00', fin: '16:00' }],
      martes: [{ inicio: '07:00', fin: '16:00' }],
      miercoles: [{ inicio: '07:00', fin: '16:00' }],
      jueves: [{ inicio: '07:00', fin: '16:00' }],
      viernes: [{ inicio: '07:00', fin: '16:00' }],
      sabado: [{ inicio: '08:00', fin: '12:00' }]
    },
    ubicacion: 'Rosario, Argentina',
    calificacion: 4.6,
    reseñas: 15,
    disponible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    nombre: 'Carpintería a Medida',
    descripcion: 'Fabricación de muebles personalizados, reparación de muebles antiguos, trabajos en madera de calidad.',
    precio: 30000,
    precioTipo: 'proyecto',
    categoria: 'Carpintería',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1601762603339-fd61e28a6989?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '09:00', fin: '18:00' }],
      martes: [{ inicio: '09:00', fin: '18:00' }],
      miercoles: [{ inicio: '09:00', fin: '18:00' }],
      jueves: [{ inicio: '09:00', fin: '18:00' }],
      viernes: [{ inicio: '09:00', fin: '18:00' }],
      sabado: []
    },
    ubicacion: 'La Plata, Argentina',
    calificacion: 4.9,
    reseñas: 27,
    disponible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    nombre: 'Clases de Guitarra',
    descripcion: 'Clases personalizadas de guitarra para todos los niveles. Método práctico y resultados garantizados.',
    precio: 1500,
    precioTipo: 'hora',
    categoria: 'Música',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '16:00', fin: '20:00' }],
      martes: [{ inicio: '16:00', fin: '20:00' }],
      miercoles: [{ inicio: '16:00', fin: '20:00' }],
      jueves: [{ inicio: '16:00', fin: '20:00' }],
      viernes: [{ inicio: '16:00', fin: '20:00' }],
      sabado: [{ inicio: '10:00', fin: '14:00' }]
    },
    ubicacion: 'Online',
    calificacion: 4.8,
    reseñas: 42,
    disponible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    nombre: 'Transporte de Mercadería',
    descripcion: 'Servicio de mudanzas y transporte de mercadería. Camionetas disponibles para todo tipo de envíos.',
    precio: 12000,
    precioTipo: 'dia',
    categoria: 'Transporte',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '07:00', fin: '19:00' }],
      martes: [{ inicio: '07:00', fin: '19:00' }],
      miercoles: [{ inicio: '07:00', fin: '19:00' }],
      jueves: [{ inicio: '07:00', fin: '19:00' }],
      viernes: [{ inicio: '07:00', fin: '19:00' }],
      sabado: [{ inicio: '08:00', fin: '15:00' }]
      
    },
    ubicacion: 'Tucumán, Argentina',
    calificacion: 4.5,
    reseñas: 38,
    disponible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    nombre: 'Diseño Gráfico Profesional',
    descripcion: 'Creación de logos, branding, folletos y material gráfico para empresas y emprendedores.',
    precio: 8000,
    precioTipo: 'proyecto',
    categoria: 'Diseño',
    prestadorId: '2',
    prestadorNombre: 'María González',
    imagenes: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w-800'
    ],
    disponibilidad: {
      lunes: [{ inicio: '10:00', fin: '19:00' }],
      martes: [{ inicio: '10:00', fin: '19:00' }],
      miercoles: [{ inicio: '10:00', fin: '19:00' }],
      jueves: [{ inicio: '10:00', fin: '19:00' }],
      viernes: [{ inicio: '10:00', fin: '19:00' }],
      sabado: []
      
    },
    ubicacion: 'Online',
    calificacion: 4.9,
    reseñas: 56,
    disponible: true,
    createdAt: new Date().toISOString(),
  }
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
