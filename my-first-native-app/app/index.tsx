import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={styles.colorBlue}>Hello World!</Text>
        <View style={styles.square}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  colorBlue:{
    color: "blue",
    fontSize: 12
  },

  square: {
    height: 300,
    width: 300,
    backgroundColor: 'rebeccapurple'
  }
})