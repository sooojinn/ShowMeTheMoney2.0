import "./Transactions.css";

function Transactions({ transactions }) {
  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="transactions">
      {transactions.map((transaction, i) => (
        <div className="transaction" key={transaction.id}>
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
