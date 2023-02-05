import { useState } from "react";
import { TodoItem } from "../TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";

import styles from "./AddTodo.module.css";

interface Props {
  onAdd(todo: TodoItem): void;
}

const AddTodo: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (text.trim().length <= 0) return;
    onAdd({
      id: uuidv4(),
      text,
      status: "active",
    });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm}>
      <input
        placeholder="Add Todo"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={styles.inputText}
      />
      <input type="submit" value={"Add"} className={styles.inputButton} />
    </form>
  );
};

export default AddTodo;
