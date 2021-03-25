import React from "react";
import "./App.css";
import AddItems from "./components/BudgedPlannerComps/AddItems";
import BudgetResult from "./components/BudgedPlannerComps/BudgetResult";
import ShowItems from "./components/BudgedPlannerComps/ShowItems";

function App() {
  return (
    <div>
      <AddItems />
      <BudgetResult />
      <ShowItems />
    </div>
  );
}

export default App;
