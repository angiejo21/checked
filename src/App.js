import { useState } from "react";
import intro from "./intro.svg";

const initialToDos = [
  {
    id: crypto.randomUUID(),
    title: "Buy beer",
    date: new Date().getTime(),
    address: "via dell'orto, 10",
    category: "leisure",
    checked: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Rob bank",
    date: new Date().getTime(),
    address: "via dell'orto, 10",
    checked: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Paint flower",
    address: "via dell'orto, 10",
    checked: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Smash the patriarchy",
    date: new Date().getTime(),
    checked: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Hold my beer",
    checked: false,
  },
];

export default function App() {
  const [todoList, setTodoList] = useState([...initialToDos]);

  function handleCreateTodo(todo) {
    setTodoList([...todoList, todo]);
  }
  function handleDeleteTodo(todoId) {
    setTodoList((todos) => todos.slice().filter((t) => t.id !== todoId));
  }
  function handleEditTodo(todo) {
    setTodoList((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));
  }
  function handleCheckTodo(todo) {
    setTodoList((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));
  }

  return (
    <div className="App">
      <Header onNewTodo={handleCreateTodo} />
      <ToDoList
        todoList={todoList}
        onDeleteTodo={handleDeleteTodo}
        onEditTodo={handleEditTodo}
        onCheck={handleCheckTodo}
      />
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
      checked: false,
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

function ToDoList({ todoList, onDeleteTodo, onEditTodo, onCheck }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="to-do-list">
      {todoList ? (
        todoList.map((todo) => (
          <ToDoItem
            todo={todo}
            curOpen={curOpen}
            onOpen={setCurOpen}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
            onCheck={onCheck}
          />
        ))
      ) : (
        <figure className="intro">
          <img src={intro} alt="Person planning" />
        </figure>
      )}
    </div>
  );
}

function ToDoItem({
  todo,
  curOpen,
  onOpen,
  onDeleteTodo,
  onEditTodo,
  onCheck,
}) {
  const isOpen = todo.id === curOpen;
  const [checked, setChecked] = useState(false);

  function handleToggle(e) {
    if (e.target.dataset.exit) return;
    onOpen(isOpen ? null : todo.id);
  }
  function handleEdit() {
    onEditTodo(todo);
  }
  function handleCheck() {
    setChecked(!checked);
    todo.checked = !todo.checked;
    onCheck(todo);
  }

  return (
    <div
      className={`to-do-item ${isOpen ? "open" : ""}`}
      onClick={handleToggle}
    >
      <div className="to-do-item__main">
        <input
          type="checkbox"
          data-exit="true"
          onChange={() => handleCheck()}
          checked={checked}
        />
        <h3 className="to-do-item__title">{todo.title}</h3>
        <div className="icons">
          {todo.date && "📅"} {todo.address && "📌"} {todo.category && "🏷️"}
        </div>
        <button className="delete" onClick={() => onDeleteTodo(todo.id)}>
          🗑️
        </button>
      </div>
      {isOpen && <ToDoItemForm />}
    </div>
  );
}

function ToDoItemForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");

  return (
    <form className="form--edit-to-do">
      <div className="date">
        <label>📅</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-exit="true"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          data-exit="true"
        />
      </div>
      <div className="place">
        <label>📌</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          data-exit="true"
        />
      </div>
      <div className="category">
        <label>🏷️</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-exit="true"
        >
          <option></option>
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
