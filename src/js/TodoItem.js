import React, { useState, useRef } from 'react';
import '../css/todos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function TodoItem({ updateTodo, deleteTodo, todo }) {
  const [classItem, setClassItem] = useState('');
  const [title, setTitle] = useState(todo.title);
  const titleRef = useRef(null);

  const updateTodoComplete = async () => {
    await updateTodo(todo, { complete: !todo.complete });
  };

  const editItem = () => {
    setClassItem(' edit');
    titleRef.current.focus();
    titleRef.current.setSelectionRange(0, title.length);
  };

  const updateTodoTitle = async () => {
    await updateTodo(todo, { title: title });
    setClassItem('');
  };

  const deleteItem = () => {
    deleteTodo(todo);
  };

  const itemKeyPress = (e) => {
    if (e.keyCode === 13) {
      updateTodoTitle();
    }
  };

  return (
    <li className="todos-item">
      <div className="todos-content">
        <input
          className="todos-checkbox"
          type="checkbox"
          checked={todo.complete}
          onChange={updateTodoComplete}
        />
        <span className={'title-item' + classItem}>
          <span className="todos-text">{todo.title}</span>
          <input
            type="text"
            value={title}
            style={{ width: '100%' }}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
            onBlur={updateTodoTitle}
            onKeyUp={itemKeyPress}
          />
        </span>
      </div>
      <FontAwesomeIcon icon={faTrash} className="todos-delete-icon" onClick={deleteItem} />
    </li>
  );
  
  }  

export default TodoItem;

