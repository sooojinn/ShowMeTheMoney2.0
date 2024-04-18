import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useOutletContext } from "react-router-dom";
import "./Statics.css";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { getCategoryTotal } from "../api";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const indexColorList = [
  "#FFA8BE",
  "#F8DDDC",
  "#FFCDCE",
  "#F3CDCC",
  "#F5E0CE",
  "#FFF5EB",
  "#FFECC8",
  "#FFE0D1",
  "#EDD2E1",
  "#F5C8DF",
  "#DDE7D0",
  "#C8E6D1",
  "#C7D7EA",
  "#D7CFE2",
  "#DDD7D3",
];

const IndexColor = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

function DoughnutChart() {
  const { categoryTotal } = useOutletContext();

  const Data = {
    labels: [...Object.keys(categoryTotal)],
    datasets: [
      {
        label: "total",
        data: [...Object.values(categoryTotal)],
        backgroundColor: [...indexColorList],
        borderWidth: 1,
      },
    ],
  };

  const Options = {
    responsive: false,
    cutout: "30%",
    radius: "80%",
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Doughnut
        data={Data}
        options={Options}
        width={300}
        height={300}
        className="chart"
      ></Doughnut>
    </div>
  );
}

function Statics() {
  const {
    year,
    month,
    monthlyTotals,
    categoryTotal: expenseCategory,
  } = useOutletContext();
  const [division, setDivision] = useState("expense");
  const [categoryTotal, setCategoryTotal] = useState(expenseCategory);
  const expenseTotal = +monthlyTotals["expense-total"];
  const incomeTotal = +monthlyTotals["income-total"];
  const totalAmount = division === "expense" ? expenseTotal : incomeTotal;

  const handleDivisionClick = (e) => {
    setDivision(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nextCategoryTotal = await getCategoryTotal(division, year, month);
        setCategoryTotal(nextCategoryTotal);
      } catch {
        alert("데이터를 불러오는 데 실패했습니다.");
      }
    };
    fetchData();
  }, [division]);

  const createLegend = () => {
    let legend = [];
    let i = 0;
    for (const key in categoryTotal) {
      legend.push(
        <div className="legend-item" key={key}>
          <div className="left-div">
            <IndexColor color={indexColorList[i]}></IndexColor>
            <div>{key}</div>
            <div className="percent">
              {Math.round((categoryTotal[key] / totalAmount) * 100)}%
            </div>
          </div>
          <div className="total">
            {[+categoryTotal[key]].toLocaleString()}원
          </div>
        </div>
      );
      i++;
    }
    return legend;
  };

  return (
    <>
      <div className="statics-division">
        <CheckDivision
          type="radio"
          name="division"
          value="expense"
          id="expense"
          defaultChecked
          onClick={handleDivisionClick}
        />
        <label htmlFor="expense">지출 {expenseTotal}원</label>
        <CheckDivision
          type="radio"
          name="division"
          value="income"
          id="income"
          onClick={handleDivisionClick}
        />
        <label htmlFor="income">수입 {incomeTotal}원</label>
      </div>
      <DoughnutChart />
      <div className="total-amount_div">
        <div>전체</div>
        <div className="total-amount">{totalAmount.toLocaleString()}원</div>
      </div>
      <div className="legend">{createLegend()}</div>
    </>
  );
}

export default Statics;
