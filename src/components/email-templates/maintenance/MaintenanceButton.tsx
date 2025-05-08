
import React from 'react';

interface MaintenanceButtonProps {
  buttonText: string;
  buttonUrl: string;
}

const MaintenanceButton: React.FC<MaintenanceButtonProps> = ({ buttonText, buttonUrl }) => {
  return (
    <div style={{ textAlign: 'center', margin: '35px 0' }}>
      <a 
        href={buttonUrl}
        style={{
          backgroundColor: '#6366f1',
          color: 'white',
          padding: '14px 30px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: '600',
          display: 'inline-block',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
      >
        {buttonText}
      </a>
    </div>
  );
};

export default MaintenanceButton;
