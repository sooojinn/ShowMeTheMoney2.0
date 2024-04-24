import { SocialLoginBtn } from "./Join";
import googleIcon from "../icon_google.png";

export default function GoogleLogin() {
  const Google_Client_Id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const Google_Redirect_Uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const loginGoogle = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Google_Client_Id}&redirect_uri=${Google_Redirect_Uri}&response_type=code&scope=email profile`;
  };
  return (
    <SocialLoginBtn image={googleIcon} onClick={loginGoogle}></SocialLoginBtn>
  );
}
