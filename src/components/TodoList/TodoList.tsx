import React, { useState, useEffect } from "react";
import { Filter } from "../../App";

import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";

import styles from "./TodoList.module.css";

export interface TodoItem {
  id: string;
  text: string;
  status: "active" | "completed";
}

interface Props {
  filter: Filter;
}

const Todos: React.FC<Props> = ({ filter }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (filter === "all") setFilteredTodos(todos);
    else if (filter === "active")
      setFilteredTodos(todos.filter((t) => t.status === "active"));
    else setFilteredTodos(todos.filter((t) => t.status === "completed"));
  }, [todos, filter]);

  const handleAdd = (newTodo: TodoItem) => setTodos([...todos, newTodo]);
  const handleUpdate = (updatedTodo: TodoItem) =>
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  const handleDelete = (deletedTodo: TodoItem) =>
    setTodos(todos.filter((t) => t.id !== deletedTodo.id));

  return (
    <>
      {/* List */}
      <div className={styles.todoContainer}>
        <ul className={styles.todoLists}>
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
      {/* Input */}
      <AddTodo onAdd={handleAdd} />
    </>
  );
};

export default Todos;
