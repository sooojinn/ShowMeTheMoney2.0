import "./Calendar.css";
import Transactions from "./Transactions.js";
import { useState, useEffect, useRef } from "react";
import { getTransactions } from "../api.js";
import { Link, useOutletContext } from "react-router-dom";

function Calendar() {
  const { year, month } = useOutletContext();
  const transactionsOfToday = getTransactions(
    year,
    month + 1,
    new Date().getDate()
  );
  const [transactions, setTransactions] = useState(transactionsOfToday);
  const [selectedDate, setSelectedDate] = useState();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  const handleDateClick = (i) => {
    setSelectedDate(i);
    setTransactions(getTransactions(year, month + 1, i));
  };

  useEffect(() => {
    if (month === new Date().getMonth()) setSelectedDate(new Date().getDate());
    else setSelectedDate();
    setTransactions([]);
  }, [month]);

  const renderCalendar = () => {
    const calendarDate = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      calendarDate.push(<div className="empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      let dailyTotalIncome = false;
      let dailyTotalExpense = false;

      const datas = getTransactions(year, month + 1, i);
      datas.forEach((data) => {
        if (data.division === "income") {
          dailyTotalIncome += +data.money;
        } else {
          dailyTotalExpense.toString();
          dailyTotalExpense += +data.money;
        }
      });

      calendarDate.push(
        <div
          className={"date " + (i === selectedDate ? "selected-date" : "")}
          onClick={() => handleDateClick(i)}
        >
          {i}
          {dailyTotalIncome && (
            <div className="income daily-total">
              +{dailyTotalIncome.toLocaleString()}
            </div>
          )}
          {dailyTotalExpense && (
            <div className="expense daily-total">
              -{dailyTotalExpense.toLocaleString()}
            </div>
          )}
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
      <Transactions transactions={transactions} />
    </>
  );
}

export default Calendar;
