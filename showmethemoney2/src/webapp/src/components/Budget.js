import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BudgetForm from "./BudgetForm.js";
import styled from "styled-components";

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
        <BudgetPage>
          <div>한 달 예산</div>
          <RemainingBudget isOver={isOver}>
            {Math.abs(remainingBudget).toLocaleString()}원{" "}
            {isOver ? "초과" : "남음"}
          </RemainingBudget>
          <ProgressContainer>
            <ProgressBar progress={progress} isOver={isOver}>
              <Progress>{progress}%</Progress>
            </ProgressBar>
            <RecommendedLine width={(recommendedSpending / budget) * 100}>
              <TodayBadge>오늘</TodayBadge>
            </RecommendedLine>
          </ProgressContainer>
          <BudgetData>
            <span>총 예산</span>
            <span>{[+budget].toLocaleString()}원</span>
          </BudgetData>
          <BudgetData>
            <span>오늘까지 권장 지출</span>
            <span>{recommendedSpending.toLocaleString()}원</span>
          </BudgetData>
          <ModifyBtn onClick={handleModifyClick}>예산 수정</ModifyBtn>
        </BudgetPage>
      )}
      {showBudgetForm && <BudgetForm year={year} month={month} />}
    </>
  );
}

const BudgetPage = styled.div`
  margin: 20px 20px;
  font-size: 22px;
`;

const RemainingBudget = styled.div`
  font-size: 27px;
  margin-top: 5px;
  color: ${(props) => (props.isOver ? "#FE6677" : "inherit")};
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 25px;
  margin: 35px 0 10px 0;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: var(--maincolor);
  border-radius: 5px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;

  width: ${(props) => props.progress}%;
  backgroundcolor: ${(props) =>
    props.isOver ? "#FE6677" : "var(--maincolor)"};
`;

const Progress = styled.div`
  font-size: 14px;
`;

const RecommendedLine = styled.div`
  border-right: 1px dashed black;
  height: 35px;
  position: relative;
  left: 0;
  top: -35px;
  width: ${(props) => props.width}%;
`;

const TodayBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 18px;
  background-color: #d1d1d2;
  color: #fff;
  border-radius: 10px;
  font-size: 13px;
  position: absolute;
  top: -18px;
  right: -15px;
`;

const BudgetData = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 19px;
  margin-bottom: 2px;
`;

const ModifyBtn = styled.div`
  font-size: 17px;
  background-color: var(--maincolor);
  width: 70px;
  height: 25px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  cursor: pointer;
`;
