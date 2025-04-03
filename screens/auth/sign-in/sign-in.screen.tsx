import styled from "styled-components/native";
import SignInForm from "./components/sign-in.form";

export default function SignInScreen() {
  return (
    <SignInContainer>
      <SignInTitle>Welcome Back!</SignInTitle>
      <SignInForm />
    </SignInContainer>
  );
}

const SignInContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const SignInTitle = styled.Text`
  font-weight: bold;
  font-size: 36px;
  color: black;
  max-width: 185px;
  line-height: 43px;
`;
