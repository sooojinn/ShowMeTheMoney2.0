import { useNavigate } from "react-router-dom";
import "./Transactions.css";

function Transactions({ transactions }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/modify", { state: { id: id } });
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="transactions">
      {transactions.map((transaction, i) => (
        <div
          className="transaction"
          key={transaction.id}
          onClick={() => {
            handleClick(transaction.id);
          }}
        >
          <div>
            <div className="category">{transaction.category}</div>
            <div className="memo">{transaction.memo}</div>
          </div>
          <div
            className={`money ${
              transaction.division === "expense" ? "expense" : "income"
            }`}
          >
            {[+transaction.money].toLocaleString()}원
          </div>
        </div>
      ))}
    </div>
  );
}

export default Transactions;
