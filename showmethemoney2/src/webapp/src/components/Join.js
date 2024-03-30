import "./Join.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function JoinForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const usernameArr = ["aaa", "123", "soojin00"];

  const isUnique = (value) => {
    return !usernameArr.includes(value);
  };

  // const isUnique = (value) => {
  //   const res = await fetch("/join/username/duplication", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username: value }),
  //   });
  //   const result = await res.text();

  //   return result === 'true' ? false : true

  console.log("render");
  console.log(isSubmitting);

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

  const onSubmit = (data) => {
    const postData = async (data) => {
      try {
        const res = await fetch("/joinProc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const status = await res.status;
        if (status === 200) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("회원가입 요청 중 오류가 발생했습니다.");
      }
    };
    postData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} name="joinForm">
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
            <div className="err message">{errors.username.message}</div>
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
            <div className="err message">{errors.password.message}</div>
          )}
        </div>
        <div className="password-check input-div">
          <label htmlFor="passwordCheck" />
          비밀번호 확인
          <input
            id="passwordCheck"
            type="password"
            name="passwordcheck"
            className={errors.passwordCheck ? "err-input" : ""}
            placeholder="비밀번호를 입력하세요."
            {...register("passwordCheck", {
              required: "비밀번호를 입력하세요.",
              validate: {
                matchPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "비밀번호가 일치하지 않습니다.";
                },
              },
            })}
          />
          {errors.passwordCheck && (
            <div className="err message">{errors.passwordCheck.message}</div>
          )}
        </div>
        <button
          disabled={!isValid || isSubmitting || isSubmitted}
          className="submit-btn"
          value="join"
        >
          가입하기
        </button>
        <Link to="/login" className="login-link">
          로그인하기
        </Link>
      </form>
    </>
  );
}

export default JoinForm;
