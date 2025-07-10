import { useState } from "react";

function TodoSubmitForm({ addTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        addTodo(inputValue);
        setInputValue('');
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="새로운 할 일을 입력하세요" />
            <button>등록</button>
        </form>
    );
}

export default TodoSubmitForm;