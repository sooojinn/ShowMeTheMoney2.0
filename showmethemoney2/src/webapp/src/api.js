const baseUrl = "http://localhost:8080";

export async function postLogout() {
  const res = await fetch(baseUrl + "/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
  });

  return res;
}

export async function getTransactions(year, month) {
  const res = await fetch(
    baseUrl + `/transactions?year=${year}&month=${month}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();

  return data;
}

export async function isUnique(value) {
  const res = await fetch(baseUrl + "/join/username/duplication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: value }),
    credentials: "include",
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
    credentials: "include",
  });
  return res.status;
}

export async function postLoginForm(data) {
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }

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

export async function postTransaction(id, data) {
  // data가 두 번째 인수로 전달되기 때문에 id 삭제하지 말 것
  const res = await fetch(baseUrl + "/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res;
}

export async function getTransaction(id) {
  const res = await fetch(baseUrl + `/transactions/${id}`, {
    credentials: "include",
  });
  const result = await res.json();
  return result;
}

export async function putTransaction(id, data) {
  const res = await fetch(baseUrl + `/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res;
}

async function getCsrfToken() {
  const res = await fetch(baseUrl + "/csrf", {
    credentials: "include",
  });
  const data = await res.json();
  return data.token;
}

export async function deleteTransaction(id) {
  const csrfToken = await getCsrfToken();

  const res = await fetch(baseUrl + `/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken, // CSRF 토큰 포함
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete transaction");
  }

  return res;
}

export async function getMonthlyTotal(year, month) {
  const res = await fetch(
    baseUrl + `/statics/total?year=${year}&month=${month}`,
    {
      credentials: "include",
    }
  );
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
    credentials: "include",
  });

  return res;
}

export async function putBudget(data) {
  const res = await fetch(baseUrl + `/budget`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res;
}

export async function getBudget(year, month) {
  const res = await fetch(baseUrl + `/budget?year=${year}&month=${month}`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return result;
}

export async function getCategoryTotal(year, month) {
  const res = await fetch(
    baseUrl + `/statics/category?year=${year}&month=${month}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await res.json();

  return data;
}
