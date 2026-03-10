import Button from './Button';
import { useState } from 'react';
import '../styles/Todo.css';

function Todo({
  tarefas,
  editarTarefa,
  deletarTarefa,
  atualizarSituacaoTarefa,
}) {
  const [idTarefaEdicao, setIdTarefaEdicao] = useState(null);
  const [tituloEditado, setTituloEditado] = useState('');

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

  return (
    <div className="containerGeral">
      {tarefas.map(({ id, titulo, categoria, situacao }) => {
        if (id === idTarefaEdicao) {
          return (
            <form className="todoTarefa" key={id}>
              <div className="descricao">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={situacao != 'ativa'}
                  onClick={() => salvarSituacao(id, situacao)}
                />
                <div className="textos">
                  <input
                    className="inputEdicao"
                    type="text"
                    value={tituloEditado}
                    onChange={(e) => setTituloEditado(e.target.value)}
                  />
                  <p className="categoria">{categoria}</p>
                </div>
                <div className="botoes">
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
              <input className="checkbox" type="checkbox" />
              <div className="textos">
                <p className="titulo">{titulo}</p>
                <p className="categoria">{categoria}</p>
              </div>
              <div className="botoes">
                <Button
                  className="btn"
                  text="Editar"
                  onClick={() => {
                    setIdTarefaEdicao(id);
                    setTituloEditado(titulo);
                  }}
                />
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
