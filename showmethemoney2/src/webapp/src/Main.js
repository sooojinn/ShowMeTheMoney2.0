import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App.js";
import Home from "./components/Home.js";
import Accountbook from "./components/Accountbook.js";
import Calendar from "./components/Calendar.js";
import Statics from "./components/Statics.js";
import List from "./components/List.js";
import Write from "./components/Write.js";
import NotFound from "./components/NotFound.js";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="accountbook" element={<Accountbook />}>
            <Route path="calendar" element={<Calendar />} />
            <Route path="statics" element={<Statics />} />
            <Route path="list" element={<List />} />
          </Route>
          <Route path="write" element={<Write />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
