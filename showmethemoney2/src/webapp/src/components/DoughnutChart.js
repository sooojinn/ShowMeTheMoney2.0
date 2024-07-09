import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

export const indexColorList = [
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

export default function DoughnutChart({ categoryTotal }) {
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
      <Chart data={Data} options={Options} width={300} height={300}></Chart>
    </div>
  );
}

const Chart = styled(Doughnut)`
  margin: 0 auto;
`;
