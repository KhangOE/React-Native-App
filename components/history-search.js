import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

function HistoryButton(props) {
  return (
    <TouchableOpacity> 
      <Text style = {styles.historyButton}> {props.name} </Text>
    </TouchableOpacity>
  )
}

function SearchButton(props) {
  return (
    <TouchableOpacity> 
      <Text style = {styles.searchButton}> {props.name} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  historyButton: {
    fontWeight: 700,
    padding: 14
  },
  searchButton: {
    fontWeight: 700,
    padding: 14
  }
});

export {HistoryButton,SearchButton};