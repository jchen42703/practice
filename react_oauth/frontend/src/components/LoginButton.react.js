import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import config from "../utils/config";
// refresh token
// import { refreshTokenSetup } from "../utils/refreshToken";
require("dotenv").config();

console.log(`REACT_APP_AUTH_SECRET: ${process.env.REACT_APP_AUTH_SECRET}`);
function LoginButton() {
  const onSuccess = async (res) => {
    // console.log("Login Success: currentUser:", res.profileObj);
    // console.log(`tokenId: ${res.tokenId}`);
    // console.log(`accessToken: ${res.accessToken}`);
    // console.log(`tokenObj: `, res.tokenObj);

    try {
      console.log("POST from Client");
      const data = await axios.post(
        `${config.serverUrl}/auth/verifyToken`,
        {
          tokenId: res.tokenId,
        },
        {
          headers: {
            "authorization-key": process.env.REACT_APP_AUTH_SECRET,
          },
        }
      );
      console.log("Data: ", data);
    } catch (error) {
      console.log(error);
    }
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginButton;
