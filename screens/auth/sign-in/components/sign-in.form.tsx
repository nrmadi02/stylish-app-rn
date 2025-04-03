import FloatingLabelInput from "@/components/floating-label.input";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TouchableOpacity } from "react-native";

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInRequest = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { control, handleSubmit } = useForm<SignInRequest>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInRequest) => {
    console.log(data);
  };

  return (
    <SignInFormContainer>
      <FormContainer>
        <FloatingLabelInput
          name="username"
          iconName="person"
          label="Username"
          control={control}
        />
        <FloatingLabelInput
          name="password"
          iconName="lock"
          secureTextEntry
          label="Password"
          control={control}
        />
      </FormContainer>
      <TouchableOpacity>
        <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
      </TouchableOpacity>
      <ButtonSignIn onPress={handleSubmit(onSubmit)}>
        <ButtonSignInText>Login</ButtonSignInText>
      </ButtonSignIn>
    </SignInFormContainer>
  );
}

const SignInFormContainer = styled.View`
  margin-top: 36px;
`;

const FormContainer = styled.View`
  gap: 10px;
`;

const ForgotPasswordText = styled.Text`
  color: #f83758;
  font-weight: 400;
  font-size: 12px;
  margin-top: 8px;
  text-align: right;
`;

const ButtonSignIn = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: #f83758;
  padding-block: 15px;
  border-radius: 4px;
  align-items: center;
`;

const ButtonSignInText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;
