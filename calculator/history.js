import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Modal,
  Button,
  TextInput,
} from "react-native";

export const History = (props) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {item.text} = {item.result}
      </Text>
    </View>
  );

  return (
    <Modal visible={props.show}>
      <Button
        title="Cancle"
        onPress={() => {
          props.setShow((state) => !state);
        }}
      />
      <TextInput
        style={styles.searchBar}
        value={props.search}
        placeholder="search ..."
        onChangeText={(text) => props.searchFilter(text)}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          inverted
          showsHorizontalScrollIndicator={false}
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
      <Button title="Delete history" onPress={props.clearHistory} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#202020",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: "white",
  },
  title: {
    fontSize: 32,
    color: "white",
    // textAlign: "right",
  },
  searchBar: {
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
  },
});
