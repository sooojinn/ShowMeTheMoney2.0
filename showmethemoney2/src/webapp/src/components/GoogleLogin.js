import { SocialLoginBtn } from "./Join";
import googleIcon from "../images/icon_google.png";

export default function GoogleLogin() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const loginGoogle = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email`;
  };
  return (
    <SocialLoginBtn image={googleIcon} onClick={loginGoogle}></SocialLoginBtn>
  );
}
