import React from "react";
import { TodoItem } from "../TodoList/TodoList";
import { BsTrashFill } from "react-icons/bs";

import styles from "./Todo.module.css";

interface Props {
  todo: TodoItem;
  onUpdate(todo: TodoItem): void;
  onDelete(todo: TodoItem): void;
}

const Todo: React.FC<Props> = ({ todo, onUpdate, onDelete }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onUpdate({ ...todo, status: e.target.checked ? "completed" : "active" });
  };
  return (
    <li className={styles.todoListItem}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="checkbox"
        checked={todo.status === "completed"}
        onChange={handleChange}
      />
      <label
        htmlFor="checkbox"
        className={`${styles.text} ${
          todo.status === "completed" && styles.completed
        }`}
      >
        {todo.text}
      </label>
      <span className={styles.icon}>
        <button onClick={() => onDelete(todo)} className={styles.button}>
          <BsTrashFill />
        </button>
      </span>
    </li>
  );
};

export default Todo;
