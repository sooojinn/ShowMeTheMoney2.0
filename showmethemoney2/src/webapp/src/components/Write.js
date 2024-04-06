import { useRef, useState } from "react";
import "./Write.css";
import { useForm } from "react-hook-form";

export default function Write() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data["money"] = removeComma(money);
    console.log(data);
  };

  const [division, setDivision] = useState("expense");
  const [money, setMoney] = useState("0");

  const handleDivisionClick = (e) => {
    setDivision(e.target.value);
  };

  const handleMoney = (e) => {
    let validMoneyValue = e.target.value.replace(/[^0-9]/g, "");
    if (validMoneyValue.length > 0 && validMoneyValue[0] === "0") {
      validMoneyValue = validMoneyValue.slice(1);
    }
    setMoney(validMoneyValue);
  };

  const addComma = (money) => {
    return money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeComma = (money) => {
    return money.replaceAll(",", "");
  };

  const handleMoneyBlur = () => {
    setMoney(addComma(money));
  };

  const handleMoneyFocusIn = () => {
    setMoney(removeComma(money));
  };

  console.log("render");

  return (
    <form className="write-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        분류
        <div id="division">
          <label
            htmlFor="expense"
            className={division === "expense" ? "checked-division" : ""}
          >
            <input
              type="radio"
              name="division"
              value="expense"
              id="expense"
              defaultChecked
              onClick={handleDivisionClick}
              {...register("division")}
            />
            지출
          </label>
          <label
            htmlFor="income"
            className={division === "income" ? "checked-division" : ""}
          >
            <input
              type="radio"
              name="division"
              value="income"
              id="income"
              onClick={handleDivisionClick}
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
      <button type="submit">저장</button>
    </form>
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
