import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Modal,Button } from 'react-native';

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.text} = {item.result}</Text>
  </View>
);

export const History = (props) => {
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (

    <Modal visible={props.show}>
    <Button title='Cancle' onPress={()=> {props.setShow(state=> !state)}}></Button>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
