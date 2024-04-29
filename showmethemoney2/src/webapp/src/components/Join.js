import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postJoinForm } from "../api";
import { isUnique } from "../api";
import SpinnerImg from "../images/Spinner_button.gif";
import Loading from "./Loading.js";
import styled, { css, keyframes } from "styled-components";
import NaverLogin from "./NaverLogin.js";
import GoogleLogin from "./GoogleLogin.js";
import { Button } from "./Button.style.js";

export default function JoinForm() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({ mode: "onChange" });

  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    if (
      watch("password") !== watch("passwordCheck") &&
      watch("passwordCheck")
    ) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      clearErrors("passwordCheck");
    }
  }, [watch("password"), watch("passwordCheck")]);

  const onSubmit = async (data) => {
    try {
      const status = await postJoinForm(data);
      if (status === 200) {
        setPostSuccess(true);
      } else {
        throw new Error("에러가 발생했습니다.");
      }
    } catch (error) {
      alert(error.message);
      window.location.reload();
      return;
    }
  };

  return (
    <>
      {!postSuccess && (
        <Form>
          <form onSubmit={handleSubmit(onSubmit)} name="joinForm">
            <TitleDiv>
              <Title>회원가입</Title>
            </TitleDiv>
            <InputDiv>
              이메일
              <Input
                type="text"
                name="email"
                error={errors.email}
                placeholder="이메일을 입력하세요."
                autoComplete="off"
                {...register("email", {
                  required: "이메일을 입력하세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                  validate: {
                    isUnique: (value) =>
                      isUnique(value) || "이미 가입된 이메일입니다.",
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </InputDiv>
            <InputDiv>
              비밀번호
              <Input
                type="password"
                name="password"
                error={errors.password}
                placeholder="비밀번호를 입력하세요."
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                    message:
                      "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 모두 포함해야합니다.",
                  },
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </InputDiv>
            <InputDiv>
              비밀번호 확인
              <Input
                type="password"
                name="passwordCheck"
                error={errors.passwordCheck}
                placeholder="비밀번호를 입력하세요."
                {...register("passwordCheck", {
                  required: "비밀번호를 입력하세요.",
                  validate: {
                    matchPassword: (value) => {
                      const { password } = getValues();
                      return (
                        password === value || "비밀번호가 일치하지 않습니다."
                      );
                    },
                  },
                })}
              />
              {errors.passwordCheck && (
                <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
              )}
            </InputDiv>
            <Button
              disabled={!isValid || isSubmitting || isSubmitted}
              value="join"
            >
              {isSubmitting ? (
                <Spinner src={SpinnerImg} alt="로딩중..." />
              ) : (
                <p>가입하기</p>
              )}
            </Button>
          </form>
          <LinkMessage>
            이미 회원이신가요?
            <PageLink to="/login">로그인하기</PageLink>
          </LinkMessage>
          <Line>or</Line>
          <SocialLoginInfo>SNS로 시작하기</SocialLoginInfo>
          <SocialLoginBtns>
            <GoogleLogin></GoogleLogin>
            <NaverLogin></NaverLogin>
          </SocialLoginBtns>
        </Form>
      )}
      {isSubmitted && postSuccess && <Loading />}
    </>
  );
}

export const Form = styled.div`
  width: 350px;
  margin: 70px auto 0;
  font-family: "Pretendard-Regular";
  font-size: 16px;
`;

export const TitleDiv = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

export const InputDiv = styled.div`
  margin: 10px 0 20px;
`;

export const Vibration = keyframes`
  from {
    transform: rotate(1deg);
  }
  to {
    transform: rotate(-1deg);
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: 1px solid #d7d7d7;
  border-width: 0 0 1px;
  font-size: 15px;

  &::placeholder {
    color: #cbcbcb;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.error
      ? css`
          border: 1.5px solid #ff3f3f;
          border-width: 0 0 1px;
          animation: ${Vibration} 0.1s;
        `
      : ""}
`;

export const ErrorMessage = styled.div`
  color: #ff3f3f;
  font-size: 14px;
  margin-top: 5px;
`;

export const LinkMessage = styled.span`
  display: block;
  width: 100%;
  margin: 20px auto;
  text-align: center;
  color: #1e1e1e;
  font-size: 14px;
`;

export const PageLink = styled(Link)`
  margin-left: 10px;
  color: #1e1e1e;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Spinner = styled.img`
  width: 20px;
`;

export const Line = styled.p`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 18px;
  font-size: 16px;

  &::before,
  &:after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 5px;
  }
`;

export const SocialLoginInfo = styled.p`
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  font-size: 15px;
  margin: 15px 0;
`;

export const SocialLoginBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const SocialLoginBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-size: cover;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;
