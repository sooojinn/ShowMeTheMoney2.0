import { useOutletContext } from "react-router-dom";
import styled, { css } from "styled-components";
import { useState } from "react";
import DoughnutChart from "../components/DoughnutChart.js";
import { indexColorList } from "../components/DoughnutChart.js";

export default function StaticsPage() {
  const { monthlyTotals, categoryTotal: allCategoryTotal } = useOutletContext();

  const [division, setDivision] = useState("expense");
  const [categoryTotal, setCategoryTotal] = useState(
    allCategoryTotal["expense"]
  );
  const expenseTotal = +monthlyTotals["expense-total"];
  const incomeTotal = +monthlyTotals["income-total"];
  const totalAmount = division === "expense" ? expenseTotal : incomeTotal;
  const isData = totalAmount !== 0;

  const translate = {
    expense: "지출",
    income: "수입",
  };
  const handleDivisionClick = (e) => {
    setDivision(e.target.value);
    setCategoryTotal(allCategoryTotal[e.target.value]);
  };

  const createLegend = () => {
    let legend = [];
    let i = 0;
    for (const key in categoryTotal) {
      legend.push(
        <LegendItem key={key}>
          <LeftDiv>
            <IndexColor color={indexColorList[i]}></IndexColor>
            <div>{key}</div>
            <Percent>
              {Math.round((categoryTotal[key] / totalAmount) * 100)}%
            </Percent>
          </LeftDiv>
          <div>{[+categoryTotal[key]].toLocaleString()}원</div>
        </LegendItem>
      );
      i++;
    }
    return legend;
  };

  return (
    <>
      <StaticsDivision>
        <CheckDivision
          type="radio"
          name="division"
          value="expense"
          id="expense"
          defaultChecked
          onClick={handleDivisionClick}
        />
        <Label htmlFor="expense">지출 {expenseTotal.toLocaleString()}원</Label>
        <CheckDivision
          type="radio"
          name="division"
          value="income"
          id="income"
          onClick={handleDivisionClick}
        />
        <Label htmlFor="income">수입 {incomeTotal.toLocaleString()}원</Label>
      </StaticsDivision>
      {isData && (
        <>
          <DoughnutChart categoryTotal={categoryTotal} />
          <TotalAmountDiv>
            <div>전체</div>
            <div>{totalAmount.toLocaleString()}원</div>
          </TotalAmountDiv>
          <LegendWrapper>{createLegend()}</LegendWrapper>
        </>
      )}
      {isData || (
        <NoDataMessage>
          {translate[division]} 내역이 존재하지 않습니다.
        </NoDataMessage>
      )}
    </>
  );
}
const CheckDivision = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin-right: 5px;
  border: 2px solid #ccc;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #ffcdce;
    border: 3px solid white;
    box-shadow: 0 0 0 1.6px #ffcdce;
  }

  ${(props) =>
    props.value === "income" &&
    css`
      margin-left: 30px;
    `}
`;

const StaticsDivision = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TotalAmountDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0px 10px 15px;
  padding: 10px 15px;
  width: auto;
  font-size: 0.9rem;
  color: #b6b7bb;
  border-bottom: 0.5px solid #b6b7bb;
`;

const LegendWrapper = styled.div`
  height: 430px;
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

const LegendItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
`;

const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const IndexColor = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const Percent = styled.span`
  color: #b6b7bb;
  font-size: 0.8rem;
`;

const NoDataMessage = styled.p`
  margin-top: 70px;
  text-align: center;
`;
