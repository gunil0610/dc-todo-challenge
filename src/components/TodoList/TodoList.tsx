import React, { useState, useEffect } from "react";
import { BsSunFill, BsTrashFill } from "react-icons/bs";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

import AddTodo from "../AddTodo/AddTodo";

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

  const addTodo = (newTodo: TodoItem) => {
    setTodos([...todos, newTodo]);
  };
  const onCheckboxClick = (todo: TodoItem) => {
    const changedTodo: TodoItem[] = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          status: todo.status === "active" ? "completed" : "active",
        };
      }
      return t;
    });
    setTodos(changedTodo);
  };
  const onDeleteClick = (id: string) => {
    const changedTodo: TodoItem[] = todos.filter((t) => t.id !== id);
    setTodos(changedTodo);
  };
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
            <li key={todo.id} className={styles.todoListItem}>
              {todo.status === "active" ? (
                <ImCheckboxUnchecked
                  onClick={() => onCheckboxClick(todo)}
                  className={styles.todoCheckbox}
                />
              ) : (
                <ImCheckboxChecked
                  onClick={() => onCheckboxClick(todo)}
                  className={styles.todoCheckbox}
                />
              )}
              <p
                className={`${styles.todoText} ${
                  todo.status === "completed" && styles.todoTextCompleted
                }`}
              >
                {todo.text}
              </p>
              <BsTrashFill
                onClick={() => onDeleteClick(todo.id)}
                className={styles.deleteTodo}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Input */}
      <AddTodo addTodo={addTodo} />
    </div>
  );
};

export default Todos;
