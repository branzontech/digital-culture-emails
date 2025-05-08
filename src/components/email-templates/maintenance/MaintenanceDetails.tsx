
import React from 'react';

interface MaintenanceDetailsProps {
  maintenanceDate?: string;
  maintenanceDuration?: string;
  affectedSystems?: string;
  formattedDate: () => string;
}

const MaintenanceDetails: React.FC<MaintenanceDetailsProps> = ({ 
  maintenanceDuration = "2 horas", 
  affectedSystems = "Portal de usuarios, Plataforma de aprendizaje, Base de datos principal", 
  formattedDate 
}) => {
  return (
    <div style={{ 
      backgroundColor: '#f0f6ff', 
      borderLeft: '5px solid #6366f1',
      padding: '20px',
      marginBottom: '30px',
      borderRadius: '0 12px 12px 0',
      boxShadow: '0 4px 6px rgba(99, 102, 241, 0.1)'
    }}>
      <h3 style={{ color: '#4f46e5', margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600' }}>Detalles del Mantenimiento</h3>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ minWidth: '24px', marginRight: '10px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{ margin: '0', fontSize: '15px' }}><strong>Fecha:</strong> {formattedDate()}</p>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ minWidth: '24px', marginRight: '10px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{ margin: '0', fontSize: '15px' }}><strong>Duración estimada:</strong> {maintenanceDuration}</p>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div style={{ minWidth: '24px', marginRight: '10px', marginTop: '3px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0002 2L3 10H10.0002V22H14.0002V10H21.0002L14.0002 2H10.0002Z" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{ margin: '0', fontSize: '15px' }}><strong>Sistemas afectados:</strong> {affectedSystems}</p>
      </div>
    </div>
  );
};

export default MaintenanceDetails;
