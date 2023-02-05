import { useState } from "react";
import Header from "./components/Header/Header";
import Todos from "./components/TodoList/TodoList";
import { DarkModeProvider } from "./context/DarkModeContext";

export type Filter = "all" | "active" | "completed";
export const filters: Filter[] = ["all", "active", "completed"];

function App() {
  const [filter, setFilter] = useState<Filter>(filters[0]);

  return (
    <DarkModeProvider>
      <Header filter={filter} onFilterChange={setFilter} />
      <Todos filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
