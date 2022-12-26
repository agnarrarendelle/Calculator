import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from "react-native";
import { useState } from "react";
import React from "react";
import CalculatorButton from "./component/CalculatorButton";

const buttonTextAndColor = [
  [
    ["AC", "black", "grey"],
    ["+/-", "black", "grey"],
    ["%", "black", "grey"],
    ["/", "white", "#6661f3"],
  ],
  [
    ["7", "white", "#403d3d"],
    ["8", "white", "#403d3d"],
    ["9", "white", "#403d3d"],
    ["x", "white", "#6661f3"],
  ],
  [
    ["4", "white", "#403d3d"],
    ["5", "white", "#403d3d"],
    ["6", "white", "#403d3d"],
    ["-", "white", "#6661f3"],
  ],
  [
    ["1", "white", "#403d3d"],
    ["2", "white", "#403d3d"],
    ["3", "white", "#403d3d"],
    ["+", "white", "#6661f3"],
  ],
  [
    ["0", "white", "#403d3d"],
    [".", "white", "#403d3d"],
    ["log", "white", "#6661f3"],
    ["=", "white", "#6661f3"],
  ],
];
const operators = new Set(["+", "-", "x", "/"]);
export default function App() {
  const [answerValue, setAnswerValue] = useState("0");
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState("0");

  const buttonPressed = (val) => {
    if (val === "AC") {
      clear();
    }

    if (val === "0" || Number(val)) {
      setAnswerValue(handleNumber(val));
    }

    if (operators.has(val)) {
      const memoryValue =
        operatorValue === "0" ? Number(answerValue) : calculateEquals();

      setMemoryValue(memoryValue!);
      setReadyToReplace(true);
      setOperatorValue(val);
    }

    if (val === "=" && answerValue != "0") {
      const res = calculateEquals();
      setAnswerValue(String(res));
      setMemoryValue(0);
      setReadyToReplace(true);
    }

    if (answerValue !== "0") {
      switch (val) {
        case "+/-":
          setAnswerValue((prev) => `-${prev}`);
          break;
        case "%":
          setAnswerValue((prev) => `${Number(prev) * 0.01}`);
          break;
        case "log":
          setAnswerValue((prev) => `${Math.sqrt(Number(prev))}`);
          break;
      }
    }
  };

  const handleNumber = (val) => {
    if (readyToReplace) {
      setReadyToReplace(false);
      return val;
    } else {
      return answerValue === "0" ? val : `${answerValue}${val}`;
    }
  };

  const calculateEquals = () => {
    const prev = memoryValue;
    const curr = parseFloat(answerValue);
    let result;

    switch (operatorValue) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "x":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
    }

    setAnswerValue(String(result));
    return result;
  };

  const clear = () => {
    setAnswerValue("0");
    setMemoryValue(0);
    setOperatorValue("0");
    setReadyToReplace(true);
  };

  

  const getButtonRows = (nthRow) => {
    const buttonRow = buttonTextAndColor[nthRow];
    const buttons = buttonRow.map((b) => {
      return (
        <CalculatorButton
          key={b[0]}
          text={b[0]}
          backgroundColor={{ backgroundColor: b[2] }}
          textColor={{ color: b[1] }}
          buttonPressed={buttonPressed}
        ></CalculatorButton>
      );
    });
    return buttons;
  };

  const getButtons = () => {
    const rows = buttonTextAndColor.map((_, i) => {
      return <View style={styles.row}>{getButtonRows(i)}</View>;
    });

    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.resultText}>{answerValue}</Text>
        {getButtons()}
      </View>
      <StatusBar style="light"></StatusBar>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    alignContent: "flex-end",
  },

  calcullationValueText: {
    color: "#a19c9c",
    fontSize: 30,
    textAlign: "right",
  },
  resultText: {
    color: "white",
    fontSize: 60,
    textAlign: "right",
  },
});
