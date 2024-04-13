import "./Join.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postJoinForm } from "../api";
import { isUnique } from "../api";
import Spinner from "../Spinner.gif";
import Loading from "./Loading.js";

function JoinForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({ mode: "onChange" });

  const [postSuccess, setPostSuccess] = useState(false);

  // useEffect(() => {
  //   if (
  //     watch("password") !== watch("passwordCheck") &&
  //     watch("passwordCheck")
  //   ) {
  //     setError("passwordCheck", {
  //       type: "password-mismatch",
  //       message: "비밀번호가 일치하지 않습니다",
  //     });
  //   } else {
  //     clearErrors("passwordCheck");
  //   }
  // }, [watch("password"), watch("passwordCheck")]);

  const onSubmit = async (data) => {
    try {
      const status = await postJoinForm(data);
      if (status === 200) {
        setPostSuccess(true);
      }
    } catch (error) {
      alert("회원가입 요청 중 에러가 발생했습니다.");
      window.location.reload();
      return;
    }
  };

  console.log("render");

  return (
    <>
      {!postSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form"
          name="joinForm"
        >
          <div className="title-div">
            <p className="title">회원가입</p>
            <p className="title-info">
              지금 가입하고 당신만의 가계부를 만들어보세요!
            </p>
          </div>
          <div className="username input-div">
            <label htmlFor="username" />
            아이디
            <input
              id="username"
              type="text"
              name="username"
              className={errors.username ? "err-input" : ""}
              placeholder="아이디를 입력하세요."
              autoComplete="off"
              {...register("username", {
                required: "아이디를 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z0-9]{5,20}$/,
                  message:
                    "아이디는 5~20자의 영문 대/소문자, 숫자만 사용 가능합니다.",
                },
                validate: {
                  isUnique: (value) =>
                    isUnique(value) || "이미 사용 중인 아이디입니다.",
                },
              })}
            />
            {errors.username && (
              <div className="err-message">{errors.username.message}</div>
            )}
          </div>
          <div className="password input-div">
            <label htmlFor="password" />
            비밀번호
            <input
              id="password"
              type="password"
              name="password"
              className={errors.password ? "err-input" : ""}
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
              <div className="err-message">{errors.password.message}</div>
            )}
          </div>
          <div className="password-check input-div">
            <label htmlFor="passwordCheck" />
            비밀번호 확인
            <input
              id="passwordCheck"
              type="password"
              name="passwordCheck"
              className={errors.passwordCheck ? "err-input" : ""}
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
              <div className="err-message">{errors.passwordCheck.message}</div>
            )}
          </div>
          <button
            disabled={!isValid || isSubmitting || isSubmitted}
            value="join"
          >
            {isSubmitting ? (
              <img src={Spinner} className="spinner" alt="로딩중..." />
            ) : (
              <p>가입하기</p>
            )}
          </button>
          <Link to="/login" className="link">
            로그인하기
          </Link>
        </form>
      )}
      {isSubmitted && postSuccess && <Loading />}
    </>
  );
}

export default JoinForm;
