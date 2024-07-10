import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App.js";
import HomePage from "./pages/HomePage.js";
import JoinPage from "./pages/JoinPage.js";
import LoginPage from "./pages/LoginPage.js";
import AccountbookPage from "./pages/AccountbookPage.js";
import CalendarPage from "./pages/CalendarPage.js";
import StaticsPage from "./pages/StaticsPage.js";
import ListPage from "./pages/ListPage.js";
import BudgetPage from "./pages/BudgetPage.js";
import WritePage from "./pages/WritePage.js";
import ModifyPage from "./pages/ModifyPage.js";
import NotFound from "./pages/NotFound.js";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="accountbook" element={<AccountbookPage />}>
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="statics" element={<StaticsPage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="budget" element={<BudgetPage />} />
          </Route>
          <Route path="write" element={<WritePage />} />
          <Route path="modify" element={<ModifyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
