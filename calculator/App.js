import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "./Button";
const App = () => {
  const [text, setText] = useState("");
  const [prev, setPrev] = useState("");
  const [result, setResult] = useState("");
  const [mathOperator, setMathOperator] = useState();
  const [history, setHistory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

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
    setMathOperator("");
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
    if (mathOperator) {
      setText(text.replace(mathOperator, action));
      setMathOperator(action);
    } else {
      setMathOperator(action);
      setText((state) => state + action);
    }
  };

  const delOneCharacter = () => {
    setText((pre) => pre.slice(0, -1));
  };

  const selectPercent = () => {
    if (text) {
      if (mathOperator) {
        let string = text.slice(text.indexOf(mathOperator) + 1, text.length);
        setText(text.replace(string, parseFloat(string) / 100));
      } else {
        setText((parseFloat(text) / 100).toString());
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
    if (!text || text === "0") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [text]);

  useEffect(() => {
    if (text) {
      setHistory((state) => [{ text: prev, result: result }, ...state]);
      setFilteredData((state) => [{ text: prev, result: result }, ...state]);
    }
  }, [result]);

  useEffect(() => {
    if (history.length) {
      AsyncStorage.setItem("history", JSON.stringify(history));
      //console.log(history)
    }
  }, [history]);

  useEffect(() => {
    const fetchLocalStorage = async () => {
      try {
        const value = await AsyncStorage.getItem("history");
        if (value !== null) {
          setHistory(JSON.parse(value));
          setFilteredData(JSON.parse(value));
          // console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    fetchLocalStorage();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.item}>
          {item.text ? item.text + "=" + item.result : " "}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <TextInput
          style={styles.searchBar}
          value={search}
          placeholder="search ..."
          onChangeText={(text) => searchFilter(text)}
        />
        <SafeAreaView style={styles.historyField}>
          <FlatList
            inverted
            showsHorizontalScrollIndicator={false}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </SafeAreaView>
        <Text style={styles.prevValue}>{prev || " "}</Text>
        <Text style={styles.value}>{text || "0"}</Text>
        <View>
          <View style={styles.row}>
            {isEmpty ? (
              <Button text="AC" theme="secondary" onPress={handleClearAll} />
            ) : (
              <Button text="C" theme="secondary" onPress={handleClear} />
            )}
            <Button text="Del" theme="secondary" onPress={delOneCharacter} />
            <Button text="%" theme="secondary" onPress={selectPercent} />
            <Button text="/" theme="accent" onPress={() => selectAction("/")} />
          </View>

          <View style={styles.row}>
            <Button text="7" onPress={() => selectOperand("7")} />
            <Button text="8" onPress={() => selectOperand("8")} />
            <Button text="9" onPress={() => selectOperand("9")} />
            <Button text="x" theme="accent" onPress={() => selectAction("*")} />
          </View>

          <View style={styles.row}>
            <Button text="4" onPress={() => selectOperand("4")} />
            <Button text="5" onPress={() => selectOperand("5")} />
            <Button text="6" onPress={() => selectOperand("6")} />
            <Button text="-" theme="accent" onPress={() => selectAction("-")} />
          </View>

          <View style={styles.row}>
            <Button text="1" onPress={() => selectOperand("1")} />
            <Button text="2" onPress={() => selectOperand("2")} />
            <Button text="3" onPress={() => selectOperand("3")} />
            <Button text="+" theme="accent" onPress={() => selectAction("+")} />
          </View>

          <View style={styles.row}>
            <Button text="0" size="double" onPress={() => selectOperand("0")} />
            <Button text="." onPress={selectDot} />
            <Button text="=" theme="accent" onPress={checkResult} />
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
    // flex: 1,
    paddingRight: 20,
    marginBottom: 20,
    // backgroundColor: "#a66",
  },
  item: { color: "#fff", fontSize: 20, textAlign: "right" },
  prevValue: {
    color: "#fff",
    fontSize: 20,
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
