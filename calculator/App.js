import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const App = () => {
  const [text, setText] = useState("");
  const [prev, setPrev] = useState("");
  const [result, setResult] = useState();
  const [mathOperator, setMathOperator] = useState("");
  const [history, setHistory] = useState([]);

  const checkResult = () => {
    try {
      let res = eval(text);
      if (res) {
        setResult(res);
        setPrev(text);
        setText(res);
      }
    } catch (error) {
      return;
    }
  };

  const handleClearAll = () => {
    setPrev("");
    setText("");
    setResult();
    setMathOperator("");
    setHistory([]);
  };

  const selectOperand = (operand) => {
    setText((state) => state + operand);
  };

  const selectAction = (action) => {
    setMathOperator(action);
    setText((state) => state + action);
  };

  useEffect(() => {
    setHistory((state) => [...state, { text: prev, result: result }]);
  }, [result]);

  return (
    <View style={styles.container}>
      <View style={{ borderWidth: 2, width: 200, height: 100 }}>
        <Text
          style={{
            padding: 10,
            fontSize: 20,
            color: "white",
            textAlign: "right",
          }}
        >
          {prev || " "}
        </Text>
        <Text
          style={{
            padding: 10,
            fontSize: 20,
            color: "white",
            textAlign: "right",
          }}
        >
          {text}
        </Text>
      </View>
      <View>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleClearAll} style={styles.button}>
            <Text>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAction("/")}
            style={styles.button}
          >
            <Text>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("7")}
          >
            <Text>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("8")}
          >
            <Text>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("9")}
          >
            <Text>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectAction("*")}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("4")}
          >
            <Text>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("5")}
          >
            <Text>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("6")}
          >
            <Text>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectAction("-")}
          >
            <Text>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("1")}
          >
            <Text>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("2")}
          >
            <Text>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectOperand("3")}
          >
            <Text>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectAction("+")}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.wideButton]}
            onPress={() => selectOperand("0")}
          >
            <Text>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={checkResult}>
            <Text>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 30,
    borderWidth: 2,
    color: "white",
    padding: 10,
  },
  row: { flexDirection: "row" },
  button: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  wideButton: {
    width: 100,
  },
});

export default App;
