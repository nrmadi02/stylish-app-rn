import styled from "styled-components/native";
import SignInForm from "./components/sign-in.form";
import SignInFooter from "./components/sign-in.footer";

export default function SignInScreen() {
  return (
    <SignInContainer>
      <SignInTitle>Welcome Back!</SignInTitle>
      <SignInForm />
      <SignInFooter />
    </SignInContainer>
  );
}

const SignInContainer = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 40px;
`;

const SignInTitle = styled.Text`
  font-size: 36px;
  color: black;
  max-width: 185px;
  line-height: 43px;
  font-family: 'Poppins-Bold';
`;
