import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../components/Calendar.js";
import Transactions from "../components/Transactions.js";

export default function CalendarPage() {
  const { year, month, monthlyTotals, monthlyTransactions } =
    useOutletContext();
  const monthlyIncome = +monthlyTotals["income-total"];
  const monthlyExpense = +monthlyTotals["expense-total"];
  const monthlyTotal = monthlyIncome - monthlyExpense;

  const transferDateString = (year, month, date = 1) => {
    let twoDigitMonth = month;
    let twoDigitDate = date;
    if (month < 9) {
      twoDigitMonth = "0" + `${month + 1}`;
    }
    if (date < 10) {
      twoDigitDate = "0" + `${date}`;
    }

    return `${year}-${twoDigitMonth}-${twoDigitDate}`;
  };

  const getDailyTransactions = (date) => {
    const dateString = transferDateString(year, month, date);
    return monthlyTransactions.filter((data) => data.date === dateString);
  };

  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  const transactionsOfToday = getDailyTransactions(currentDate);
  const [dailyTransactions, setDailyTransactions] =
    useState(transactionsOfToday);

  const [selectedDate, setSelectedDate] = useState();
  const storedSelectedDate = +sessionStorage.getItem("selectedDate");

  const handleDateClick = (i) => {
    setSelectedDate(i);
    setDailyTransactions(getDailyTransactions(i));
    sessionStorage.setItem("selectedDate", i);
  };

  const handleWriteBtnClick = () => {
    sessionStorage.setItem("selectedDate", selectedDate);
  };

  useEffect(() => {
    if (month === currentMonth) {
      setSelectedDate(storedSelectedDate || currentDate);
      setDailyTransactions(
        getDailyTransactions(storedSelectedDate || currentDate)
      );
    } else {
      setSelectedDate(storedSelectedDate || "");
      setDailyTransactions(getDailyTransactions(storedSelectedDate || []));
    }
  }, [month]);

  return (
    <>
      <MonthlyTotalWrapper>
        <div>
          <MonthlyTotalDiv>
            수입
            <MonthlyTotal className="income">
              +{monthlyIncome.toLocaleString()}원
            </MonthlyTotal>
          </MonthlyTotalDiv>
          <MonthlyTotalDiv>
            지출
            <MonthlyTotal className="expense">
              -{monthlyExpense.toLocaleString()}원
            </MonthlyTotal>
          </MonthlyTotalDiv>
        </div>
        <MonthlyTotalDiv>
          합계
          <MonthlyTotal>
            {monthlyTotal >= 0
              ? "+" + monthlyTotal.toLocaleString()
              : monthlyTotal.toLocaleString()}
            원
          </MonthlyTotal>
        </MonthlyTotalDiv>
      </MonthlyTotalWrapper>
      <CalendarWrapper>
        <Day>월</Day>
        <Day>화</Day>
        <Day>수</Day>
        <Day>목</Day>
        <Day>금</Day>
        <Day>토</Day>
        <Day>일</Day>
        <Calendar
          year={year}
          month={month}
          getDailyTransactions={getDailyTransactions}
          handleDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      </CalendarWrapper>
      <WriteBtn
        to="/write"
        state={{
          dateString: transferDateString(year, month, selectedDate),
        }}
        onClick={handleWriteBtnClick}
      >
        + 새로운 거래 추가하기
      </WriteBtn>
      <Transactions transactions={dailyTransactions} />
    </>
  );
}

const MonthlyTotalWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const MonthlyTotalDiv = styled.div`
  margin-bottom: 5px;
`;

const MonthlyTotal = styled.span`
  margin-left: 7px;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  margin: 10px auto;
  font-size: 0.9rem;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Day = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
`;

const WriteBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: black;
  text-decoration: none;
  background-color: white;
  width: 100%;
  height: 80px;
  padding: 15px 15px;
  margin-bottom: 5px;
  border: 1.3px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f3f4;
  }
`;
