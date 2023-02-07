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

const TodoList: React.FC<Props> = ({ filter }) => {
  const [todos, setTodos] = useState<TodoItem[]>(
    JSON.parse(localStorage.todos)
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (newTodo: TodoItem) => setTodos([...todos, newTodo]);

  const handleUpdate = (updatedTodo: TodoItem) =>
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));

  const handleDelete = (deletedTodo: TodoItem) =>
    setTodos(todos.filter((t) => t.id !== deletedTodo.id));

  const getFilteredItems = (todos: TodoItem[], filter: Filter): TodoItem[] => {
    if (filter === "all") return todos;
    else if (filter === "active")
      return todos.filter((t) => t.status === "active");
    else return todos.filter((t) => t.status === "completed");
  };

  const filtered = getFilteredItems(todos, filter);

  return (
    <section className={styles.todoContainer}>
      {/* List */}
      <ul className={styles.todoLists}>
        {filtered.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {/* Input */}
      <AddTodo onAdd={handleAdd} />
    </section>
  );
};

export default TodoList;
