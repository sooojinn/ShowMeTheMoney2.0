import "./Calendar.css";
import Transactions from "./Transactions.js";
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function CalendarDates({
  year,
  month,
  getDailyTransactions,
  handleDateClick,
  selectedDate,
}) {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  let calendarDate = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDate.push(<div className="empty" key={"empty" + i}></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let dailyTotalIncome = false;
    let dailyTotalExpense = false;

    const dailyData = getDailyTransactions(i);

    dailyData.forEach((data) => {
      if (data.division === "income") {
        dailyTotalIncome += +data.money;
      } else {
        dailyTotalExpense += +data.money;
      }
    });

    calendarDate.push(
      <div className="date" onClick={() => handleDateClick(i)} key={i}>
        <p
          className={"date-num" + (i === selectedDate ? " selected-date" : "")}
        >
          {i}
        </p>
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

  return <div className="calendar">{calendarDate}</div>;
}

function Calendar() {
  const { year, month, monthlyTotals, monthlyTransactions } =
    useOutletContext();
  const monthlyIncome = +monthlyTotals["income-total"];
  const monthlyExpense = +monthlyTotals["expense-total"];
  const monthlyTotal = monthlyIncome - monthlyExpense;

  const getDailyTransactions = (date) => {
    return monthlyTransactions.filter(
      (data) => data.date === `${year}-${month + 1}-${date}`
    );
  };

  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  const transactionsOfToday = getDailyTransactions(currentDate);
  const [dailyTransactions, setDailyTransactions] =
    useState(transactionsOfToday);
  const [selectedDate, setSelectedDate] = useState();

  const handleDateClick = (i) => {
    setSelectedDate(i);
    setDailyTransactions(getDailyTransactions(i));
  };

  useEffect(() => {
    if (month === currentMonth) {
      setSelectedDate(currentDate);
      setDailyTransactions(getDailyTransactions(currentDate));
    } else {
      setSelectedDate();
      setDailyTransactions([]);
    }
  }, [month]);

  console.log("render");

  return (
    <>
      <div className="monthly-total">
        <div>
          <div>
            수입
            <span className="monthly income">
              +{monthlyIncome.toLocaleString()}원
            </span>
          </div>
          <div>
            지출
            <span className="monthly expense">
              -{monthlyExpense.toLocaleString()}원
            </span>
          </div>
        </div>
        <div>
          합계
          <span className="monthly total">
            <span>
              {monthlyTotal >= 0
                ? "+" + monthlyTotal.toLocaleString()
                : monthlyTotal.toLocaleString()}
            </span>
            원
          </span>
        </div>
      </div>
      <div className="calendar day">
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
        <div>일</div>
      </div>
      <CalendarDates
        year={year}
        month={month}
        getDailyTransactions={getDailyTransactions}
        handleDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
      <Link
        to="/write"
        state={{ dateString: `${year}-${month + 1}-${selectedDate}` }}
        className="write-btn"
      >
        + 새로운 거래 추가하기
      </Link>
      <Transactions transactions={dailyTransactions} />
    </>
  );
}

export default Calendar;
