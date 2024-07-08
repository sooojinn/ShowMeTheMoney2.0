import Transactions from "./Transactions.js";
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";

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
    calendarDate.push(<DateItem key={"empty" + i}></DateItem>);
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
      <DateItem onClick={() => handleDateClick(i)} key={i}>
        <DateNum className={i === selectedDate ? " selected" : ""}>{i}</DateNum>
        {dailyTotalIncome && (
          <DailyTotal className="income">
            +{dailyTotalIncome.toLocaleString()}
          </DailyTotal>
        )}
        {dailyTotalExpense && (
          <DailyTotal className="expense">
            -{dailyTotalExpense.toLocaleString()}
          </DailyTotal>
        )}
      </DateItem>
    );
  }

  return <CalendarWrapper>{calendarDate}</CalendarWrapper>;
}

export default function Calendar() {
  const { year, month, monthlyTotals, monthlyTransactions } =
    useOutletContext();
  const monthlyIncome = +monthlyTotals["income-total"];
  const monthlyExpense = +monthlyTotals["expense-total"];
  const monthlyTotal = monthlyIncome - monthlyExpense;

  const getDailyTransactions = (date) => {
    let twoDigitMonth = month;
    let twoDigitDate = date;
    if (month < 9) {
      twoDigitMonth = "0" + `${month + 1}`;
    }
    if (date < 10) {
      twoDigitDate = "0" + `${date}`;
    }
    return monthlyTransactions.filter(
        (data) => data.date === `${year}-${twoDigitMonth}-${twoDigitDate}`
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
      setSelectedDate("");
      setDailyTransactions([]);
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
      </CalendarWrapper>
      <CalendarDates
        year={year}
        month={month}
        getDailyTransactions={getDailyTransactions}
        handleDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
      <WriteBtn
        to="/write"
        state={{
          dateString: `${year}-${month + 1}-${selectedDate ? selectedDate : 1}`,
        }}
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
  text-align: center;
`;

const DateItem = styled.div`
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: 1;
`;

const DateNum = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  margin-bottom: 3px;

  &.selected {
    background-color: var(--maincolor);
    border-radius: 50%;
  }
`;

const DailyTotal = styled.div`
  font-size: 0.7rem;
  margin: 0;
  padding-left: 3px;
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
