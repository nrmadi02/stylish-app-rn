import styled from "styled-components/native";
import SignUpForm from "./components/sign-up.form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import SignUpFooter from "./components/sign-up.footer";

export default function SignUpScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <SignUpContainer
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 100 })}
      >
        <SignUpTitle>Create an account</SignUpTitle>
        <SignUpForm />
        <SignUpFooter />
      </SignUpContainer>
    </ScrollView>
  );
}

const SignUpContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 20px;
  padding-top: 40px;
`;

const SignUpTitle = styled.Text`
  font-size: 36px;
  color: black;
  max-width: 185px;
  line-height: 43px;
  font-family: "Poppins-Bold";
`;
