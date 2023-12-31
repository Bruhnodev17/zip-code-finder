import { FiSearch } from 'react-icons/fi';
import "./styles.css";
import { useState } from 'react';
import api from './services/api';

function App() {
  const [input, setInput] = useState();
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Digite o CEP abaixo!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);

      if (response.data.cep) {
        setCep(response.data);
        setInput("");
      } else {
        alert("CEP não encontrado! Por favor, digite um CEP válido!");
      }

      setInput("");
    } catch {
      alert("Erro ao buscar o CEP. por favor, digite novamente.");
      setInput("");
    }
  }

  return (
    <div className='container'>
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
