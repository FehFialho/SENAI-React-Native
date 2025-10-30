import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {


  const [text, setText ] = useState("")


  return (
    <>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      
        <Text>Welcome!</Text>
      
        <TextInput placeholder="Email" style={styles.input}></TextInput>
        <TextInput placeholder="Password" style={styles.input}></TextInput>

        <TouchableOpacity onPress={() => console.log("Button Clicked!")}>
          <View>
            <Text style={styles.button}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Button Clicked!")}>
          <View>
            <Text style={{color:"red"}}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>

        <View  style={{flexDirection: "row", justifyContent: "space-around", width: 400}}>

            <TouchableOpacity onPress={() => console.log("Button Clicked!")}>
              <View>
                <Text style={{color:"red"}}>Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Button Clicked!")}>
              <View>
                <Text style={{color:"blue"}}>FaceBook</Text>
              </View>
            </TouchableOpacity>

        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: "red",
    borderRadius: 15,
    width: 310,
    height: 40,
    padding: 10
  },

  input:{
    backgroundColor: "gray",
    borderRadius: 15,
    height: 40,
    width: 310,
    padding: 10
  },

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