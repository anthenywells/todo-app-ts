import React, { useState, Fragment } from "react";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
    console.log(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      complete: !newTodos[index].complete
    };
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    console.log(newTodos);
  };

  const divStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <div className="todo-app container">
      <Fragment>
        <h1 className="center">Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            required
          />
          <button className="btn" type="submit">Add Todo</button>
        </form>
        <section className="todos collection">
          {todos.map((todo: ITodo, index: number) => (
            <div
            className="collection-item"
            key={index}
            style={divStyle}>
              <div
                style={{ textDecoration: todo.complete ? "line-through" : "" }}
              >
                {todo.text}
              </div>
              <div>

              <button className="btn" type="button" onClick={() => completeTodo(index)}>
                {todo.complete ? "Incomplete" : "Complete"}
              </button>
              <button className="btn " onClick={() => removeTodo(index)}>
                <i className="material-icons">delete</i>
              </button>
              </div>
            </div>
          ))}
        </section>
      </Fragment>
    </div>
  );
}

export default App;
