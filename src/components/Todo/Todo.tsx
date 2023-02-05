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
    <li key={todo.id} className={styles.todoListItem}>
      <input
        className={styles.todoCheckbox}
        type="checkbox"
        id="checkbox"
        checked={todo.status === "completed"}
        onChange={handleChange}
      />
      <p
        className={`${styles.todoText} ${
          todo.status === "completed" && styles.todoTextCompleted
        }`}
      >
        {todo.text}
      </p>
      <BsTrashFill
        onClick={() => onDelete(todo)}
        className={styles.deleteTodo}
      />
    </li>
  );
};

export default Todo;
