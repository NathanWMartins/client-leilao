import React, { useState } from 'react';

interface LoginResponse {
  chaveSimetrica?: string;
  message: string;
}

const telaLogin: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState<string>('');
  const [assinatura, setAssinatura] = useState<string>('');
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [chaveSimetrica, setChaveSimetrica] = useState<string | null>(null);

  const handleLogin = async () => {
    setMensagemErro('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/entrar-leilao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: nomeUsuario,
          assinatura,
        }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        // Caso o login seja bem-sucedido
        setChaveSimetrica(data.chaveSimetrica || '');
        // Aqui você pode redirecionar para a página de leilão
        alert('Login bem-sucedido!');
      } else {
        setMensagemErro(data.message || 'Erro ao tentar entrar no leilão');
      }
    } catch (error) {
      setMensagemErro('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Entrar no Leilão</h2>
      <div className="form-group">
        <label htmlFor="nomeUsuario">Nome de Usuário</label>
        <input
          type="text"
          id="nomeUsuario"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          placeholder="Digite seu nome de usuário"
        />
      </div>

      <div className="form-group">
        <label htmlFor="assinatura">Assinatura Digital (Opcional)</label>
        <input
          type="text"
          id="assinatura"
          value={assinatura}
          onChange={(e) => setAssinatura(e.target.value)}
          placeholder="Digite sua assinatura digital"
        />
      </div>

      {mensagemErro && <p className="error-message">{mensagemErro}</p>}

      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Carregando...' : 'Entrar'}
      </button>

      {chaveSimetrica && <p>Chave Simétrica: {chaveSimetrica}</p>}
    </div>
  );
};

export default telaLogin;
