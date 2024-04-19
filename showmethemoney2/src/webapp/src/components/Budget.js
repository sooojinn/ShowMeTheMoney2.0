import { useEffect, useState } from "react";
import "./Budget.css";
import { useOutletContext } from "react-router-dom";
import BudgetForm from "./BudgetForm.js";

export default function Budget() {
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  const { year, month, monthlyTotals, budget } = useOutletContext();
  const remainingBudget = budget - monthlyTotals["expense-total"];
  const isOver = remainingBudget < 0;
  const progress = isOver ? 100 : Math.floor((remainingBudget / budget) * 100);

  const daysOfMonth = new Date(year, month, 0).getDate();
  const today =
    month === new Date().getMonth() ? new Date().getDate() : daysOfMonth;
  const recommendedSpending = Math.floor((budget / daysOfMonth) * today);

  useEffect(() => {
    setShowBudgetForm(budget === "");
  }, [budget]);

  const handleModifyClick = () => {
    setShowBudgetForm(true);
  };
  return (
    <>
      {showBudgetForm || (
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
          <div className="modify-btn" onClick={handleModifyClick}>
            예산 수정
          </div>
        </div>
      )}
      {showBudgetForm && <BudgetForm year={year} month={month} />}
    </>
  );
}
