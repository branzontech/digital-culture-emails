
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const MaintenanceFooter: React.FC = () => {
  return (
    <div style={{ 
      borderTop: '1px solid #e5e7eb', 
      padding: '30px 20px', 
      backgroundColor: '#f9fafb',
      borderRadius: '0 0 16px 16px',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '14px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
      }}>
        <div style={{ marginRight: '20px' }}>
          <Avatar className="h-20 w-20 border-2 border-purple-100">
            <AvatarImage src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01b5f8bd5be0001b1222c/0x0.png" alt="Soporte Técnico" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: '700', fontSize: '16px', color: '#4b5563' }}>Equipo de Soporte Técnico</p>
          <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Estamos aquí para ayudarte</p>
          <p style={{ margin: '0', fontSize: '14px' }}>soporte@culturadigital.com</p>
        </div>
      </div>
      <p style={{ margin: '20px 0 10px 0', fontWeight: '500' }}>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
      <p style={{ margin: '0 0 0 0', fontSize: '13px', opacity: '0.8' }}>Este es un mensaje automático, por favor no responda a este correo electrónico</p>
    </div>
  );
};

export default MaintenanceFooter;
