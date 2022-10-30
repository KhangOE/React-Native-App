import React, { useEffect } from "react";
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
  TouchableOpacity,
} from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome5";

export const History = (props) => {
  useEffect(() => {
    props.setdata("");
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {item.text} = {item.result}
      </Text>
      <TouchableOpacity onPress={() => props.handleDelete(item.id)}>
        <FontAwesomeIcon name="trash" size={32} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={props.show}>
      <Button
        color={"#7900FF"}
        title="Cancle"
        onPress={() => {
          props.setShow((state) => !state);
        }}
      />
      <TextInput
        style={styles.searchBar}
        value={props.search}
        placeholder="search ..."
        placeholderTextColor={"#93FFD8"}
        onChangeText={(text) => props.searchFilter(text)}
      />

      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      </SafeAreaView>

      <Button
        color={"#7900FF"}
        title="Delete history"
        onPress={props.clearHistory}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#0E185F",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 8,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: "#2FA4FF",
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    color: "#E8FFC2",
    // textAlign: "right",
  },
  searchBar: {
    height: 40,
    backgroundColor: "#0E185F",
    borderBottomWidth: 1,
    paddingLeft: 20,
    borderColor: "#93FFD8",
    paddingHorizontal: 8,
    color: "#93FFD8",
  },
});
