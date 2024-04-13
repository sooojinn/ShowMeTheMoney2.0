import { useOutletContext } from "react-router-dom";
import Transactions from "./Transactions.js";
import "./List.css";

function List() {
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
            <p className="list-date">
              {year}년 {month + 1}월 {i}일
            </p>
          )}
          <Transactions transactions={transactions} />
        </div>
      );
    }

    return list;
  };

  return (
    <>
      <div className="list">{renderList()}</div>
    </>
  );
}

export default List;
