import { useRef, useEffect } from "react"
import useLocalStorage from "../utils/storage";

/**
 * todos : Todo배열
 * addTodo : todo추가
 * removeTodo : Todo제거
 * toggleTodo : Todo.completed 토글처리
 **/
function useTodoManager(storageKey, defaultTodos) {
    const idRecorder = useRef(findMaxId(defaultTodos) + 1);
    const [todos, setTodos] = useLocalStorage(storageKey, defaultTodos);

    useEffect(() => {
        idRecorder.current = findMaxId(todos) + 1; // idRecorder.current++;와의 비교
    }, [todos]);

    const addTodo = (value) => {
        const newTodos = [createTodo(idRecorder.current++, value), ...todos];
        setTodos(newTodos);
    }

    const removeTodo = (id) => {
        const filtered = todos.filter(todo => todo.id !== id);
        setTodos(filtered);
    }

    const toggleTodo = (id) => {
        const updated = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updated);
    }

    return { todos, addTodo, removeTodo, toggleTodo };
}

function findMaxId(input) {
    const inputIds = input.map(item => item.id);
    return Math.max(...inputIds);
}

function createTodo(id, value, completed = false) {
    return {id, value, completed};
}

export default useTodoManager;