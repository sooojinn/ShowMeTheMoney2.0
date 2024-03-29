import mock from "./mock.json";

const { transactions } = mock;

// const categoryList = {
//   food: "식비",
//   cafe: "카페",
//   mart: "마트/생필품",
//   culture: "문화생활",
//   medical: "의료비",
//   dues: "공과금",
//   transportation: "교통비",
//   communication: "통신비",
//   subscription: "구독료",
//   hobby: "취미",
//   shopping: "쇼핑",
//   beauty: "미용",
//   gift: "경조사/선물",
//   travel: "여행",
//   etc: "기타",
//   salary: "급여",
//   additional: "부수입",
//   allowance: "용돈",
// };

export function getTransactions(year, month) {
  const datas = transactions.filter((transaction) =>
    transaction.date.includes(`${year}-${month}`)
  );

  // if (datas.length > 0) {
  //   datas.forEach((data) => {
  //     data.category = categoryList[data.category];
  //   });
  // }
  return datas;
}

// export async function getTransaction() {
//   const res = await fetch(
//     `https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/transaction?date=${year}-${month}-${date}`
//   );
//   return res.json();
// }
