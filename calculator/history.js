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
      color={'#533483'}
        title="Cancle"
        onPress={() => {
          props.setShow((state) => !state);
        }}
      />
      <TextInput
        style={styles.searchBar}
        value={props.search}
        placeholder="search ..."
        placeholderTextColor={'#F73D93'}
        onChangeText={(text) => props.searchFilter(text)}
      />
      <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          inverted
          showsHorizontalScrollIndicator={false}
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
           </View>
      </SafeAreaView>
      <Button color={'#533483'} title="Delete history" onPress={props.clearHistory} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#202020",
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  item: {
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    borderBottomWidth:2,
    borderBottomColor:'#F73D93'
  },
  title: {
    fontSize: 32,
   color: "#F73D93",
    // textAlign: "right",
  },
  searchBar: {
    height: 40,
    backgroundColor: "#202020",
    borderBottomWidth: 1,
    paddingLeft: 20,
    borderColor: "#F73D93",
  },
});
