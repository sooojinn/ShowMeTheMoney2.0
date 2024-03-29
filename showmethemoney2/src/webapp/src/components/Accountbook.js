import { useState } from "react";
import "./Accountbook.css";
import { NavLink, Outlet } from "react-router-dom";

function Accountbook() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

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

  const pageBtnStyle = ({ isActive }) => {
    return "page-btn " + (isActive ? "current-page" : "");
  };

  return (
    <div>
      <div className="page-btns">
        <NavLink to="calendar" className={pageBtnStyle}>
          달력
        </NavLink>
        <NavLink to="statics" className={pageBtnStyle}>
          통계
        </NavLink>
        <NavLink to="list" className={pageBtnStyle}>
          리스트
        </NavLink>
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
      <Outlet context={{ year: year, month: month }} />
    </div>
  );
}

export default Accountbook;
