import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App.js";
import Home from "./components/Home.js";
import Join from "./components/Join.js";
import Login from "./components/Login.js";
import Accountbook from "./components/Accountbook.js";
import Calendar from "./components/Calendar.js";
import Statics from "./components/Statics.js";
import List from "./components/List.js";
import Budget from "./components/Budget.js";
import Write from "./components/Write.js";
import Modify from "./components/Modify.js";
import NotFound from "./components/NotFound.js";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="accountbook" element={<Accountbook />}>
            <Route path="calendar" element={<Calendar />} />
            <Route path="statics" element={<Statics />} />
            <Route path="list" element={<List />} />
            <Route path="budget" element={<Budget />} />
          </Route>
          <Route path="write" element={<Write />} />
          <Route path="modify" element={<Modify />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
