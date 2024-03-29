import mock from "./mock.json";

const { transactions } = mock;

// export async function getTransaction() {
//   const res = await fetch(
//     `https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/transaction?date=${year}-${month}-${date}`
//   );
//   return res.json();
// }

export function getTransaction(year, month, selectedDate) {
  return transactions.filter(
    (transaction) => transaction.date === `${year}-${month}-${selectedDate}`
  );
}
