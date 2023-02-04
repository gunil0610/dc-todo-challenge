import React, { useState, useEffect } from "react";
import { BsSunFill, BsTrashFill } from "react-icons/bs";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

import styles from "./Todos.module.css";

type Filter = "all" | "active" | "completed";

interface TodoItem {
  id: number;
  value: string;
  status: "active" | "completed";
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (filter === "all") setFilteredTodos(todos);
    else if (filter === "active")
      setFilteredTodos(todos.filter((t) => t.status === "active"));
    else setFilteredTodos(todos.filter((t) => t.status === "completed"));
  }, [todos, filter]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (input.length <= 0) return;
    setTodos([
      ...todos,
      {
        id: Math.floor(Math.random() * 1000000),
        value: input,
        status: "active",
      },
    ]);
    setInput("");
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
  const onDeleteClick = (id: number) => {
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
                {todo.value}
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
      <div className={styles.inputContainer}>
        <form onSubmit={onSubmit} className={styles.inputForm}>
          <input
            placeholder="Add Todo"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className={styles.inputText}
          />
          <input type="submit" value={"Add"} className={styles.inputButton} />
        </form>
      </div>
    </div>
  );
};

export default Todos;
