import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Todos from "./components/TodoList/TodoList";

export type Filter = "all" | "active" | "completed";
export const filters: Filter[] = ["all", "active", "completed"];

function App() {
  const [filter, setFilter] = useState<Filter>(filters[0]);

  return (
    <div className="App">
      <div className="container">
        <Header filter={filter} onFilterChange={setFilter} />
        <Todos filter={filter} />
      </div>
    </div>
  );
}

export default App;
