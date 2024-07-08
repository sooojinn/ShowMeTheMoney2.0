import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Button } from "./Button.style";

export default function WriteForm({ request, defaultValues }) {
  const defaultDate = (dateString) => {
    let [year, month, date] = dateString.split("-");
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
        const res = await request(defaultValues.id, data);
        if (res.ok) {
          navigate("/accountbook/calendar");
        } else {
          throw new Error("에러가 발생했습니다.");
        }
      } catch (error) {
        alert(error.message);
        // window.location.reload();
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

  return (
    <>
      <XBtn onClick={handleUturnClick}>✕</XBtn>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          분류
          <Division>
            <label
              htmlFor="expense"
              className={division === "expense" ? "selected" : ""}
            >
              <input
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
              className={division === "income" ? "selected" : ""}
            >
              <input
                type="radio"
                name="division"
                value="income"
                id="income"
                {...register("division")}
              />
              수입
            </label>
          </Division>
        </InputGroup>
        <InputGroup>
          금액
          <MoneyDiv>
            <Input
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
          </MoneyDiv>
        </InputGroup>
        <InputGroup>
          날짜
          <Input id="date" type="date" name="date" {...register("date")} />
        </InputGroup>
        <InputGroup>
          카테고리
          <Select id="category" name="category" {...register("category")}>
            {division === "expense" ? <ExpenseCategory /> : <IncomeCategory />}
          </Select>
        </InputGroup>
        <InputGroup>
          내용
          <Input
            id="memo"
            name="memo"
            autoComplete="off"
            placeholder="20자 이내로 입력하세요."
            maxLength="20"
            {...register("memo")}
          />
        </InputGroup>
        <Button type="submit" disabled={isSubmitting}>
          저장
        </Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  width: 350px;
  margin: 30px auto 20px;
`;

const XBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const InputGroup = styled.div`
  margin: 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: 250px;
    height: 50px;
    font-size: 0.95rem;
  }
`;

const Division = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;

  & > label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 40px;
    border: 1.5px solid var(--maincolor);
    cursor: pointer;
  }

  & input {
    display: none;
  }

  & .selected {
    background-color: var(--maincolor);
  }
`;

const defaultCss = css`
  height: 30px;
  padding: 3px;
  font-family: inherit;
  border: 2px solid var(--maincolor);
  border-width: 0 0 2px;
  background-color: transparent;
  outline: none;
`;

const Input = styled.input`
  ${defaultCss}
  ${(props) =>
    props.name === "money" &&
    css`
      flex-shrink: 1;
      width: 100%;
      font-size: 1.3rem;
    `}
`;

const Select = styled.select`
  ${defaultCss}
  &:focus {
    outline: none;
  }
`;

const MoneyDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`;

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
