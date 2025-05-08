
import React from 'react';

interface MaintenanceRecommendationsProps {
  recommendations: string[];
}

const MaintenanceRecommendations: React.FC<MaintenanceRecommendationsProps> = ({ 
  recommendations = [
    "Guarde y finalice su trabajo antes del inicio del mantenimiento programado",
    "Descargue cualquier informe o documento importante que pueda necesitar durante el período de inactividad",
    "Notifique a su equipo sobre esta ventana de mantenimiento para planificar adecuadamente",
    "Si requiere asistencia urgente durante el mantenimiento, contacte a soporte técnico por los canales alternativos"
  ]
}) => {
  return (
    <div style={{ 
      backgroundColor: '#fef3c7', 
      border: '1px solid #fcd34d',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(252, 211, 77, 0.1)'
    }}>
      <h4 style={{ color: '#92400e', margin: '0 0 15px 0', fontSize: '18px', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16H12.01" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Recomendaciones importantes
      </h4>
      <ul style={{ margin: '0', paddingLeft: '34px', fontSize: '15px', color: '#78350f' }}>
        {recommendations.map((recommendation, index) => (
          <li key={index} style={{ marginBottom: index < recommendations.length - 1 ? '8px' : 0 }}>
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceRecommendations;
