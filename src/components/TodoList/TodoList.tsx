import React, { useState, useEffect } from "react";
import { BsSunFill, BsTrashFill } from "react-icons/bs";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";

import styles from "./TodoList.module.css";

type Filter = "all" | "active" | "completed";

export interface TodoItem {
  id: string;
  text: string;
  status: "active" | "completed";
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [filter, setFilter] = useState<Filter>("all");
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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {/* Icon */}
        <BsSunFill className={styles.themeIcon} />
        {/* Filter */}
        <ul className={styles.filter}>
          <li
            onClick={() => setFilter("all")}
            className={`${styles.filterItem} ${
              filter === "all" && styles.selectedFilterItem
            }`}
          >
            All
          </li>
          <li
            onClick={() => setFilter("active")}
            className={`${styles.filterItem} ${
              filter === "active" && styles.selectedFilterItem
            }`}
          >
            Active
          </li>
          <li
            onClick={() => setFilter("completed")}
            className={`${styles.filterItem} ${
              filter === "completed" && styles.selectedFilterItem
            }`}
          >
            Completed
          </li>
        </ul>
      </div>

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
    </div>
  );
};

export default Todos;
