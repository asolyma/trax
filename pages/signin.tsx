import { NextPage } from "next";
import AuthForm from "../components/AuthForm";
import { authMode, NextPageWithAuth } from "../lib/types";
const signin: NextPageWithAuth = () => {
  return <AuthForm mode={authMode.SIGNIN} />;
};
signin.auth = true;
export default signin;
