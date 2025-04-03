import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  Animated,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styled from "styled-components/native";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface FloatingLabelInputProps<T extends FieldValues>
  extends TextInputProps {
  label: string;
  iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
  name: Path<T>;
  control?: Control<T>;
}

const FloatingLabelInput = <T extends FieldValues>({
  label,
  iconName,
  control,
  name,
  secureTextEntry,
  ...props
}: FloatingLabelInputProps<T>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const [visible, setVisible] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<any>(null);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
  const errorAnimation = useRef(new Animated.Value(error ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    Animated.timing(errorAnimation, {
      toValue: error ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [error]);

  const labelStyle: Animated.AnimatedProps<TextStyle> = {
    position: "absolute",
    fontFamily: "Poppins-Regular",
    left: iconName ? 43 : 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#676767", "#000"],
    }),
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 4,
    zIndex: 10,
  };

  return (
    <InputContainer>
      {error && (
        <AnimatedErrorText style={{ opacity: errorAnimation }}>
          {error.message}
        </AnimatedErrorText>
      )}
      <FieldContainer>
        {iconName && <InputIcon name={iconName} size={24} />}
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
        </TouchableWithoutFeedback>
        <ForwardedInput
          {...props}
          value={value}
          onChangeText={onChange}
          ref={inputRef}
          secureTextEntry={visible}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          blurOnSubmit
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}
            style={{ padding: 2 }}
          >
            <InputIcon
              name={visible ? "visibility-off" : "visibility"}
              size={24}
            />
          </TouchableOpacity>
        )}
      </FieldContainer>
    </InputContainer>
  );
};

const FieldContainer = styled.View`
  position: relative;
  padding-inline: 12px;
  padding-top: 8px;
  padding-bottom: 6px;
  border-radius: 10px;
  background-color: #f3f3f3;
  border: 1px solid #a8a8a9;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  font-family: 'Poppins-Regular';
`;

const ForwardedInput = React.forwardRef<TextInput, TextInputProps>(
  (props, ref) => {
    return <StyledTextInput {...props} ref={ref} />;
  }
);

const InputIcon = styled(MaterialIcons)`
  color: #626262;
`;

const InputContainer = styled.View`
  padding-top: 20px;
  position: relative;
`;

const AnimatedErrorText = styled(Animated.Text)`
  color: #f83758;
  font-weight: 400;
  font-size: 12px;
  text-align: right;
  position: absolute;
  right: 8px;
  top: 2px;
  font-family: "Poppins-Regular";
`;

export default FloatingLabelInput;
