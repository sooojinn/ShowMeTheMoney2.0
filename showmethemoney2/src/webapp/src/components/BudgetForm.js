import { useState } from "react";
import { postBudget, putBudget } from "../api.js";
import styled from "styled-components";
import useAsync from "../hooks/useAsync.js";

export default function BudgetForm({ year, month, budget }) {
  const budgetWithComma = (budget) =>
    (budget ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const budgetWithoutComma = (budget) => budget.replaceAll(",", "");

  const initialBudget = budgetWithComma(budget);
  const [newBudget, setNewBudget] = useState(initialBudget);
  const isBudget = typeof budget === "number";
  const request = isBudget ? putBudget : postBudget;
  const [isSubmitting, requestAsync] = useAsync(request);

  const handleChange = (e) => {
    let validMoneyValue = e.target.value.replace(/[^0-9]/g, "");
    if (validMoneyValue.length > 1 && validMoneyValue[0] === "0") {
      validMoneyValue = validMoneyValue.slice(1);
    }
    setNewBudget(validMoneyValue);
  };

  const addComma = () => {
    setNewBudget(budgetWithComma(newBudget));
  };

  const removeComma = () => {
    setNewBudget(budgetWithoutComma(newBudget));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const budget = +budgetWithoutComma(newBudget);
    const data = {
      year: year,
      month: month + 1,
      budget: budget,
    };

    const res = await requestAsync(data);

    if (!res) return;

    window.location.reload();
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
        원
        <Button type="submit" disabled={isSubmitting}>
          저장
        </Button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  font-size: 1.1rem;
  width: fit-content;
  margin: 50px auto;
`;

const BudgetInput = styled.input`
  width: 200px;
  height: 40px;
  margin-top: 10px;
  padding: 3px;
  font-size: 1.3rem;
  border: 2px solid var(--maincolor);
  border-width: 0 0 2px;
  background-color: transparent;
  outline: none;
`;

const Button = styled.button`
  width: 40px;
  height: 35px;
  margin-left: 10px;
  font-family: inherit;
  font-size: 0.9rem;
  background-color: var(--maincolor);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
