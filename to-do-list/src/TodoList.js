import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { AiOutlineDelete } from 'react-icons/ai';
import { RiPushpin2Line, RiPushpin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

<AiOutlineDelete size={24} color="white" />

function TodoList() {
   
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editInputValue, setEditInputValue] = useState("");
    //const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const [todos, setTodos] = useState([
        {
          id: uuid(),
          text: "Buy milk",
          date: new Date(),
          pinned: false,
          completed: false,
        },
        {
          id: uuid(),
          text: "Walk the dog",
          date: new Date(),
          pinned: true,
          completed: false,
        },
        {
          id: uuid(),
          text: "Do laundry",
          date: new Date(),
          pinned: false,
          completed: true,
        },
      ]);
    
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
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        setInputValue("");
        alert("New task was added!");
    }

    function handleDelete(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
        localStorage.setItem('todos', JSON.stringify(todos.filter((todo) => todo.id !== id)));
        alert("Task was deleted!");
    }



    function handleCompleted(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    function handlePinToTop(id) {
        const pinnedTodo = todos.find((todo) => todo.id === id);
        const nonPinnedTodos = todos.filter((todo) => todo.id !== id);
        if ( pinnedTodo.pinned) {
            pinnedTodo.pinned = false;
            setTodos([...nonPinnedTodos, pinnedTodo]);
            localStorage.setItem('todos', JSON.stringify([...nonPinnedTodos, pinnedTodo]));
        }
        else { 
            pinnedTodo.pinned = true;
            setTodos([pinnedTodo, ...nonPinnedTodos]);
            localStorage.setItem('todos', JSON.stringify([pinnedTodo, ...nonPinnedTodos]));
        }

       
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
        localStorage.setItem('todos', JSON.stringify( todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editInputValue } : todo
      )));
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
        localStorage.setItem('todos', JSON.stringify(todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editValue } : todo
    )));
        setEditingId(null);
        setEditValue("");
    }

    
  function handleCancelEdit() {
    setEditingId(null);
    setEditInputValue("");
  }

    return (
        <div >
            <form onSubmit={handleSubmit} className="createInput mt-5 mb-5 d-flex justify-content-center">
                <span className="align-middle"><input
                    type="text"
                    placeholder="Add new todo"
                    value={inputValue}
                    className="form-control d-inline"
                    onChange={(e) => setInputValue(e.target.value)}
                /></span>
                <button type="submit" className="btn btn-primary ms-4">Create</button>
            </form>
            {todos.map((todo) => (
                <div key={todo.id} className="createInput mt-2 mb-2 d-flex justify-content-center container" >
                     <div  className="col-md-2">
                    
                
                  </div>
        <div  className="col-md-5">
                    <p className="form-check align-middle p-1">
                        <input className="form-check-input" type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleCompleted(todo.id)} />
                        <label className="form-check-label text-light">
                            {todo.completed ? <span style={{ textDecoration: 'line-through' }}>{todo.text }</span> : <span>{todo.text }</span>}
                        </label>
                     
                    </p>
                
                  </div>
                   
                    <div className="col-md-5">
                    <span className="text-light p-2">{todo.date.toLocaleDateString()}</span>
                    <button onClick={() => handlePinToTop(todo.id)} className="btn btn-secondary ms-2">
                    {todo.pinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
                    </button>
                    <button onClick={() => handleEdit(todo.id)} className="btn btn-primary ms-2"><FaEdit /> </button>
                    <button onClick={() => handleDelete(todo.id)} className="btn btn-danger ms-2"><AiOutlineDelete /></button>
                    {editingId === todo.id ? (
                    <form onSubmit={handleEditSubmit} className="createInput mt-2 d-flex justify-content-center">
                        <input
                            type="text"
                            placeholder="Edit todo"
                            value={editInputValue}
                            className="form-control d-inline w-50"
                            onChange={(e) => setEditInputValue(e.target.value)}
                        />
                        <button  onClick={handleSaveEdit} type="submit"  className="btn btn-primary ms-2"><FaSave/></button>
                        <button onClick={handleCancelEdit} className="btn btn-secondary ms-2"><FaTimes /></button>
                    </form>
                ) : (
                    <>
                       
                    </>
                )}
            </div>
            </div>

            ))}
        </div>
    );
}

export default TodoList;
