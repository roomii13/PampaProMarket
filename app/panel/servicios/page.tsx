'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getServices, addSolicitud, User, Service } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, DollarSign, User as UserIcon } from 'lucide-react';

export default function ServiciosPage() {
  const [user, setUser] = useState<User | null>(null);
  const [servicios, setServicios] = useState<Service[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setServicios(getServices().filter(s => s.disponible));
  }, [router]);

  const filteredServicios = servicios.filter(
    s => s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
         s.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
         s.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSolicitar = () => {
    if (!user || !selectedService) return;

    addSolicitud({
      servicioId: selectedService.id,
      servicioNombre: selectedService.nombre,
      contratanteId: user.id,
      contratanteNombre: `${user.nombre} ${user.apellido}`,
      prestadorId: selectedService.prestadorId,
      prestadorNombre: selectedService.prestadorNombre,
      estado: 'pendiente',
      mensaje,
    });

    alert('Solicitud enviada correctamente!');
    setSelectedService(null);
    setMensaje('');
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Servicios Disponibles</h1>
        <p className="text-muted-foreground">Encuentra el servicio que necesitas</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nombre, categoria o descripcion..."
            className="pl-10"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServicios.map((servicio) => (
          <Card key={servicio.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{servicio.categoria}</Badge>
              </div>
              <CardTitle className="mt-2">{servicio.nombre}</CardTitle>
              <CardDescription>{servicio.descripcion}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  {servicio.prestadorNombre}
                </div>
                <div className="flex items-center gap-2 text-lg font-bold text-primary">
                  <DollarSign className="h-5 w-5" />
                  ${servicio.precio.toLocaleString('es-AR')}
                </div>
                {user.rol === 'contratante' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedService(servicio)}>
                        Solicitar servicio
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Solicitar: {servicio.nombre}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Prestador: {servicio.prestadorNombre}</p>
                          <p className="text-sm text-muted-foreground mb-2">Precio: ${servicio.precio.toLocaleString('es-AR')}</p>
                        </div>
                        <Textarea
                          placeholder="Escribe un mensaje para el prestador..."
                          value={mensaje}
                          onChange={(e) => setMensaje(e.target.value)}
                          rows={4}
                        />
                        <Button className="w-full" onClick={handleSolicitar}>
                          Enviar solicitud
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServicios.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron servicios</p>
        </div>
      )}
    </div>
  );
}
