import FloatingLabelInput from "@/components/floating-label.input";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "react-native";

const SignUpSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpRequest) => {
    console.log(data);
  };

  return (
    <SignUpFormContainer>
      <FormContainer>
        <FloatingLabelInput
          name="username"
          iconName="person"
          label="Username"
          control={control}
        />
        <FloatingLabelInput
          name="email"
          iconName="email"
          label="Email"
          control={control}
        />
        <FloatingLabelInput
          name="password"
          iconName="lock"
          secureTextEntry
          label="Password"
          control={control}
        />
        <FloatingLabelInput
          name="confirmPassword"
          iconName="lock"
          secureTextEntry
          label="Confirm Password"
          control={control}
        />
      </FormContainer>
      <Text style={{ marginTop: 14 }}>
        <AggrementText>By clicking the</AggrementText>
        <AggrementText style={{ color: "#f83758" }}> Create Account </AggrementText>
        <AggrementText>button, you agree to the public offer</AggrementText>
      </Text>
      <ButtonSignUp onPress={handleSubmit(onSubmit)}>
        <ButtonSignUpText>Create Account</ButtonSignUpText>
      </ButtonSignUp>
    </SignUpFormContainer>
  );
}

const SignUpFormContainer = styled.View`
  margin-top: 36px;
`;

const FormContainer = styled.View`
  gap: 10px;
`;

const ButtonSignUp = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: #f83758;
  padding-block: 15px;
  border-radius: 4px;
  align-items: center;
`;

const ButtonSignUpText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
  font-family: "Poppins-SemiBold";
`;

const AggrementText = styled.Text`
  color: #676767;
  font-size: 12px;
  font-family: "Poppins-Regular";
`;
