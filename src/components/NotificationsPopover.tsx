
import React from 'react';
import { Bell } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationsPopoverProps {
  onOpenChange: (open: boolean) => void;
  isActive: boolean;
}

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
  }
];

const NotificationsPopover = ({ onOpenChange, isActive }: NotificationsPopoverProps) => {
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
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-white/20 text-white",
            isActive && "bg-white/20"
          )}
        >
          <Bell className="mr-2 h-4 w-4" />
          <span>Notificaciones</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-white shadow-lg rounded-md border border-gray-200" align="center">
        <div className="bg-gray-50 p-3 border-b border-gray-200">
          <h3 className="font-semibold text-lg">Notificaciones</h3>
          <p className="text-sm text-gray-500">Histórico de correos enviados</p>
        </div>
        <ScrollArea className="h-[350px]">
          <div className="p-2">
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className="mb-2 p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm">{notification.recipient}</span>
                  <div className={`${getStatusColor(notification.status)} text-white text-xs px-2 py-1 rounded-full`}>
                    {getStatusText(notification.status)}
                  </div>
                </div>
                <div className="text-gray-700 text-sm mt-1">{notification.subject}</div>
                <div className="text-gray-500 text-xs mt-1">{formatDate(notification.sentAt)}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <button className="w-full text-center text-blue-600 hover:text-blue-800 text-sm">
            Ver todos los correos enviados
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
