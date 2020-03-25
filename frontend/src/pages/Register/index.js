import React, { useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [inputs, setInputs] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      name: '',
      email: '',
      whatsapp: '',
      city: '',
      uf: ''
    }
  );

  const { name, email, whatsapp, city, uf } = inputs;

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await api.post('ongs', inputs);

      alert(`Seu ID de acesso: ${res.data.id}`);
      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({[name]: value});
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
        
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            name="name" 
            placeholder="Nome da ONG" 
            value={name}
            onChange={handleChange}
          />
          <input 
            name="email" 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={handleChange}
          />
          <input 
            name="whatsapp" 
            placeholder="WhatsApp" 
            value={whatsapp}
            onChange={handleChange}
          />
          <div className="input-group">
            <input 
              name="city" 
              placeholder="Cidade" 
              value={city}
              onChange={handleChange}
            />
            <input 
              name="uf" 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={handleChange}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}