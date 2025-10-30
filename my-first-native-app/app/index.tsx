import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {


  const [text, setText ] = useState("")


  return (
    <>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={styles.colorBlue}>Hello World!</Text>
        <View style={styles.square}></View>
        <TextInput placeholder="Digite Aqui..." onChangeText={text => setText(text)}></TextInput>
        <Text style={styles.colorBlue}>{text}</Text>

        {/* Type 1 Button */}
        <TouchableOpacity onPress={() => console.log("Button Clicked!")}>
          <View>
            <Text>Button</Text>
          </View>
        </TouchableOpacity>

        {/* Type 2 Button */}
        <Button title="Press Me" onPress={() => console.log("Second Button Clicked")}></Button>

        <Image 
          style={{width: 300, height: 300}}
          source={require("../assets/images/capao-raso.jpg")}></Image>

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