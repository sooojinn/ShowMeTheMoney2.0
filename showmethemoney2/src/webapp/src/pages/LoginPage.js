import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postLoginForm } from "../api";
import SpinnerImg from "../images/Spinner_button.gif";
import NaverLogin from "../components/NaverLogin.js";
import GoogleLogin from "../components/GoogleLogin.js";
import { Button } from "../components/Button.style.js";
import {
  Form,
  TitleDiv,
  Title,
  InputDiv,
  Input,
  LinkMessage,
  PageLink,
  Spinner,
  Line,
  SocialLoginBtns,
  SocialLoginInfo,
} from "./JoinPage.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const status = await postLoginForm(data);
      if (status === 200) {
        navigate("/accountbook/calendar");
      } else {
        throw new Error("로그인에 실패했습니다.");
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
        </TitleDiv>
        <InputDiv>
          이메일
          <Input
            type="text"
            name="email"
            placeholder="이메일 입력하세요."
            autoComplete="off"
            {...register("email")}
          />
        </InputDiv>
        <InputDiv>
          비밀번호
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password")}
          />
        </InputDiv>
        <Button disabled={isSubmitting || isSubmitted} value="login">
          {isSubmitting || isSubmitted ? (
            <Spinner src={SpinnerImg} alt="로딩중..." />
          ) : (
            <p>로그인 하기</p>
          )}
        </Button>
      </form>
      <LinkMessage>
        아직 회원이 아니신가요?
        <PageLink to="/join">회원가입하기</PageLink>
      </LinkMessage>
      <Line>or</Line>
      <SocialLoginInfo>SNS로 간편 로그인</SocialLoginInfo>
      <SocialLoginBtns>
        <GoogleLogin></GoogleLogin>
        <NaverLogin></NaverLogin>
      </SocialLoginBtns>
    </Form>
  );
}
