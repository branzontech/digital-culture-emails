
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

// Datos de ejemplo para notificaciones
const mockNotifications = [
  {
    id: 1,
    recipient: 'juan.perez@ejemplo.com',
    subject: 'Bienvenido al programa',
    sentAt: '2025-05-01T10:30:00',
    status: 'delivered'
  },
  {
    id: 2,
    recipient: 'maria.lopez@ejemplo.com',
    subject: 'Recordatorio de evento',
    sentAt: '2025-04-29T14:15:00',
    status: 'opened'
  },
  {
    id: 3,
    recipient: 'carlos.rodriguez@ejemplo.com',
    subject: 'Actualización de plataforma',
    sentAt: '2025-04-28T09:45:00',
    status: 'failed'
  },
  {
    id: 4,
    recipient: 'ana.garcia@ejemplo.com',
    subject: 'Confirmación de inscripción',
    sentAt: '2025-04-27T16:20:00',
    status: 'delivered'
  },
  {
    id: 5,
    recipient: 'pedro.martinez@ejemplo.com',
    subject: 'Invitación a webinar',
    sentAt: '2025-04-26T11:00:00',
    status: 'opened'
  },
  {
    id: 6,
    recipient: 'laura.sanchez@ejemplo.com',
    subject: 'Actualización de perfil',
    sentAt: '2025-04-25T14:30:00',
    status: 'failed'
  },
];

const Notifications = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'opened': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Entregado';
      case 'opened': return 'Abierto';
      case 'failed': return 'Fallido';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />
      
      <main className="py-8 container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
            <p className="text-gray-600">Histórico de correos enviados</p>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <div className="flex space-x-2">
                <Button variant="outline">Todos</Button>
                <Button variant="outline">Entregados</Button>
                <Button variant="outline">Abiertos</Button>
                <Button variant="outline">Fallidos</Button>
              </div>
              <Button>Exportar</Button>
            </div>
            
            <ScrollArea className="h-[600px]">
              <div className="grid gap-3">
                {mockNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="p-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{notification.recipient}</span>
                      <div className={`${getStatusColor(notification.status)} text-white text-xs px-2 py-1 rounded-full`}>
                        {getStatusText(notification.status)}
                      </div>
                    </div>
                    <div className="text-gray-700 mt-1">{notification.subject}</div>
                    <div className="text-gray-500 text-sm mt-1">{formatDate(notification.sentAt)}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Notifications;
