import { useState } from 'react';

import "./App.css";
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';


function App() {
  // Neste momento o useState cria um objeto chamado "todos" e um metodo chamado "setTodos"
  const [todos, setTodos] = useState([
    // Após isso foi criado um array com alguns dados demonstrativos dentro do objeto todos
    {
      id: 1,
      text: "Criar funcionalidade x do sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  // metodo para adicionar a tarefa à lista
  const addTodo = (text, category) => {
    const newTodos = [
      // todos é o array que tem as props de uma tarefa
      ...todos, 
      {
        // Id aleatório
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];

    // Chamo a função que cria a base de uma tarefa para que ela seja preenchida
    setTodos(newTodos);
  };




  // De acordo com o id informado o removeTodo vai pegar todo o array todos e retornar apenas o que for diferente daquele id escolhido 
  const removeTodo = (id) => {
    // Nova lista de todos com apenas os todos diferentes do id informado
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) => 
      todo.id !== id ? todo : null
    );
    // Criação do novo todos de fato
    setTodos(filteredTodos);
  }


  // De acordo com o id informado
  const completeTodo = (id) => {
    const newTodos = [...todos]
    // Se o id informado igual ao id que estou conferindo no for...
    // se verdadeiro ele inverte o isCompleted
    // se falso retorna sem inverter.
    newTodos.map((todo) => 
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  }

  // fazer função para se não houver nenhum todo: exbir frase de "Nehuma atividade cadastrada"


  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      
      <Search search={search} setSearch={setSearch}/>

      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className="todo-list">
        {/* Aqui onde o todos.map é utilizado estou utilizando um comando que percorre/mapeia o objeto todos */}
        {/* e para cada um deles é dada a seguinte estrutura */}
        {/* 1 Nesse filter ele filtra a partir do texto de todos os todos conferindo se o título do todo pertence o que está escrito na barra de pesquisa */}
        {/* 2 filtra todos, se verdadeiro não faz nada, se falso, verifica se estão completos e retorna os completos e verdadeiro e os incompletos se falso */}
        {/* 3 ascendente ou descendente */}
        {todos
        .filter((todo) => 
          filter === "All" 
            ? true 
            : filter === "Completed"
              ? todo.isCompleted
              : !todo.isCompleted  
        )
        .filter((todo) => 
          todo.text.toLowerCase().includes(search.toLocaleLowerCase())
        )
        .sort((a, b) => 
          sort === "Asc" 
            ? a.text.localeCompare(b.text) 
            : b.text.localeCompare(a.text)
        )
        .map((todo) => (
          // Aqui a tag Todo tem como atributo "todo" e está enviando as propriedades "todo", isto envia o objeto Todo criando anteriormente
          <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
        ))}
      </div>

      <TodoForm addTodo={addTodo}/>
    </div>
  )
}

export default App
