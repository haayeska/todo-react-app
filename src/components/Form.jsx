import { useState } from 'react';

import Button from './Button';
import '../styles/Form.css';

function Form({ adicionarTarefa }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');

  function criarTarefa(e) {
    e.preventDefault();

    const tarefa = {
      titulo: titulo,
      categoria: categoria,
      situacao: 'ativa',
    };

    adicionarTarefa(tarefa);
    setTitulo('');
    setCategoria('');
  }

  return (
    <div className="todo-form">
      <form className="formulario" onSubmit={criarTarefa}>
        <input
          required
          type="text"
          className="inputEnviar"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <select
          className="selecao"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option>Selecionar categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Estudos">Estudos</option>
          <option value="Pessoal">Pessoal</option>
        </select>

        <Button className="btn-enviar" text="Enviar" />
      </form>
    </div>
  );
}

export default Form;
