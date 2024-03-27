import "./Calendar.css";
import { useState, useEffect } from "react";
import { getTransaction } from "../api.js";

function CalendarHeader({ year, month, setYear, setMonth }) {
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

  return (
    <div className="calendar-header">
      <button onClick={handlePrevBtn}>이전</button>
      <h2>
        {year}년 {month + 1}월
      </h2>
      <button onClick={handleNextBtn}>다음</button>
    </div>
  );
}

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

function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [date, setDate] = useState(today.getDate());

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  const selectDate = (date) => {
    setDate(date);
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

    return <div className="calendar">{calendarDate}</div>;
  };

  useEffect(() => {
    renderCalendar();
  }, [year, month]);

  console.log("render");

  return (
    <>
      <CalendarHeader
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
      />
      <div className="calendar day">
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
        <div>일</div>
      </div>
      {renderCalendar()}
      <div className="write-btn">+ 새로운 거래 추가하기</div>
      <Transaction year={year} month={month} date={date} />
    </>
  );
}

export default Calendar;
