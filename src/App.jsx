import TodoSubmitForm from "./component/TodoSubmitForm";
import TodoList from "./component/TodoList";
import useTodoManager from "./hooks/useTodoManager";

function App() {
  const initialState = [
    {
      id: 1,
      value: '할일 1',
      completed: true
    },
    {
      id: 2,
      value: '할일 2',
      completed: false
    },
    {
      id: 3,
      value: '할일 3',
      completed: false
    }
  ]

  const { todos, removeTodo, toggleTodo, addTodo } = useTodoManager('todos', initialState);

  return (
    <>
      <TodoSubmitForm addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;