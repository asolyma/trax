import { NextPage } from "next";
import AuthForm from "../components/AuthForm";
import { authMode, NextPageWithAuth } from "../lib/types";
const signup: NextPageWithAuth = () => {
  return <AuthForm mode={authMode.SIGNUP} />;
};
signup.auth = true;
export default signup;
