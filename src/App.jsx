import {useState} from "react";
import './App.css';

function App() {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')

    const addTodo = () => {
        if (text.trim().length)
            setTodos([
                ...todos,
                {
                    id: new Date().toISOString(),
                    text: text,
                    completed: false,
                }
            ])
        setText('')
    }

    const removeTodo = (todoId) => {
        let updateTodos = todos.filter(todo => todo.id !== todoId)
        setTodos(updateTodos)
    }

    const toggleTodo = (todoId) => {
        setTodos(
            todos.map(todo => {
                if(todo.id !== todoId) return todo

                return {
                    ...todo,
                    completed: !todo.completed,
                }
            })
        )
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo()
        }
    }

    const handleChangeInput = (e) => {
        setText(e.target.value)
    }

    return (
        <div className="App">
            <label htmlFor="">
                <input type="text" value={text} onChange={handleChangeInput} onKeyPress={handleKeyPress}/>
                <button onClick={addTodo}>Add todo</button>
            </label>

            <ul>
                {todos && (
                    todos.map(todo =>
                        <li key={todo.id}>
                            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}/>
                            <span>{todo.text}</span>
                            <span className='delete' onClick={() => removeTodo(todo.id)}>&times;</span>
                        </li>)
                )}
                {!todos.length && (<div className='empty'>Список дел пуст !</div>)}
            </ul>
        </div>
    );
}

export default App;
