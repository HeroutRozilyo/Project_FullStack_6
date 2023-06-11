import React, { useState, useEffect } from 'react';
import '../css/todos.css';
import TodoItem from './TodoItem';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('serial');
  const [filter, setFilter] = useState('all');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;

  async function fetchTodos() {
    let todosData;

    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/todos`);
      todosData = await response.json();
      setTodos(todosData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchTodos();
  }, []);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const updateTodo = async (todo, body) => {
    try {
      const response = await fetch(`http://localhost:3001/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo = await response.json();
      fetchTodos();
      
    } catch (error) {
      setError(error);
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOrder === 'serial') {
      return a.id - b.id;
    } else if (sortOrder === 'execution') {
      return a.complete - b.complete;
    } else if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'random') {
      return Math.random() - 0.5;
    }
  });

  let filteredTodos = sortedTodos;

  if (filter === 'completed') {
    filteredTodos = sortedTodos.filter((todo) => todo.complete);
  } else if (filter === 'incomplete') {
    filteredTodos = sortedTodos.filter((todo) => !todo.complete);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="todos-page">
      <div className="todos-toolbar">
        <div className="todos-filter">
          <button className="todos-filter-button" onClick={() => setShowFilterOptions(!showFilterOptions)}>
            <i className="fas fa-filter"></i>
            Filter
          </button>
          {showFilterOptions && (
            <div className="todos-filter-options">
              <label>
                <input
                  type="radio"
                  name="filter"
                  value="all"
                  checked={filter === 'all'}
                  onChange={handleFilterChange}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="filter"
                  value="completed"
                  checked={filter === 'completed'}
                  onChange={handleFilterChange}
                />
                Completed
              </label>
              <label>
                <input
                  type="radio"
                  name="filter"
                  value="incomplete"
                  checked={filter === 'incomplete'}
                  onChange={handleFilterChange}
                />
                Incomplete
              </label>
            </div>
          )}
        </div>
        <div className="todos-sort">
          <label className="todos-label" htmlFor="sort-order-select">
            Sort by:
          </label>
          <select className="todos-select" id="sort-order-select" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="serial">Serial</option>
            <option value="execution">Execution</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>
      <ul className="todos-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
          // <li className={"todos-item" + classItem.find(ci => ci.id === todo.id).className} key={todo.id} 
          //     onClick={(e) => editItem(e.target)}
          //     onBlur={() => updateTodoTitle(todo)}
          //     onKeyUp={(e) => itemKeyPress(e, todo)}>
          //   <input
          //     className="todos-checkbox"
          //     type="checkbox"
          //     checked={todo.complete}
          //     onChange={() => updateTodo(todo)}
          //   />
          //   <span className="todos-text">{todo.title}</span>
          //   <input type="text" value={todo.title} onChange={(e) => updateItem(todo, e.target.value)} />
          // </li>
        ))}
      </ul>
    </div>
  );
        }  
export default Todos;
