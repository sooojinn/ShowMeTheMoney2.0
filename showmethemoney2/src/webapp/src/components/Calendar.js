import "./Calendar.css";
import Transactions from "./Transactions.js";
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Calendar() {
  const { year, month, datas } = useOutletContext();

  const getDailyData = (date) => {
    return datas.filter((data) => data.date === `${year}-${month + 1}-${date}`);
  };

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  const transactionsOfToday = getDailyData(currentDate);
  const [transactions, setTransactions] = useState(transactionsOfToday);
  const [selectedDate, setSelectedDate] = useState();

  const handleDateClick = (i) => {
    setSelectedDate(i);
    setTransactions(getDailyData(i));
  };

  useEffect(() => {
    if (month === currentMonth) {
      setSelectedDate(currentDate);
      setTransactions(getDailyData(currentDate));
    } else {
      setSelectedDate();
      setTransactions([]);
    }
  }, [month]);

  const renderCalendar = () => {
    const calendarDate = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      calendarDate.push(<div className="empty" key={"empty" + i}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      let dailyTotalIncome = false;
      let dailyTotalExpense = false;

      const dailyData = getDailyData(i);

      dailyData.forEach((data) => {
        if (data.division === "income") {
          dailyTotalIncome += +data.money;
        } else {
          dailyTotalExpense += +data.money;
        }
      });

      calendarDate.push(
        <div
          className={"date " + (i === selectedDate ? "selected-date" : "")}
          onClick={() => handleDateClick(i)}
          key={i}
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
      <Link
        to="/write"
        state={{ year: year, month: month, selectedDate: selectedDate }}
        className="write-btn"
      >
        + 새로운 거래 추가하기
      </Link>

      <Transactions transactions={transactions} />
    </>
  );
}

export default Calendar;
