import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Transactions({ transactions }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/modify", { state: { id: id } });
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <TransactionWrapper>
      {transactions.map((transaction, i) => (
        <Transaction
          key={transaction.id}
          onClick={() => {
            handleClick(transaction.id);
          }}
        >
          <div>
            <Category>{transaction.category}</Category>
            <Memo>{transaction.memo}</Memo>
          </div>
          <Money
            className={
              transaction.division === "expense" ? "expense" : "income"
            }
          >
            {[+transaction.money].toLocaleString()}원
          </Money>
        </Transaction>
      ))}
    </TransactionWrapper>
  );
}

const TransactionWrapper = styled.div`
  flex-grow: 1;
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

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 80px;
  padding: 15px 15px;
  margin-bottom: 5px;
  border: 1.5px solid #e6e6e6;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f3f4;
  }
`;

const Category = styled.div`
  font-size: 22px;
`;

const Memo = styled.div`
  color: #a0a1a6;
  font-size: 17px;
  margin-top: 3px;
`;

const Money = styled.div`
  font-size: 25px;
`;
