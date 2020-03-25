import React, { useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [inputs, setInputs] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      title: '',
      description: '',
      value: ''
    }
  );

  const { title, description, value } = inputs;

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      const res = await api.post('incidents', inputs, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({[name]: value});
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
        
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            name="title" 
            placeholder="Título do caso" 
            value={title}
            onChange={handleChange}
          />
          <textarea 
            name="description" 
            placeholder="Descrição" 
            value={description}
            onChange={handleChange}
          />
          <input 
            name="value" 
            placeholder="Valor em reais" 
            value={value}
            onChange={handleChange}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}