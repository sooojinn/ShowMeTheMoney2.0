const baseUrl = "http://localhost:8080";

export async function postJoinForm(data) {
  const res = await fetch(baseUrl + "/joinProc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }

  return res;
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

  if (res.status === 401) {
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } else if (!res.ok) {
    throw new Error("로그인에 실패했습니다.");
  }

  return res;
}

export async function postLogout() {
  const res = await fetch(baseUrl + "/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("로그아웃에 실패했습니다.");
  }

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

  if (!res.ok) {
    throw new Error("내역을 저장하는 중 에러가 발생했습니다.");
  }

  return res;
}

export async function getTransaction(id) {
  const res = await fetch(baseUrl + `/transactions/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("데이터를 가져오는 중 에러가 발생했습니다.");
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
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("내역을 수정하는 중 에러가 발생했습니다.");
  }

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
      // "X-CSRF-TOKEN": csrfToken, // CSRF 토큰 포함
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("내역을 삭제하는 중 에러가 발생했습니다.");
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

  if (!res.ok) {
    throw new Error("예산을 저장하는 중 에러가 발생했습니다.");
  }

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

  if (!res.ok) {
    throw new Error("예산을 수정하는 중 에러가 발생했습니다.");
  }

  return res;
}

export async function getBudget(year, month) {
  const res = await fetch(baseUrl + `/budget?year=${year}&month=${month}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 204) {
    return null; // No Content 상태 처리
  }

  const text = await res.text();

  if (!text) {
    return null;
  }

  const result = JSON.parse(text);

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
