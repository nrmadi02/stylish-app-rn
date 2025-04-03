import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function SignInFooter() {
  return (
    <SignInFooterContainer>
      <HelpText>- OR Continue with -</HelpText>
      <SocialLoginContainer>
        <SocialButtonIcon>
          <SocialImage source={require("@/assets/icons/google.png")} />
        </SocialButtonIcon>
        <SocialButtonIcon>
          <SocialImage source={require("@/assets/icons/apple.png")} />
        </SocialButtonIcon>
        <SocialButtonIcon>
          <SocialImage source={require("@/assets/icons/fb.png")} />
        </SocialButtonIcon>
      </SocialLoginContainer>
      <SignUpText>
        <SignUpTextHelper>Create an account? </SignUpTextHelper>
        <TouchableOpacity>
          <SignUpLink>Sign Up</SignUpLink>
        </TouchableOpacity>
      </SignUpText>
    </SignInFooterContainer>
  );
}

const SignInFooterContainer = styled.View`
  margin-top: 70px;
`;

const HelpText = styled.Text`
  text-align: center;
  color: #575757;
  font-size: 12px;
  font-family: "Poppins-Medium";
`;

const SocialLoginContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
`;

const SocialButtonIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid #f83758;
  background-color: #fcf3f6;
`;

const SocialImage = styled.Image`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const SignUpText = styled.View`
  margin-top: 24px;
  text-align: center; 
  flex-direction: row;
  justify-content: center;
  display: flex;
`;

const SignUpTextHelper = styled.Text`
  color: #575757;
  font-family: "Poppins-Regular";
  font-size: 14px;
`;

const SignUpLink = styled.Text`
  color: #f83758;
  text-decoration: underline;
  font-family: "Poppins-Regular";
  font-size: 14px;
`;