// import mock from "./mock.json";

// const { transactions } = mock;

export async function getTransactions(year, month) {
  // const datas = transactions.filter((transaction) =>
  //   transaction.date.includes(`${year}-${month}`)
  // );

  const res = await fetch(
    `https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/transactions?date=${year}-${month}`
  );

  const datas = await res.json();

  const categoryList = {
    food: "식비",
    cafe: "카페",
    mart: "마트/생필품",
    culture: "문화생활",
    medical: "의료비",
    dues: "공과금",
    transportation: "교통비",
    communication: "통신비",
    subscription: "구독료",
    hobby: "취미",
    shopping: "쇼핑",
    beauty: "미용",
    gift: "경조사/선물",
    travel: "여행",
    etc: "기타",
    salary: "급여",
    additional: "부수입",
    allowance: "용돈",
  };

  return datas.map((data) => {
    const translatedCategory = categoryList[data.category];
    return {
      ...data,
      category: translatedCategory,
    };
  });
}

// export async function isUnique(value) {
//   const res = await fetch("/join/username/duplication", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username: value }),
//   });
//   const result = await res.text();

//   return result === "true" ? false : true;
// }

const usernameArr = ["aaaaa", "12345", "soojin00"];

export function isUnique(value) {
  return !usernameArr.includes(value);
}

export async function postJoinForm(data) {
  const res = await fetch(
    "https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/joinProc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return res.status;
}

export async function postLoginForm(data) {
  const res = await fetch(
    "https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/loginProc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return res.status;
}

export async function postTransaction(data) {
  const res = await fetch(
    "https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return res.status;
}

export async function getTransaction(id) {
  const res = await fetch(
    `https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/transactions/${id}`
  );
  const result = await res.json();
  return result;
}

export async function putTransaction(id, data) {
  const res = await fetch(
    `https://2a6fece9-32ad-4426-a0fb-d9ddbd129199.mock.pstmn.io/transactions/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return res.status;
}
