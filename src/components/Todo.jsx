import { useState } from 'react';

import Button from './Button';
import '../styles/Todo.css';

function Todo({
  tarefas,
  editarTarefa,
  deletarTarefa,
  atualizarSituacaoTarefa,
}) {
  const [idTarefaEdicao, setIdTarefaEdicao] = useState(null);
  const [tituloEditado, setTituloEditado] = useState('');
  const [filtro, setFiltro] = useState(['todas']);

  async function salvarEdicao(id) {
    try {
      await editarTarefa(id, tituloEditado);
      setIdTarefaEdicao(null);
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  }

  async function salvarSituacao(id, situacao) {
    try {
      if (situacao === 'ativa') {
        await atualizarSituacaoTarefa(id, 'concluida');
      } else {
        await atualizarSituacaoTarefa(id, 'ativa');
      }
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  }

  // Função para alternar o filtro
  function toggleFiltro(categoria) {
    if (categoria.toLowerCase() === 'todas') {
      setFiltro(['todas']);
      return;
    }

    // remove todas se estava selecionado
    let novoFiltro = filtro.filter((f) => f !== 'todas');

    if (novoFiltro.includes(categoria.toLowerCase())) {
      // já selecionado → remove
      novoFiltro = novoFiltro.filter((f) => f !== categoria.toLowerCase());
    } else {
      // não selecionado → adiciona
      novoFiltro.push(categoria.toLowerCase());
    }

    // se não sobrar nada → volta pra todas
    if (novoFiltro.length === 0) {
      novoFiltro = ['todas'];
    }
    setFiltro(novoFiltro);
  }
  // Filtra as tarefas com base no filtro selecionado
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro.includes('todas')) return true;
    return filtro.includes(tarefa.categoria.toLowerCase());
  });
  return (
    <div className="containerGeral">
      <div className="filtroContainer">
        <button
          className={`filtrobtn ${filtro.includes('todas') ? 'ativo' : ''}`}
          onClick={() => toggleFiltro('Todas')}
        >
          Todas
        </button>
        <button
          className={`filtrobtn ${filtro.includes('trabalho') ? 'ativo' : ''}`}
          onClick={() => toggleFiltro('Trabalho')}
        >
          Trabalho
        </button>
        <button
          className={`filtrobtn ${filtro.includes('estudos') ? 'ativo' : ''}`}
          onClick={() => toggleFiltro('Estudos')}
        >
          Estudos
        </button>
        <button
          className={`filtrobtn ${filtro.includes('pessoal') ? 'ativo' : ''}`}
          onClick={() => toggleFiltro('Pessoal')}
        >
          Pessoal
        </button>
      </div>

      {tarefasFiltradas.map(({ id, titulo, categoria, situacao }) => {
        if (id === idTarefaEdicao) {
          return (
            <form className="todoTarefa" key={id}>
              <div className="descricao">
                <div className="textos">
                  <input
                    className="inputEdicao"
                    type="text"
                    value={tituloEditado}
                    onChange={(e) => setTituloEditado(e.target.value)}
                  />
                  <p className="categoria">{categoria}</p>
                </div>
                <div className="botoes edicao">
                  <Button
                    className="btn"
                    text="Salvar"
                    onClick={(e) => {
                      e.preventDefault();
                      salvarEdicao(id);
                    }}
                  />
                  <Button
                    className="btn"
                    text="Cancelar"
                    onClick={() => setIdTarefaEdicao(null)}
                  />
                </div>
              </div>
            </form>
          );
        }
        return (
          <div className="todoTarefa" key={id}>
            <div className="descricao">
              <input
                className="checkbox"
                type="checkbox"
                checked={situacao != 'ativa'}
                onClick={() => salvarSituacao(id, situacao)}
              />
              <div className="textos">
                <p
                  className={`titulo ${situacao === 'concluida' ? 'tarefa-concluida' : ''}`}
                >
                  {titulo}
                </p>
                <p className="categoria">{categoria}</p>
              </div>
              <div className="botoes">
                {situacao === 'ativa' && (
                  <Button
                    className="btn"
                    text="Editar"
                    onClick={() => {
                      setIdTarefaEdicao(id);
                      setTituloEditado(titulo);
                    }}
                  />
                )}
                <Button
                  className="btn"
                  text="Deletar"
                  onClick={() => deletarTarefa(id)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
