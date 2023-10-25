import { useState } from "react";
import intro from "./intro.svg";

const initialToDos = [
  {
    id: crypto.randomUUID(),
    title: "Buy beer",
    date: new Date().getTime(),
    address: "via dell'orto, 10",
    category: "leisure",
  },
  {
    id: crypto.randomUUID(),
    title: "Rob bank",
    date: new Date().getTime(),
    address: "via dell'orto, 10",
  },
  {
    id: crypto.randomUUID(),
    title: "Paint flower",
    address: "via dell'orto, 10",
  },
  {
    id: crypto.randomUUID(),
    title: "Smash the patriarchy",
    date: new Date().getTime(),
  },
  {
    id: crypto.randomUUID(),
    title: "Hold my beer",
  },
];

export default function App() {
  const [todoList, setTodoList] = useState([...initialToDos]);

  function handleCreateTodo(todo) {
    setTodoList([...todoList, todo]);
  }

  return (
    <div className="App">
      <Header onNewTodo={handleCreateTodo} />
      <ToDoList todoList={todoList} />
      <Footer />
    </div>
  );
}

function Header({ onNewTodo }) {
  return (
    <header className="header">
      <h1>Checked</h1>
      <FormNewToDo onNewTodo={onNewTodo} />
    </header>
  );
}

function FormNewToDo({ onNewTodo }) {
  const [todo, setTodo] = useState("");

  function handleNewTodo(e) {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title: todo,
    };
    onNewTodo(newTodo);
    setTodo("");
  }
  return (
    <form className="form--new-to-do" onSubmit={handleNewTodo}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="What do you need to do?"
      />
      <button>➕</button>
    </form>
  );
}

function ToDoList({ todoList }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="to-do-list">
      {todoList ? (
        todoList.map((todo) => (
          <ToDoItem todo={todo} curOpen={curOpen} onOpen={setCurOpen} />
        ))
      ) : (
        <figure className="intro">
          <img src={intro} alt="Person planning" />
        </figure>
      )}
    </div>
  );
}

function ToDoItem({ todo, curOpen, onOpen }) {
  const isOpen = todo.id === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : todo.id);
  }

  return (
    <div
      className={`to-do-item ${isOpen ? "open" : ""}`}
      onClick={handleToggle}
    >
      <div className="to-do-item__main">
        <input type="checkbox" />
        <h3 className="to-do-item__title">{todo.title}</h3>
        <div className="icons">
          {todo.date && "📅"} {todo.address && "📌"} {todo.category && "🏷️"}
        </div>
        <button className="delete">🗑️</button>
      </div>
      {isOpen && <ToDoItemForm />}
    </div>
  );
}

function ToDoItemForm() {
  return (
    <form className="form--edit-to-do">
      <div className="date">
        <label>📅</label>
        <input type="date" />
        <input type="time" />
      </div>
      <div className="place">
        <label>📌</label>
        <input type="text" />
      </div>
      <div className="category">
        <label>🏷️</label>
        <select>
          <option>Work</option>
          <option>Health</option>
          <option>Family</option>
          <option>Sport</option>
          <option>Finance</option>
          <option>Travel</option>
          <option>Leisure</option>
        </select>
      </div>
      <button>✏️</button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <select>
        <option>All</option>
        <option>Work</option>
        <option>Health</option>
        <option>Family</option>
        <option>Sport</option>
        <option>Finance</option>
        <option>Travel</option>
        <option>Leisure</option>
      </select>
      <p>© Angela Bellò 2023</p>
    </footer>
  );
}
