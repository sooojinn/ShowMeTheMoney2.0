import styled from "styled-components";

export default function Calendar({
  year,
  month,
  getDailyTransactions,
  handleDateClick,
  selectedDate,
}) {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  let calendarDate = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDate.push(<DateItem key={"empty" + i}></DateItem>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let dailyTotalIncome = false;
    let dailyTotalExpense = false;

    const dailyData = getDailyTransactions(i);

    dailyData.forEach((data) => {
      if (data.division === "income") {
        dailyTotalIncome += +data.money;
      } else {
        dailyTotalExpense += +data.money;
      }
    });

    calendarDate.push(
      <DateItem onClick={() => handleDateClick(i)} key={i}>
        <DateNum className={i === selectedDate ? " selected" : ""}>{i}</DateNum>
        {dailyTotalIncome && (
          <DailyTotal className="income">
            +{dailyTotalIncome.toLocaleString()}
          </DailyTotal>
        )}
        {dailyTotalExpense && (
          <DailyTotal className="expense">
            -{dailyTotalExpense.toLocaleString()}
          </DailyTotal>
        )}
      </DateItem>
    );
  }

  return <>{calendarDate}</>;
}

const DateItem = styled.div`
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: 1;
`;

const DateNum = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  margin-bottom: 3px;

  &.selected {
    background-color: var(--maincolor);
    border-radius: 50%;
  }
`;

const DailyTotal = styled.div`
  font-size: 0.7rem;
  margin: 0;
  padding-left: 3px;
`;
