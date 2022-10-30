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
import FontistoIcon from "@expo/vector-icons/Fontisto";

const App = () => {
  const [text, setText] = useState("");
  const [prev, setPrev] = useState("");
  const [mathOperator, setMathOperator] = useState();
  const [history, setHistory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [showHis, setShowHis] = useState(false);
  const [light, setLight] = useState(true);

  const checkResult = () => {
    try {
      let res = eval(text);
      if (res != undefined) {
        setHistory((state) => [
          { text: text, result: res, id: Date.now() },
          ...state,
        ]);
        setFilteredData((state) => [
          { text: text, result: res, id: Date.now() },
          ...state,
        ]);
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
    setMathOperator();
    setHistory([]);
    setFilteredData([]);
    AsyncStorage.setItem("history", "");
  };

  const handleClear = () => {
    setPrev("");
    setText("");
    setMathOperator("");
  };

  const selectOperand = (operand) => {
    if (mathOperator) {
      if (text[text.indexOf(` ${mathOperator} `) + 3] != "0") {
        setText((state) => state + operand );
      } else if (text[text.indexOf(` ${mathOperator} `) + 4] == ".") {
        setText((state) => state + operand  );
      }
    } else {
      setText((state) => (+(state + operand )).toString());
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

  const handleDelete = (index) => {
    console.log("this run: ", index);
    console.log(history.filter((pre) => pre.id != index));
    setHistory((prev) => prev.filter((pre) => pre.id != index));
  };

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

  useEffect(() => {
    searchFilter(text);
  }, [text]);

  useEffect(() => {
    AsyncStorage.setItem("history", JSON.stringify(history));

    setFilteredData(history);
  }, [history]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setText(item.text), setPrev("");
        }}
      >
        <View>
          <Text style={[styles.item, light ? { color: "black" } : {}]}>
            {item.text ? item.text + " = " + item.result : " "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, light ? { backgroundColor: "white" } : {}]}>
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
            <Text
              style={[
                { color: "white", fontSize: 30 },
                light ? { color: "black" } : {},
              ]}
            >
              Suggestion
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => setShowHis(!showHis)}>
            <View style={light ? { color: "black" } : { color: "white" }}>
              <FontistoIcon
                name="history"
                size={32}
                color={light ? "black" : "white"}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLight(!light)}>
            <View style={light ? { color: "black" } : { color: "white" }}>
              {light ? (
                <FontistoIcon name="day-sunny" size={32} />
              ) : (
                <FontistoIcon name="night-clear" size={32} color="white" />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <History
          show={showHis}
          setShow={setShowHis}
          data={filteredData}
          setdata={setSearch}
          searchFilter={searchFilter}
          text={search}
          clearHistory={handleClearAll}
          handleDelete={handleDelete}
        />
        <Text style={[styles.prevValue, light ? { color: "black" } : {}]}>
          {prev || " "}
        </Text>
        <Text style={[styles.value, light ? { color: "black" } : {}]}>
          {text || "0"}
        </Text>
        <View>
          <View style={styles.row}>
            <MyButton
              text="C"
              theme="secondary"
              onPress={handleClear}
              light={light}
            />
            <MyButton
              text="+/-"
              theme="secondary"
              onPress={multiplyByMinusOne}
              light={light}
            />
            <MyButton
              text="%"
              theme="secondary"
              onPress={selectPercent}
              light={light}
            />
            <MyButton
              text="÷"
              theme="accent"
              onPress={() => selectAction("/")}
              light={light}
            />
          </View>

          <View style={styles.row}>
            <MyButton
              text="7"
              onPress={() => selectOperand("7")}
              light={light}
            />
            <MyButton
              text="8"
              onPress={() => selectOperand("8")}
              light={light}
            />
            <MyButton
              text="9"
              onPress={() => selectOperand("9")}
              light={light}
            />
            <MyButton
              text="×"
              theme="accent"
              onPress={() => selectAction("*")}
              light={light}
            />
          </View>

          <View style={styles.row}>
            <MyButton
              text="4"
              onPress={() => selectOperand("4")}
              light={light}
            />
            <MyButton
              text="5"
              onPress={() => selectOperand("5")}
              light={light}
            />
            <MyButton
              text="6"
              onPress={() => selectOperand("6")}
              light={light}
            />
            <MyButton
              text="-"
              theme="accent"
              onPress={() => selectAction("-")}
              light={light}
            />
          </View>

          <View style={styles.row}>
            <MyButton
              text="1"
              onPress={() => selectOperand("1")}
              light={light}
            />
            <MyButton
              text="2"
              onPress={() => selectOperand("2")}
              light={light}
            />
            <MyButton
              text="3"
              onPress={() => selectOperand("3")}
              light={light}
            />
            <MyButton
              text="+"
              theme="accent"
              onPress={() => selectAction("+")}
              light={light}
            />
          </View>

          <View style={styles.row}>
            <MyButton
              text="0"
              size="double"
              onPress={() => selectOperand("0")}
              light={light}
            />
            <MyButton text="." onPress={selectDot} light={light} />
            <MyButton
              text="="
              theme="accent"
              onPress={checkResult}
              light={light}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
    fontSize: 50,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  value: {
    color: "#fff",
<<<<<<< HEAD
    fontSize: 90,
=======
    fontSize: 45,
>>>>>>> c0c313151bb5772f38ca46b0b180eb0061b2d548
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
});

export default App;
