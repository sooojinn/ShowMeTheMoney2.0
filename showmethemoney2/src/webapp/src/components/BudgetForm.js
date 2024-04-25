import { useState } from "react";
import { postBudget } from "../api.js";
import styled from "styled-components";

export default function BudgetForm({ year, month }) {
  const [newBudget, setNewBudget] = useState("0");

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
        window.location.reload();
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
    <Form onSubmit={handleSubmit}>
      <div>한 달 예산</div>
      <div>
        <BudgetInput
          value={newBudget}
          onChange={handleChange}
          onFocus={removeComma}
          onBlur={addComma}
        />
        원<button type="submit">저장</button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  font-size: 21px;
  width: fit-content;
  margin: 50px auto;

  & button {
    width: 40px;
    height: 35px;
    margin-left: 10px;
    font-family: inherit;
    font-size: 17px;
  }
`;

const BudgetInput = styled.input`
  width: 200px;
  height: 40px;
  margin-top: 10px;
  padding: 3px;
  font-size: 25px;
  border: 2px solid var(--maincolor);
  border-width: 0 0 2px;
  background-color: transparent;
`;
