import { useState, useEffect } from "react";
import { getTransactions } from "../api";
import { NavLink, Outlet } from "react-router-dom";
import { getMonthlyTotal } from "../api";
import { getBudget } from "../api.js";
import { getCategoryTotal } from "../api";
import SpinnerImg from "../images/Spinner_overlay.gif";
import styled from "styled-components";
import LogoutButton from "../components/LogoutButton.js";

export default function AccountbookPage() {
  const storedYear = sessionStorage.getItem("year");
  const storedMonth = sessionStorage.getItem("month");
  const today = new Date();
  const [year, setYear] = useState(
    storedYear ? +storedYear : today.getFullYear()
  );
  const [month, setMonth] = useState(
    storedMonth ? +storedMonth : today.getMonth()
  );
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({
    "income-total": 0,
    "expense-total": 0,
  });
  const [categoryTotal, setCategoryTotal] = useState({});
  const [budget, setBudget] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [transactions, totals, categoryTotals, budget] =
          await Promise.all([
            getTransactions(year, month + 1),
            getMonthlyTotal(year, month + 1),
            getCategoryTotal(year, month + 1),
            getBudget(year, month + 1),
          ]);
        setMonthlyTransactions(transactions);
        setMonthlyTotals(totals);
        setCategoryTotal(categoryTotals);
        setBudget(budget);
      } catch (error) {
        alert("데이터를 불러오는 데 실패했습니다.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    sessionStorage.setItem("year", year);
    sessionStorage.setItem("month", month);
  }, [month]);

  const handlePrevBtn = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else setMonth(month - 1);
    sessionStorage.removeItem("selectedDate");
  };

  const handleNextBtn = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else setMonth(month + 1);
    sessionStorage.removeItem("selectedDate");
  };

  return (
    <>
      <LogoutButton></LogoutButton>
      <PageBtns>
        <PageBtn to="calendar">달력</PageBtn>
        <PageBtn to="statics">통계</PageBtn>
        <PageBtn to="list">리스트</PageBtn>
        <PageBtn to="budget">예산</PageBtn>
      </PageBtns>
      <CalendarHeader>
        <Btn onClick={handlePrevBtn}>◀</Btn>
        <h2>
          {year}년 {month + 1}월
        </h2>
        <Btn onClick={handleNextBtn}>▶</Btn>
      </CalendarHeader>
      {isLoading || (
        <Outlet
          context={{
            year: year,
            month: month,
            monthlyTotals: monthlyTotals,
            monthlyTransactions: monthlyTransactions,
            categoryTotal: categoryTotal,
            budget: budget,
          }}
        />
      )}
      {isLoading && (
        <Overlay>
          <Spinner src={SpinnerImg} alt="로딩중..." />
        </Overlay>
      )}
    </>
  );
}

const PageBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageBtn = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.8rem;
  color: black;
  width: 50px;
  height: 25px;
  border: 1px solid var(--maincolor);
  text-decoration: none;
  cursor: pointer;

  &.active {
    background-color: var(--maincolor);
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const Btn = styled.div`
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(250, 250, 250, 0.3);
  z-index: 999;
`;

const Spinner = styled.img`
  width: 80px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`;
