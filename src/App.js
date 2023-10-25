export default function App() {
  return (
    <div className="App">
      <Header />
      <ToDoList />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Checked</h1>
      <FromNewToDo />
    </header>
  );
}

function FromNewToDo() {
  return (
    <form className="form--new-to-do">
      <input type="text" placeholder="What do you need to do?" />
      <button>➕</button>
    </form>
  );
}

function ToDoList() {
  return (
    <div className="to-do-list">
      <ToDoItem />
      <ToDoItem />
      <ToDoItem />
      <ToDoItem />
      <ToDoItem />
    </div>
  );
}

function ToDoItem() {
  return (
    <div className="to-do-item">
      <div className="to-do-item__main">
        <input type="checkbox" />
        <h3 className="to-do-item__title">Thing to do</h3>
        <div className="icons">📅 📌 🏷️</div>
      </div>
      <ToDoItemForm />
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
