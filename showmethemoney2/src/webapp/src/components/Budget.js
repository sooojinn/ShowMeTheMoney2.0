import { useState } from "react";
import { postBudget } from "../api.js";
import "./Budget.css";
import { useOutletContext } from "react-router-dom";

export default function Budget() {
  const [budget, setBudget] = useState("0");
  const { year, month, monthlyData } = useOutletContext();

  const handleChange = (e) => {
    let validMoneyValue = e.target.value.replace(/[^0-9]/g, "");
    if (validMoneyValue.length > 0 && validMoneyValue[0] === "0") {
      validMoneyValue = validMoneyValue.slice(1);
    }
    setBudget(validMoneyValue);
  };

  const addComma = () => {
    setBudget(budget?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  const removeComma = () => {
    setBudget(budget.replaceAll(",", ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { year: year, month: month + 1, budget: budget };
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
    <form className="budget-form" onSubmit={handleSubmit}>
      <div>한 달 예산</div>
      <div>
        <input
          className="budget-input"
          value={budget}
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
  );
}
