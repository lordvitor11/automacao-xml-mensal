import React, { useState, useEffect } from 'react';
import '../css/Select.css';

const Select = ({ HandleInput = null, target = null }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('default'); // Estado para controlar o valor selecionado

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const tabela = 'contabilidades';
        const response = await fetch('http://localhost:5000/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tabela, target }),
        });

        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }

        const data = await response.json();

        if (Array.isArray(data.array) && data.array.length > 0) {
          setOptions(data.array);
        } else {
          setOptions([]); // Mantém vazio para exibir "Sem contabilidades"
        }
      } catch (error) {
        console.error('Erro ao carregar opções:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return (
    <select 
      name='contabilidade' 
      id='contabilidade' 
      value={selected} 
      onChange={(e) => {
        setSelected(e.target.value);
        if (HandleInput) HandleInput(e);
      }}
    >
      <option value="default" disabled hidden>
        {loading ? 'Carregando...' : options.length === 0 ? 'Sem contabilidades' : 'Selecione uma contabilidade'}
      </option>

      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nome}
        </option>
      ))}
    </select>
  );
};

export default Select;
