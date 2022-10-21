import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button
} from "react-native";
import { History } from "./history";
//import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [text, setText] = useState("");
  const [prev, setPrev] = useState("");
  const [result, setResult] = useState("");
  const [mathOperator, setMathOperator] = useState("");
  const [history, setHistory] = useState([]);
  const [showHis,setShowHis] = useState(false)

  const checkResult = () => {
    try {
      let res = eval(text);
      if (res != undefined) {
        setResult(res);
        setPrev(text);
        setText(res.toString());
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
    //setHistory([]);
  };

  const selectOperand = (operand) => {
    setText((state) => state + operand);
  };

  const selectAction = (action) => {
    setMathOperator(action);
    setText((state) => state + action);
  };

  const delOneCharacter = () => {
    setText((pre) => pre.slice(0, -1));
  };

  const selectPercent = () => {
    if (mathOperator) {
      let string = text.slice(text.indexOf(mathOperator) + 1, text.length);
      setText(text.replace(string, parseFloat(string) / 100));
    } else {
      setText(parseFloat(text) / 100);
    }
  };

  useEffect(() => {
    if(text){
      setHistory((state) => [{ text: prev, result: result }, ...state]);
    }
   
  }, [result]);

   useEffect(()=>{
  if(history.length){
  AsyncStorage.setItem(
  'history',
  JSON.stringify(history))
  //console.log(history)
  }
 },[history])


/*
 useEffect(()=>{
    AsyncStorage.getItem('history', (err, result) => {
          setHistory(JSON.parse(result));
        });
 },[])*/
  
  useEffect( async ()=>{
  
  try {
    const  value = await AsyncStorage.getItem('history');
    if (value !== null) {
      setHistory(JSON.parse(value))
      console.log(value);
    }
  
  } catch (error) {
    // Error retrieving data
  }

  },[])


  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={{ textAlign: "right" }}>
          {item.text ? item.text + "=" + item.result : " "}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
   
       <Button  title="History" onPress={()=>{setShowHis(state => !state)}}></Button>
      
    <History show={showHis} setShow={setShowHis} data={history} />
     
      <View style={{ borderWidth: 2, width: 200 }}>
        <Text
          style={{
            padding: 10,
            fontSize: 15,
            color: "white",
            textAlign: "right",
            backgroundColor: "#a66",
          }}
        >
          {prev || " "}
        </Text>
        <Text
          style={{
            padding: 10,
            fontSize: 25,
            color: "white",
            textAlign: "right",
            backgroundColor: "#a66",
          }}
        >
          {text || "0"}
        </Text>
      </View>
      <View>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleClearAll} style={styles.button}>
            <Text>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={delOneCharacter}>
            <Text>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={selectPercent}>
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
            <Text>*</Text>
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;