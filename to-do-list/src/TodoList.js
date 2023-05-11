import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { AiOutlineDelete } from 'react-icons/ai';
import { RiPushpin2Line, RiPushpin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

<AiOutlineDelete size={24} color="white" />

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editInputValue, setEditInputValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            id: uuid(),
            text: inputValue,
            date: new Date(),
            pinned: false,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    }

    function handleDelete(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function handlePin(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, pinned: !todo.pinned } : todo
            )
        );
    }

    function handleCompleted(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }
     
    function handleSaveEdit(e) {
        e.preventDefault();
        setTodos(
          todos.map((todo) =>
            todo.id === editingId ? { ...todo, text: editInputValue } : todo
          )
        );
        setEditingId(null);
        setEditInputValue("");
    }

    function handleEdit(id) {
        setEditingId(id);
        const todo = todos.find((todo) => todo.id === id);
        setEditValue(todo.text);
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        setTodos(
            todos.map((todo) =>
                todo.id === editingId ? { ...todo, text: editValue } : todo
            )
        );
        setEditingId(null);
        setEditValue("");
    }

    
  function handleCancelEdit() {
    setEditingId(null);
    setEditInputValue("");
  }

    return (
        <div >
            <form onSubmit={handleSubmit} class="createInput mt-5 mb-5 d-flex justify-content-center">
                <span class="align-middle"><input
                    type="text"
                    placeholder="Add new todo"
                    value={inputValue}
                    class="form-control d-inline"
                    onChange={(e) => setInputValue(e.target.value)}
                /></span>
                <button type="submit" class="btn btn-primary ms-4">Create</button>
            </form>
            {todos.map((todo) => (
                <div key={todo.id} class="createInput mt-2 mb-2 d-flex justify-content-center">

                    <span class="form-check align-middle p-2">
                        <input class="form-check-input" type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleCompleted(todo.id)} />
                        <label class="form-check-label text-light">
                            {todo.completed ? <span style={{ textDecoration: 'line-through' }}>{todo.text }</span> : <span>{todo.text }</span>}
                        </label>
                    </span>

                    <span class="text-light p-2">{todo.date.toLocaleDateString()}</span>
                    <button onClick={() => handlePin(todo.id)} class="btn btn-secondary ms-2">
                        {todo.pinned ?  <RiPushpin2Fill /> : <RiPushpin2Line />}
                    </button>
                    <button onClick={() => handleEdit(todo.id)} class="btn btn-primary ms-2"><FaEdit /> </button>
                    <button onClick={() => handleDelete(todo.id)} class="btn btn-danger ms-2"><AiOutlineDelete /></button>
                    {editingId === todo.id ? (
                    <form onSubmit={handleEditSubmit} class="createInput d-flex justify-content-center">
                        <input
                            type="text"
                            placeholder="Edit todo"
                            value={editInputValue}
                            class="form-control d-inline w-50"
                            onChange={(e) => setEditInputValue(e.target.value)}
                        />
                        <button  onClick={handleSaveEdit} type="submit"  class="btn btn-primary ms-2"><FaSave/></button>
                        <button onClick={handleCancelEdit} class="btn btn-secondary ms-2"><FaTimes /></button>
                    </form>
                ) : (
                    <>
                       
                    </>
                )}
            </div>

            ))}
        </div>
    );
}

export default TodoList;
