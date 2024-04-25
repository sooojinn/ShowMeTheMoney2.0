import { useOutletContext } from "react-router-dom";
import Transactions from "./Transactions.js";
import styled from "styled-components";

export default function List() {
  const { year, month, monthlyTransactions } = useOutletContext();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getDailyTransactions = (date) => {
    return monthlyTransactions.filter(
      (data) => data.date === `${year}-${month + 1}-${date}`
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
      <ListWrapper>{renderList()}</ListWrapper>
    </>
  );
}

const ListWrapper = styled.div`
  margin-top: 15px;
`;

const ListDate = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 18px;
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
