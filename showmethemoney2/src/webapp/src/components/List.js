import { useOutletContext } from "react-router-dom";
import Transactions from "./Transactions.js";
import { getTransactions } from "../api.js";
import "./List.css";

function List() {
  const { year, month } = useOutletContext();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const renderList = () => {
    const list = [];
    for (let i = 0; i < daysInMonth; i++) {
      const transactions = getTransactions(year, month + 1, i);
      const show = transactions.length !== 0;
      list.unshift(
        <div>
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
