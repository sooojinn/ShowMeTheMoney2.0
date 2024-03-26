async function getTransaction(year, month, date) {
  const res = await fetch(
    `https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/transaction?date=${year}-${month}-${date}`
  );
  return res.json();
}

export { getTransaction };
