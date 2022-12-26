import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const windowSize = Dimensions.get("window");
const buttonSize = windowSize.width * 0.24;
interface Prop {
  backgroundColor: {};
  textColor: {};
  text: string;
  buttonPressed: (val: string) => void;
}
function CalculatorButton(props: Prop) {
  return (
    <TouchableOpacity
      style={[props.backgroundColor, styles.calculatorButton]}
      onPress={() => props.buttonPressed(props.text)}
    >
      <Text style={props.textColor}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  calculatorButton: {
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    width: buttonSize,
    height: buttonSize,
    fontSize: 1,
  },
});
export default CalculatorButton;
