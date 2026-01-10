import React from 'react';
import { Bell, X } from 'lucide-react';

const NotificationPanel = ({ notifications, enabled, onToggle, onRemove, theme }) => {
  return (
    <>
      {/* Bouton toggle */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '0.8rem',
          background: enabled 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: theme.boxShadow,
          transition: 'all 0.3s ease'
        }}
        title={enabled ? 'Notifications activées' : 'Notifications désactivées'}
      >
        <Bell size={20} />
      </button>

      {/* Liste des notifications */}
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        width: '350px',
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {notifications.map(notif => (
          <div
            key={notif.id}
            style={{
              background: notif.type === 'error' 
                ? 'linear-gradient(135deg, #ff4757 0%, #ff6348 100%)'
                : notif.type === 'warning'
                ? 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)'
                : notif.type === 'success'
                ? 'linear-gradient(135deg, #2ed573 0%, #1abc9c 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '1rem',
              borderRadius: '12px',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              animation: 'slideInRight 0.3s ease-out',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}
          >
            <div style={{ flex: 1 }}>
              {notif.taskName && (
                <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>
                  {notif.taskName}
                </div>
              )}
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {notif.message}
              </div>
            </div>
            <button
              onClick={() => onRemove(notif.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default NotificationPanel;