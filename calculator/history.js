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
import { useState } from "react";

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {item.text} = {item.result}
    </Text>
  </View>
);

export const History = (props) => {
  const [search, setSearch] = useState("");

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <Modal visible={props.show}>
      <Button
        title="Cancle"
        onPress={() => {
          props.setShow((state) => !state);
        }}
      ></Button>
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
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
