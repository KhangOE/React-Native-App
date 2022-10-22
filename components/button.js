import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


function NumberButton(props) {
  return (
  <TouchableOpacity onPress = {props.handler}>
    <Text style = {styles.NumberButton}> {props.name} </Text>
  </TouchableOpacity>
  )
}

function OperatorButton(props) {

  return (
  <TouchableOpacity onPress = {props.handler}> 
    <Text style = {styles.OperatorButton}> {props.name} </Text>
  </TouchableOpacity>
  )
}

function SpecialButton(props) {
  return (
  <TouchableOpacity onPress = {props.handler}>
    <Text style = {styles.SpecialButton}> {props.name} </Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  NumberButton: {
    backgroundColor: '#333333',
    color: '#fff',
    padding: 18,
    borderRadius: '50%', 
    fontSize: 20
  }, 
  OperatorButton: {
    backgroundColor: '#f19925',
    color: '#fff', 
    padding: 18, 
    borderRadius: '50%', 
    fontSize: 20
  },
  SpecialButton: {
    backgroundColor: '#a6a6a6',
    color: '#000', 
    padding: 18, 
    borderRadius: '50%', 
    fontSize: 20
  }
})
export {NumberButton, OperatorButton, SpecialButton};