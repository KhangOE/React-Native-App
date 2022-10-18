import React, { useState,useEffect } from 'react';
import { Text, TextInput, View,Button,StyleSheet } from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState([]);
  const [result,setResult] = useState(0)
  const [history,setHistory] = useState([{text:'',result:''}])

  const checkResult = () =>{
    try {
      if(eval(text.join(''))){

        setResult(eval(text.join('')))
       
      }
    } catch (error) {
      return 0
    }
  }

  useEffect(()=>{
  
          setHistory(state => [...state,{text:text,result:result}])
  
    }
  ,[result])
  return (
    <View style={{backgroundColor: 'grey' ,flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <view style={{padding: 10, fontSize: 42, color: 'white'}}>
        {text}
      </view>
      <Text style={{padding: 10, fontSize: 42, color: 'white'}}>
       {result}
       
      </Text>
      <view style={{flexDirection: 'row',flex:1}}>

      <Button title='1' onPress={() => setText(state=>[...state,'1'])}/>
      <Button title='2' onPress={() => setText(state=>[...state,'2'])}/>
      <Button title='3' onPress={() => setText(state=>[...state,'3'])}/>
      <Button title='4' onPress={() => setText(state=>[...state,'4'])}/>
      </view>
     <Button title='calcutlate' onPress={checkResult}/>
      
      <Button title='5' onPress={() => setText(state=>[...state,'5'])}/>
      <Button title='6' onPress={() => setText(state=>[...state,'6'])}/>
      <Button title='7' onPress={() => setText(state=>[...state,'7'])}/>
      <Button title='8' onPress={() => setText(state=>[...state,'8'])}/>
      <Button title='9' onPress={() => setText(state=>[...state,'9'])}/>
      <Button title='+' onPress={() => setText(state=>[...state,'+'])}/>
      <Button title='-' onPress={() => setText(state=>[...state,'-'])}/>
      <Button title='x' onPress={() => setText(state=>[...state,'*'])}/>
      <Button title=':' onPress={() => setText(state=>[...state,'/'])}/>
      <Button title='C' onPress={() => {setText(''); setResult(0)}}/>
      <Button title='<=' onPress={() => setText(state => state.slice(0,-1)) } />
    </View>
  )

}
export default PizzaTranslator;