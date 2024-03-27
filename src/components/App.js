import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar.js";
import Statics from "./Statics.js";
import List from "./List.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [currentPage, setCurrentPage] = useState("calendar");

  const handlePrevBtn = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else setMonth(month - 1);
  };

  const handleNextBtn = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else setMonth(month + 1);
  };

  const handlePageBtn = (e) => {
    setCurrentPage(e.target.dataset.value);
  };

  return (
    <BrowserRouter>
      <div className="layout">
        <div className="page-btns">
          <Link
            to="/calendar"
            className={`page-btn ${
              currentPage === "calendar" ? "current-page" : ""
            }`}
            data-value="calendar"
            onClick={handlePageBtn}
          >
            달력
          </Link>
          <Link
            to="/statics"
            className={`page-btn ${
              currentPage === "statics" ? "current-page" : ""
            }`}
            data-value="statics"
            onClick={handlePageBtn}
          >
            통계
          </Link>
          <Link
            to="/list"
            className={`page-btn ${
              currentPage === "list" ? "current-page" : ""
            }`}
            data-value="list"
            onClick={handlePageBtn}
          >
            리스트
          </Link>
        </div>
        <div className="calendar-header">
          <div className="btn" onClick={handlePrevBtn}>
            ◀
          </div>
          <h2>
            {year}년 {month + 1}월
          </h2>
          <div className="btn" onClick={handleNextBtn}>
            ▶
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Calendar year={year} month={month} />} />
          <Route
            path="/calendar"
            element={<Calendar year={year} month={month} />}
          />
          <Route
            path="/statics"
            element={<Statics year={year} month={month} />}
          />
          <Route path="/list" element={<List year={year} month={month} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
