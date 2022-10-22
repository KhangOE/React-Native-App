import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NumberButton, OperatorButton, SpecialButton} from './components/button';
import {HistoryButton,SearchButton} from './components/history-search';


function Calculator() {
  // Biểu thức sẽ in ra
  const [formula, changeFormula] = useState([]);
  // Kết quả biểu thức khi bấm dấu =
  const [result, changeResult] = useState();
  // Lỗi sẽ in ra
  const [error, changeError] = useState();
  // Biến cờ hiệu để xác định đã tính biểu thức nào chưa 
  const [haveResult, changeHaveResult] = useState(false);
  // Biến lưu kết quả phép tình trước đó. Tương đương phím Ans trong máy tính bỏ túi
  const [Ans, changeAns] = useState();

  function showValueWhenClick(value) {
    if (!haveResult) {
      changeFormula(currentFormula => [...currentFormula, value]);
    }
    else {
      deleteFormula();
      changeHaveResult(false);
      changeFormula(currentFormula => [...currentFormula, value]);
    }
  }
  
  function showResult() { 
    try {
      changeResult(eval(formula.join('')));
      changeHaveResult(true);
      changeAns(result);
      console.log(prev);
    }
    catch (err) {
      changeError(err);
    }
  }

  function backspaceFormula() {
    try {
      changeFormula(currentFormula => currentFormula.slice(0, currentFormula.length - 1));
    }
    catch (err) {
      changeError(err);
    } 
  }

  function deleteFormula() {
    changeFormula([]);
    changeResult();
    changeError();
  }

  return (
    <View style = {{flex: 1, backgroundColor: '#202020'}}>
  
      <View style = {styles.headerBar}>
        {/* Chức năng History. Nên thay bằn icon */}
        <HistoryButton name = 'Filter' />
        {/* Chức năng Search. Nên thay bằn icon */}
        <SearchButton name = 'Find' />
      </View>
      
      
      <View style = {styles.resultBar}>
        <Text style = {styles.formulaRow}> {formula} </Text>
        <Text style = {styles.resultRow}> {result} </Text>
        <Text style = {styles.errorRow}> {error} </Text>
      </View>

      
      <View style={styles.footerBar}>
        <View style = {styles.buttonRow}>
          <NumberButton name = '1' handler = {() => showValueWhenClick(1)} />
          <NumberButton name = '2' handler = {() => showValueWhenClick(2)} />
          <NumberButton name = '3' handler = {() => showValueWhenClick(3)} />
          <OperatorButton name = '+' handler = {() => showValueWhenClick(' + ')} />
          <SpecialButton name = '(' handler = {() => showValueWhenClick('(')} />
          <SpecialButton name = ')' handler = {() => showValueWhenClick(')')} />
        </View>
        <View style = {styles.buttonRow}>
          <NumberButton name = '4' handler = {() => showValueWhenClick(4)} />
          <NumberButton name = '5' handler = {() => showValueWhenClick(5)} />
          <NumberButton name = '6' handler = {() => showValueWhenClick(6)} />
          <OperatorButton name = '-' handler = {() => showValueWhenClick(' - ')} />
          {/* Căn bậc 2. Nên thay bằng icon */}
          <OperatorButton name = 's' handler = {() => showValueWhenClick('Math.sqrt(')} />
          {/* Lũy thừa */}
          <OperatorButton name = '^' handler = {() => showValueWhenClick(' ** ')} />
        </View>
        <View style = {styles.buttonRow}>
          <NumberButton name = '7' handler = {() => showValueWhenClick(7)} />
          <NumberButton name = '8' handler = {() => showValueWhenClick(8)} />
          <NumberButton name = '9' handler = {() => showValueWhenClick(9)} />
          <OperatorButton name = '*' handler = {() => showValueWhenClick(' * ')} />
          <OperatorButton name = '=' handler = {() => showResult()} />
          <OperatorButton name = '%' handler = {() => showValueWhenClick('/100')} />
        </View>
        <View style = {styles.buttonRow}>
          <NumberButton name = '.' handler = {() => showValueWhenClick('.')} />
          <NumberButton name = '0' handler = {() => showValueWhenClick(0)} />
          {/* Phím Ans */}
          <NumberButton name = 'A' handler = {() => showValueWhenClick(Ans)} />
          <OperatorButton name = '/' handler = {() => showValueWhenClick(' / ')} />
          {/* Phím xóa 1 kí tự */}
          <SpecialButton name = 'D' handler = {() => backspaceFormula()} />
          {/* Phím xóa màn hình */}
          <SpecialButton name = 'C' handler = {() => deleteFormula()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row', 
    backgroundColor: '#a6a6a6', 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }, 
  resultBar: {
    flex: 2
  },
  footerBar: {
    backgroundColor: '#202020',
    flex: 7, 
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#a6a6a6',
  },
  formulaRow: {
    fontSize: 24, 
    color: '#fff',
    flex: 2,
    padding: 4
  },
  resultRow: {
    fontSize: 24, 
    color: '#19ce7f',
    flex: 2,
    alignSelf: 'flex-end',
    paddingHorizontal: 10
  },
  errorRow: {
    color: 'red',
    fontSize: 20,
    flex: 1
  },
  buttonRow: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  }
})

// Một số tính năng cần bổ xung : 
// Phím A lưu trữ giá trị phép tính trước đó. Tương đương phím Ans trong máy tính 
// Khi tính xong kết quả, nếu tiếp tục bấm 1 phép tính thì sẽ in kết quả hiện tại cộng với số sau đó
// History . Chính là phím Filter
// Search. Chính là phím Find
export default Calculator;