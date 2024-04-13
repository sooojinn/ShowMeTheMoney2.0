import { useState } from "react";
import { postBudget } from "../api.js";
import "./Budget.css";
import { useOutletContext } from "react-router-dom";

export default function Budget() {
  const [newBudget, setNewBudget] = useState("0");
  const { year, month, monthlyData, budget } = useOutletContext();
  const remainingBudget = budget - monthlyData["expense-total"];
  const isOver = remainingBudget < 0;
  const progress = isOver ? 100 : Math.floor((remainingBudget / budget) * 100);
  const daysOfMonth = new Date(year, month, 0).getDate();
  const today =
    month === new Date().getMonth() ? new Date().getDate() : daysOfMonth;
  const recommendedSpending = Math.floor((budget / daysOfMonth) * today);

  const handleChange = (e) => {
    let validMoneyValue = e.target.value.replace(/[^0-9]/g, "");
    if (validMoneyValue.length > 0 && validMoneyValue[0] === "0") {
      validMoneyValue = validMoneyValue.slice(1);
    }
    setNewBudget(validMoneyValue);
  };

  const addComma = () => {
    setNewBudget(newBudget?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  const removeComma = () => {
    setNewBudget(newBudget.replaceAll(",", ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { year: year, month: month + 1, budget: newBudget };
    try {
      const status = await postBudget(data);
      if (status === 200) {
        console.log("성공");
      } else {
        throw new Error("에러가 발생했습니다.");
      }
    } catch (error) {
      alert(error.message);
      window.location.reload();
      return;
    }
  };

  return (
    <>
      {budget && (
        <div className="budget-div">
          <div>한 달 예산</div>
          <div className="budget" style={{ color: isOver ? "#FE6677" : "" }}>
            {Math.abs(remainingBudget).toLocaleString()}원{" "}
            {isOver ? "초과" : "남음"}
          </div>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: isOver ? "#FE6677" : "var(--maincolor)",
              }}
            >
              <div className="progress">{progress}%</div>
            </div>
            <div
              className="recommended-line"
              style={{ width: `${(recommendedSpending / budget) * 100}%` }}
            >
              <p className="recommended-badge">오늘</p>
            </div>
          </div>
          <p>
            <span>총 예산</span>
            <span>{[+budget].toLocaleString()}원</span>
          </p>
          <p>
            <span>오늘까지 권장 지출</span>
            <span>{recommendedSpending.toLocaleString()}원</span>
          </p>
          <div className="modify-btn">예산 수정</div>
        </div>
      )}
      {budget === "" && (
        <form className="budget-form" onSubmit={handleSubmit}>
          <div>한 달 예산</div>
          <div>
            <input
              className="budget-input"
              value={newBudget}
              onChange={handleChange}
              onFocus={removeComma}
              onBlur={addComma}
            />
            원
            <button type="submit" className="buget-btn">
              저장
            </button>
          </div>
        </form>
      )}
    </>
  );
}
