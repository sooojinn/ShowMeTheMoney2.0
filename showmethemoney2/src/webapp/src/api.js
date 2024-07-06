const baseUrl = "http://localhost:8080";

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

export async function getTransactions(year, month) {
  const res = await fetch(
    baseUrl + `/transactions?year=${year}&month=${month}`,
    { method: "GET", credentials: "include" } // 쿠키를 포함시키기 위해 설정
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = (await res.json()) ?? [];

  return data.map((d) => {
    const translatedCategory = categoryList[d.category];
    return {
      ...d,
      category: translatedCategory,
    };
  });
}

export async function isUnique(value) {
  const res = await fetch(baseUrl + "/join/username/duplication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: value }),
  });
  const result = await res.text();

  return result === "false" ? false : true;
}

export async function postJoinForm(data) {
  const res = await fetch(baseUrl + "/joinProc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.status;
}

export async function postLoginForm(data) {
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  console.log(data);
  console.log(formData.toString());
  const res = await fetch(baseUrl + "/loginProc", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: formData,
  });
  return res.status;
}

export async function postTransaction(data) {
  const res = await fetch(baseUrl + "/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 쿠키를 포함시키기 위해 설정
    body: JSON.stringify(data),
  });
  return res.status;
}

export async function getTransaction(id) {
  const res = await fetch(baseUrl + `/transactions/${id}`, {
    credentials: "include",
  }); // 쿠키를 포함시키기 위해 설정

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await res.json();
  return result;
}

export async function putTransaction(id, data) {
  const res = await fetch(baseUrl + `/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 쿠키를 포함시키기 위해 설정
    body: JSON.stringify(data),
  });
  return res.status;
}

export async function deleteTransaction(id) {
  const res = await fetch(
    baseUrl + `/transactions/${id}`,
    {
      method: "DELETE",
    },
    { credentials: "include" }
  );
  return res.status;
}

export async function getMonthlyTotal(year, month) {
  const res = await fetch(
    baseUrl + `/statics/total?year=${year}&month=${month}`
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await res.json();
  return result;
}

export async function postBudget(data) {
  const res = await fetch(baseUrl + `/budget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.status;
}

export async function getBudget(year, month) {
  const res = await fetch(baseUrl + `/budget?year=${year}&month=${month}`);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await res.json();
  return result;
}

export async function getCategoryTotal(year, month) {
  const res = await fetch(
    baseUrl + `/statics/category?year=${year}&month=${month}`
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  const expenseCategory = data["expense"];
  const incomeCategory = data["income"];

  for (const key in expenseCategory) {
    expenseCategory[categoryList[key]] = expenseCategory[key];
    delete expenseCategory[key];
  }
  for (const key in incomeCategory) {
    incomeCategory[categoryList[key]] = incomeCategory[key];
    delete incomeCategory[key];
  }

  const translatedData = {
    expense: expenseCategory,
    income: incomeCategory,
  };

  for (const key in translatedData) {
    translatedData[key] = Object.fromEntries(
      Object.entries(translatedData[key]).sort(([, a], [, b]) =>
        +a > +b ? -1 : 1
      )
    );
  }

  return translatedData;
}
