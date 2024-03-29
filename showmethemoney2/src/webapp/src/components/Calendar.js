import "./Calendar.css";
import { useState, useEffect } from "react";
import { getTransaction } from "../api.js";
import { Link, useOutletContext } from "react-router-dom";

function Transactions({ year, month, date }) {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransaction(year, month + 1, date);
      setTransactions(result);
    };
    fetchData();
  }, [year, month, date]);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="transactions">
        {transactions.map((transaction, i) => (
          <div className="transaction" key={i}>
            <div>
              <div className="category">{transaction.category}</div>
              <div className="memo">{transaction.memo}</div>
            </div>
            <div
              className={`money ${
                transaction.division === "expense" ? "expense" : "income"
              }`}
            >
              {transaction.money}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Calendar() {
  const { year, month } = useOutletContext();

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
      let dailyTotalIncome = false;
      let dailyTotalExpense = false;

      const datas = getTransaction(year, month + 1, i);
      datas.forEach((data) => {
        if (data.division === "income") {
          dailyTotalIncome += +data.money;
        } else {
          dailyTotalExpense.toString();
          dailyTotalExpense += +data.money;
        }
      });

      calendarDate.push(
        <div className="date" onClick={() => selectDate(i)}>
          {i}
          {dailyTotalIncome && (
            <div className="income daily-total">+{dailyTotalIncome}</div>
          )}
          {dailyTotalExpense && (
            <div className="expense daily-total">-{dailyTotalExpense}</div>
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
      <Transactions year={year} month={month} date={date} />
    </>
  );
}

export default Calendar;
