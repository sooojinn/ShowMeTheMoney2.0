import { useOutletContext } from "react-router-dom";
import Transactions from "./Transactions.js";
import styled from "styled-components";

export default function List() {
  const { year, month, monthlyTransactions } = useOutletContext();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isData = monthlyTransactions.length !== 0;

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

  const renderList = () => {
    const list = [];
    for (let i = 0; i < daysInMonth; i++) {
      const transactions = getDailyTransactions(i);
      const show = transactions.length !== 0;
      list.unshift(
        <div key={i}>
          {show && (
            <ListDate>
              {year}년 {month + 1}월 {i}일
            </ListDate>
          )}
          <Transactions transactions={transactions} />
        </div>
      );
    }

    return list;
  };

  return (
    <>
      {isData && <ListWrapper>{renderList()}</ListWrapper>}
      {isData || (
        <NoDataMessage>지출·수입 내역이 존재하지 않습니다.</NoDataMessage>
      )}
    </>
  );
}

const ListWrapper = styled.div`
  margin-top: 15px;
  height: 780px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fafaf9;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b6b7bb;
    border-radius: 1.5px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const ListDate = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 0.95rem;
  margin: 8px 0px;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 5px;
  }
`;

const NoDataMessage = styled.p`
  margin-top: 70px;
  text-align: center;
`;
