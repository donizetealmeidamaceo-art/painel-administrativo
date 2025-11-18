import { useState } from 'react';
import { useLocation } from 'wouter';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  profissao: string;
  dataNascimento: string;
}

export default function CadastroPessoa() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    profissao: '',
    dataNascimento: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório';
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório';
    if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatório';
    if (!formData.estado.trim()) newErrors.estado = 'Estado é obrigatório';
    if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simular salvamento de dados
      console.log('Dados do cadastro:', formData);
      
      // Aqui será integrado com Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Pessoa cadastrada com sucesso!');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        profissao: '',
        dataNascimento: ''
      });

      setTimeout(() => {
        setLocation('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => setLocation('/')} style={styles.backButton}>
          ← Voltar
        </button>
        <h1 style={styles.title}>Cadastrar Pessoa</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Dados Pessoais</h2>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Nome Completo *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite o nome completo"
              style={{...styles.input, borderColor: errors.nome ? '#dc3545' : '#ddd'}}
            />
            {errors.nome && <span style={styles.error}>{errors.nome}</span>}
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@exemplo.com"
                style={{...styles.input, borderColor: errors.email ? '#dc3545' : '#ddd'}}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Telefone *</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                style={{...styles.input, borderColor: errors.telefone ? '#dc3545' : '#ddd'}}
              />
              {errors.telefone && <span style={styles.error}>{errors.telefone}</span>}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>CPF *</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                style={{...styles.input, borderColor: errors.cpf ? '#dc3545' : '#ddd'}}
              />
              {errors.cpf && <span style={styles.error}>{errors.cpf}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Profissão</label>
            <input
              type="text"
              name="profissao"
              value={formData.profissao}
              onChange={handleChange}
              placeholder="Digite a profissão"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Endereço</h2>

          <div style={styles.formGroup}>
            <label style={styles.label}>Endereço *</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Rua, número"
              style={{...styles.input, borderColor: errors.endereco ? '#dc3545' : '#ddd'}}
            />
            {errors.endereco && <span style={styles.error}>{errors.endereco}</span>}
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Bairro *</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Digite o bairro"
                style={{...styles.input, borderColor: errors.bairro ? '#dc3545' : '#ddd'}}
              />
              {errors.bairro && <span style={styles.error}>{errors.bairro}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Cidade *</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Digite a cidade"
                style={{...styles.input, borderColor: errors.cidade ? '#dc3545' : '#ddd'}}
              />
              {errors.cidade && <span style={styles.error}>{errors.cidade}</span>}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Estado *</label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                placeholder="SP, RJ, MG..."
                style={{...styles.input, borderColor: errors.estado ? '#dc3545' : '#ddd'}}
              />
              {errors.estado && <span style={styles.error}>{errors.estado}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>CEP *</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
                style={{...styles.input, borderColor: errors.cep ? '#dc3545' : '#ddd'}}
              />
              {errors.cep && <span style={styles.error}>{errors.cep}</span>}
            </div>
          </div>
        </div>

        {successMessage && (
          <div style={styles.successMessage}>{successMessage}</div>
        )}

        <div style={styles.buttonGroup}>
          <button type="button" onClick={() => setLocation('/')} style={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" disabled={isLoading} style={styles.submitButton}>
            {isLoading ? 'Salvando...' : 'Salvar Cadastro'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  } as const,
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px'
  } as const,
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#1e2a38',
    fontWeight: 600
  } as const,
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1e2a38',
    margin: 0
  } as const,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px'
  } as const,
  section: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  } as const,
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1e2a38',
    marginTop: 0,
    marginBottom: '20px',
    borderBottom: '2px solid #1e2a38',
    paddingBottom: '10px'
  } as const,
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginBottom: '20px'
  } as const,
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
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
  error: {
    fontSize: '12px',
    color: '#dc3545',
    fontWeight: 500
  } as const,
  successMessage: {
    padding: '15px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center' as const
  } as const,
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end'
  } as const,
  submitButton: {
    padding: '12px 30px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#1e2a38',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  } as const,
  cancelButton: {
    padding: '12px 30px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#1e2a38',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  } as const
};
