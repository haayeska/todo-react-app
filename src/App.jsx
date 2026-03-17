import { useState, useEffect } from 'react';
import './styles/App.css';

import Form from './components/Form';
import Todo from './components/Todo';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState({
    titulo: '',
    categoria: '',
    situacao: 'ativa',
  });

  // Enviar tarefa
  const adicionarTarefa = (tarefa) => {
    fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarefa),
    })
      .then((res) => res.json())
      .then((tarefaSalva) => {
        setTarefas([...tarefas, tarefaSalva]);
      });
  };

  // deletar tarefa
  const deletarTarefa = (id) => {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const deletar = tarefas.filter((tarefa) => tarefa.id !== id);
      setTarefas(deletar);
    });
  };

  // buscar tarefas
  useEffect(() => {
    async function buscarTarefas() {
      const res = await fetch('http://localhost:3000/tarefas');
      const dados = await res.json();
      setTarefas(dados);
    }
    buscarTarefas();
  }, []);

  const atualizarTarefa = (id, titulo) => {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo }),
    })
      .then((res) => res.json())
      .then((tarefaAtualizada) => {
        const novaLista = tarefas.map((tarefa) => {
          if (tarefa.id === id) {
            return tarefaAtualizada;
          } else {
            return tarefa;
          }
        });
        setTarefas(novaLista);
      });
  };
  const atualizarSituacaoTarefa = (id, situacao) => {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ situacao }),
    })
      .then((res) => res.json())
      .then((tarefaAtualizada) => {
        const novaLista = tarefas.map((tarefa) => {
          if (tarefa.id === id) {
            return tarefaAtualizada;
          } else {
            return tarefa;
          }
        });
        setTarefas(novaLista);
      });
  };

  return (
    <div className="todoApp">
      <Form
        adicionarTarefa={adicionarTarefa}
        tarefa={tarefa}
        setTarefa={setTarefa}
      />
      <Todo
        tarefas={tarefas}
        deletarTarefa={deletarTarefa}
        editarTarefa={atualizarTarefa}
        atualizarSituacaoTarefa={atualizarSituacaoTarefa}
        tarefa={tarefa}
      />
    </div>
  );
}

export default App;
