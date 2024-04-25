import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postLoginForm } from "../api";
import SpinnerImg from "../Spinner_button.gif";
import NaverLogin from "./NaverLogin.js";
import GoogleLogin from "./GoogleLogin.js";
import { Button } from "./Button.style.js";
import {
  Form,
  TitleDiv,
  Title,
  TitleInfo,
  InputDiv,
  Input,
  MovePage,
  Spinner,
  Line,
  SocialLoginBtns,
  SocialLoginInfo,
} from "./Join.js";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const status = await postLoginForm(data);
      if (status === 200) {
        navigate("/accountbook/calendar");
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
    <Form>
      <form onSubmit={handleSubmit(onSubmit)} name="loginForm">
        <TitleDiv>
          <Title>로그인</Title>
          <TitleInfo>서비스 이용을 위해 로그인이 필요합니다.</TitleInfo>
        </TitleDiv>
        <InputDiv>
          아이디
          <Input
            type="text"
            name="username"
            placeholder="아이디를 입력하세요."
            autoComplete="off"
          />
        </InputDiv>
        <InputDiv>
          비밀번호
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
          />
        </InputDiv>
        <Button disabled={isSubmitting || isSubmitted} value="login">
          {isSubmitting || isSubmitted ? (
            <Spinner src={SpinnerImg} alt="로딩중..." />
          ) : (
            <p>로그인하기</p>
          )}
        </Button>
      </form>
      <MovePage to="/join">회원가입하기</MovePage>
      <Line>or</Line>
      <SocialLoginInfo>SNS로 로그인</SocialLoginInfo>
      <SocialLoginBtns>
        <GoogleLogin></GoogleLogin>
        <NaverLogin></NaverLogin>
      </SocialLoginBtns>
    </Form>
  );
}
