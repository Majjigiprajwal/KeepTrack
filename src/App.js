import React from "react";
import { Routes, Route } from "react-router-dom";

import { PATHS } from "./paths";
import Login from "./components/Login/Login";
import AddExpense from "./components/AddExpense/AddExpense";
import ManageExpense from "./components/ManageExpense/ManageExpense";
import PrivateRoutes from "./routes/PrivateRoutes";
import RestrictedRoutes from "./routes/RestrictedRoutes";
import UpdateExpense from "./components/UpdateExpense/UpdateExpense";

export const centeredStyle = {
  width: "100%",
  height: "100vh",
  display: "grid",
  placeItems: "center",
  background: "dodgerblue",
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path={PATHS.ADD_EXPENSE} element={<AddExpense />} />
        <Route path={PATHS.MANAGE_EXPENSE} element={<ManageExpense />} />
        <Route path={PATHS.UPDATE_EXPENSE} element={<UpdateExpense />} />
      </Route>

      <Route path="/" element={<RestrictedRoutes />}>
        <Route path={PATHS.LOGIN} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
