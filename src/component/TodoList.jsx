function TodoList({ todos, removeTodo, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}></input>
          {todo.value}
          <button onClick={() => removeTodo(todo.id)}> X </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;