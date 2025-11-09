import { useState, useEffect } from 'react';

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
      setSidebarCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  const handleCardClick = (text: string) => {
    console.log('Clicado em: ' + text);
  };

  return (
    <div style={styles.container}>
      <aside style={{
        ...styles.sidebar,
        width: sidebarCollapsed ? '70px' : '220px'
      }} id="sidebar">
        <nav style={styles.sidebarNav}>
          {[
            { icon: '🏠', label: 'Início' },
            { icon: '🔍', label: 'Buscar' },
            { icon: '📋', label: 'Cadastros' },
            { icon: '📁', label: 'Arquivos' },
            { icon: '👥', label: 'Usuários' },
            { icon: '⚙️', label: 'Configurações' }
          ].map((item, index) => (
            <div key={index} style={{
              ...styles.navItem,
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
            }}>
              <span style={styles.navIcon}>{item.icon}</span>
              {!sidebarCollapsed && <span style={styles.navLabel}>{item.label}</span>}
            </div>
          ))}
        </nav>
        <button
          style={{
            ...styles.toggleBtn,
            transform: sidebarCollapsed ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'
          }}
          onClick={toggleSidebar}
          id="toggleBtn"
        >
          ‹
        </button>
      </aside>

      <main style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Painel de Controle</h1>
        
        <div style={styles.cardsContainer}>
          {[
            'Cadastrar Pessoa',
            'Buscar Cadastro',
            'Usuários',
            'Relatórios',
            'Configurações'
          ].map((text, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => handleCardClick(text)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={styles.cardText}>{text}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflow: 'hidden' as const,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
  },
  sidebar: {
    height: '100%',
    backgroundColor: '#1e2a38',
    padding: '20px 0',
    transition: 'width 0.3s ease',
    position: 'relative' as const,
    overflow: 'hidden' as const
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    whiteSpace: 'nowrap' as const
  },
  navIcon: {
    fontSize: '24px',
    minWidth: '24px',
    textAlign: 'center' as const
  },
  navLabel: {
    fontSize: '14px',
    transition: 'opacity 0.3s ease'
  },
  toggleBtn: {
    position: 'absolute' as const,
    right: '-15px',
    top: '50%',
    width: '30px',
    height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '0 8px 8px 0',
    transition: 'background-color 0.3s ease, right 0.3s ease, transform 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '40px 20px',
    overflowY: 'auto' as const,
    backgroundColor: '#f5f5f5',
    transition: 'margin-left 0.3s ease'
  },
  pageTitle: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#1e2a38',
    marginBottom: '50px',
    textAlign: 'center' as const
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '600px'
  },
  card: {
    width: '90%',
    height: '80px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
  },
  cardText: {
    fontSize: '20px',
    color: '#1e2a38',
    fontWeight: 500,
    textAlign: 'center' as const
  }
};
