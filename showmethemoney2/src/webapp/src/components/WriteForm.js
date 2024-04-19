import { useState } from "react";
import "./WriteForm.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DivisionInput = styled.input`
  display: none;
`;

export default function WriteForm({ request, defaultValues }) {
  const defaultDate = (dateString) => {
    const [year, month, date] = dateString.split("-");
    const offset = new Date(year, month - 1, date).getTimezoneOffset() * 60000;
    const dateOffset = new Date(
      new Date(year, month - 1, date).getTime() - offset
    );
    return dateOffset.toISOString().slice(0, 10);
  };
  const addComma = (money) => {
    return money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeComma = (money) => {
    return money.replaceAll(",", "");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      division: defaultValues.division,
      date: defaultDate(defaultValues.date),
      category: defaultValues.category,
      memo: defaultValues.memo,
    },
  });

  const defaultMoney = addComma(defaultValues.money);
  const [money, setMoney] = useState(defaultMoney);
  const division = watch("division");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data["money"] = removeComma(money);
    if (!+data.money) alert("금액을 입력해주세요.");
    else if (!data.date) alert("날짜를 선택해주세요.");
    else if (!data.category) alert("카테고리를 선택해주세요.");
    else {
      try {
        const status = await request(defaultValues.id, data);
        if (status === 200) {
          navigate("/accountbook/calendar");
          console.log(data);
        } else {
          throw new Error("에러가 발생했습니다.");
        }
      } catch (error) {
        alert(error.message);
        window.location.reload();
        return;
      }
    }
  };

  const handleMoney = (e) => {
    let validMoneyValue = e.target.value.replace(/[^0-9]/g, "");
    if (validMoneyValue.length > 0 && validMoneyValue[0] === "0") {
      validMoneyValue = validMoneyValue.slice(1);
    }
    setMoney(validMoneyValue);
  };

  const handleMoneyBlur = () => {
    setMoney(addComma(money));
  };

  const handleMoneyFocusIn = () => {
    setMoney(removeComma(money));
  };

  const handleUturnClick = () => {
    navigate(-1);
  };

  console.log("render");

  return (
    <>
      <div className="uturn-btn" onClick={handleUturnClick}>
        ✕
      </div>
      <form className="write-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          분류
          <div id="division">
            <label
              htmlFor="expense"
              className={division === "expense" ? "checked-division" : ""}
            >
              <DivisionInput
                type="radio"
                name="division"
                value="expense"
                id="expense"
                {...register("division")}
              />
              지출
            </label>
            <label
              htmlFor="income"
              className={division === "income" ? "checked-division" : ""}
            >
              <DivisionInput
                type="radio"
                name="division"
                value="income"
                id="income"
                {...register("division")}
              />
              수입
            </label>
          </div>
        </div>
        <div className="input-group">
          금액
          <div className="money-div">
            <input
              id="money"
              type="text"
              name="money"
              autoComplete="off"
              onChange={handleMoney}
              onBlur={handleMoneyBlur}
              onFocus={handleMoneyFocusIn}
              value={money}
            />
            <p>원</p>
          </div>
        </div>
        <div className="input-group">
          날짜
          <input id="date" type="date" name="date" {...register("date")} />
        </div>
        <div className="input-group">
          카테고리
          <select id="category" name="category" {...register("category")}>
            {division === "expense" ? <ExpenseCategory /> : <IncomeCategory />}
          </select>
        </div>
        <div className="input-group">
          내용
          <input
            id="memo"
            name="memo"
            autoComplete="off"
            placeholder="내용을 입력하세요."
            {...register("memo")}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          저장
        </button>
      </form>
    </>
  );
}

function ExpenseCategory() {
  return (
    <>
      <option value="" hidden>
        선택하세요.
      </option>
      <option value="food">식비</option>
      <option value="cafe">카페</option>
      <option value="mart">마트/생필품</option>
      <option value="culture">문화생활</option>
      <option value="medical">의료비</option>
      <option value="dues">공과금</option>
      <option value="transportation">교통비</option>
      <option value="communication">통신비</option>
      <option value="subscription">구독료</option>
      <option value="hobby">취미</option>
      <option value="shopping">쇼핑</option>
      <option value="beauty">미용</option>
      <option value="gift">경조사/선물</option>
      <option value="travel">여행</option>
      <option value="etc">기타</option>
    </>
  );
}

function IncomeCategory() {
  return (
    <>
      <option value="" hidden>
        선택하세요.
      </option>
      <option value="salary">급여</option>
      <option value="additional">부수입</option>
      <option value="allowance">용돈</option>
      <option value="etc">기타</option>
    </>
  );
}
