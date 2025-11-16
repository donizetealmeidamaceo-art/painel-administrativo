import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (login(username, password)) {
      setLocation('/');
    } else {
      setError('Usuário ou senha incorretos');
      setPassword('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Painel Administrativo</h1>
        <p style={styles.subtitle}>Faça login para continuar</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              style={styles.input}
              autoFocus
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>

        <div style={styles.info}>
          <p style={styles.infoTitle}>Credenciais de demonstração:</p>
          <p style={styles.infoText}>Usuário: <strong>admin</strong></p>
          <p style={styles.infoText}>Senha: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
  } as const,
  loginBox: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  } as const,
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1e2a38',
    marginBottom: '8px',
    textAlign: 'center' as const,
    margin: '0 0 8px 0'
  } as const,
  subtitle: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center' as const,
    marginBottom: '30px',
    margin: '0 0 30px 0'
  } as const,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  } as const,
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  } as const,
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1e2a38'
  } as const,
  input: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box' as const
  } as const,
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#1e2a38',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px'
  } as const,
  error: {
    padding: '12px',
    backgroundColor: '#fee',
    color: '#c33',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center' as const
  } as const,
  info: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    fontSize: '12px'
  } as const,
  infoTitle: {
    margin: '0 0 8px 0',
    color: '#333',
    fontWeight: 600
  } as const,
  infoText: {
    margin: '4px 0',
    color: '#666'
  } as const
};
