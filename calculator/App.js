import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import { History } from "./history";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "./MyButton";
const App = () => {
  const [text, setText] = useState("");
  const [prev, setPrev] = useState("");
  const [result, setResult] = useState("");
  const [mathOperator, setMathOperator] = useState();
  const [history, setHistory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [showHis, setShowHis] = useState(false);

  const checkResult = () => {
    try {
      let res = eval(text);
      if (res != undefined) {
        setResult(res);
        setPrev(text);
        setText(res.toString());
        setMathOperator("");
      }
    } catch (error) {
      return;
    }
  };

  const handleClearAll = () => {
    setPrev("");
    setText("");
    setResult();
    setMathOperator();
    setHistory([]);
    setFilteredData([]);
    AsyncStorage.setItem("history", "");
  };

  const handleClear = () => {
    setPrev("");
    setText("");
    setResult();
    setMathOperator("");
  };

  const selectOperand = (operand) => {
    if (mathOperator) {
      if (text[text.indexOf(mathOperator) + 1] != "0") {
        setText((state) => state + operand);
      } else if (text[text.indexOf(mathOperator) + 2] == ".") {
        setText((state) => state + operand);
      }
    } else {
      setText((state) => (+(state + operand)).toString());
    }
  };

  const selectAction = (action) => {
    if (text) {
      if (mathOperator) {
        setText(text.replace(` ${mathOperator} `, ` ${action} `));
        setMathOperator(action);
      } else {
        setMathOperator(action);
        setText((state) => `${state} ${action} `);
      }
    }
  };

  const selectPercent = () => {
    if (text) {
      if (mathOperator) {
        let string = text.slice(
          text.indexOf(` ${mathOperator} `) + 3,
          text.length
        );
        if (string)
          setText(
            text.replace(new RegExp(string + "$"), parseFloat(string) / 100)
          );
      } else {
        setText((parseFloat(text) / 100).toString());
      }
    }
  };

  const multiplyByMinusOne = () => {
    if (text) {
      if (mathOperator) {
        let string = text.slice(
          text.indexOf(` ${mathOperator} `) + 3,
          text.length
        );
        if (string) {
          setText(
            text.replace(new RegExp(string + "$"), parseFloat(string) * -1)
          );
        }
      } else {
        setText((parseFloat(text) * -1).toString());
      }
    }
  };

  const selectDot = () => {
    if (text) {
      if (text.indexOf(".") > -1) {
        if (text.indexOf(mathOperator) > text.lastIndexOf(".")) {
          setText((pre) => pre + ".");
        }
      } else {
        setText((pre) => pre + ".");
      }
    } else {
      setText("0.");
    }
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = history.filter((item) => {
        const itemData = item.text
          ? item.result
            ? item.text + item.result
            : ""
          : "";
        return itemData.indexOf(text) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(history);
      setSearch(text);
    }
  };

  useEffect(() => {
    if (text) {
      setHistory((state) => [{ text: prev, result: result }, ...state]);
      setFilteredData((state) => [{ text: prev, result: result }, ...state]);
    }
  }, [result]);

  useEffect(() => {
    if (history.length) {
      AsyncStorage.setItem("history", JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    searchFilter(text);
  }, [text]);
  useEffect(() => {
    const fetchLocalStorage = async () => {
      try {
        const value = await AsyncStorage.getItem("history");
        if (value !== null) {
          setHistory(JSON.parse(value));
          setFilteredData(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    fetchLocalStorage();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setText(item.text), setPrev("");
        }}
      >
        <View>
          <Text style={styles.item}>
            {item.text ? item.text + "=" + item.result : " "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        {text.length ? (
          <SafeAreaView style={styles.historyField}>
            <FlatList
              inverted
              showsHorizontalScrollIndicator={false}
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </SafeAreaView>
        ) : (
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <Text style={{ color: "white", fontSize: 30 }}>Suggestion</Text>
          </View>
        )}
        <Button
          title="History"
          onPress={() => {
            setShowHis((state) => !state);
            setText("");
          }}
        ></Button>

        <History
          show={showHis}
          setShow={setShowHis}
          data={filteredData}
          setdata={setSearch}
          searchFilter={searchFilter}
          text={search}
          clearHistory={handleClearAll}
        />
        <Text style={styles.prevValue}>{prev || " "}</Text>
        <Text style={styles.value}>{text || "0"}</Text>
        <View>
          <View style={styles.row}>
            <MyButton text="C" theme="secondary" onPress={handleClear} />
            <MyButton
              text="+/-"
              theme="secondary"
              onPress={multiplyByMinusOne}
            />
            <MyButton text="%" theme="secondary" onPress={selectPercent} />
            <MyButton
              text="÷"
              theme="accent"
              onPress={() => selectAction("/")}
            />
          </View>

          <View style={styles.row}>
            <MyButton text="7" onPress={() => selectOperand("7")} />
            <MyButton text="8" onPress={() => selectOperand("8")} />
            <MyButton text="9" onPress={() => selectOperand("9")} />
            <MyButton
              text="*"
              theme="accent"
              onPress={() => selectAction("*")}
            />
          </View>

          <View style={styles.row}>
            <MyButton text="4" onPress={() => selectOperand("4")} />
            <MyButton text="5" onPress={() => selectOperand("5")} />
            <MyButton text="6" onPress={() => selectOperand("6")} />
            <MyButton
              text="-"
              theme="accent"
              onPress={() => selectAction("-")}
            />
          </View>

          <View style={styles.row}>
            <MyButton text="1" onPress={() => selectOperand("1")} />
            <MyButton text="2" onPress={() => selectOperand("2")} />
            <MyButton text="3" onPress={() => selectOperand("3")} />
            <MyButton
              text="+"
              theme="accent"
              onPress={() => selectAction("+")}
            />
          </View>

          <View style={styles.row}>
            <MyButton
              text="0"
              size="double"
              onPress={() => selectOperand("0")}
            />
            <MyButton text="." onPress={selectDot} />
            <MyButton text="=" theme="accent" onPress={checkResult} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  searchBar: {
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
  },
  historyField: {
    height: 150,
    paddingRight: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  item: { color: "#fff", fontSize: 20, textAlign: "right" },
  prevValue: {
    color: "#fff",
    fontSize: 32,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  value: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
});

export default App;
