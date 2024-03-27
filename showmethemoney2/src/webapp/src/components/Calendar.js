import "./Calendar.css";
import Write from "./Write.js";
import { useState, useEffect } from "react";
import { getTransaction } from "../api.js";
import { Routes, Route, Link } from "react-router-dom";

function Transaction({ year, month, date }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransaction(year, month + 1, date);
      setData(result);
    };
    fetchData();
  }, [year, month, date]);

  if (data.length === 0) {
    return null;
  }

  const moneyClassNames = `money ${
    data.division === "expense" ? "expense" : "income"
  }`;

  return (
    <>
      <div className="transactions">
        {data.map((data) => (
          <div className="transaction">
            <div>
              <div className="category">{data.category}</div>
              <div className="memo">{data.memo}</div>
            </div>
            <div className={moneyClassNames}>{data.money}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Calendar({ year, month }) {
  const today = new Date();
  const [date, setDate] = useState(today.getDate());

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  const selectDate = (i) => {
    setDate(i);
  };

  const renderCalendar = () => {
    const calendarDate = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      calendarDate.push(<div className="empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDate.push(
        <div className="date" onClick={() => selectDate(i)}>
          {i}
        </div>
      );
    }

    return calendarDate;
  };

  console.log("render");

  return (
    <>
      <div className="calendar day">
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
        <div>일</div>
      </div>
      <div className="calendar">{renderCalendar()}</div>
      <Link to="/write" className="write-btn">
        + 새로운 거래 추가하기
      </Link>
      <Transaction year={year} month={month} date={date} />
      <Routes>
        <Route path="/write" element={<Write year={year} month={month} />} />
      </Routes>
    </>
  );
}

export default Calendar;
