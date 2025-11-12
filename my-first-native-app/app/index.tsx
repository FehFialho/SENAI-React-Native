import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const screenWidth = Dimensions.get("window").width;

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Please Insert Your Data!</Text>

      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email"  style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={() => console.log("Button Clicked!")}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("Button Clicked!")}>
        <Text style={[styles.link, styles.red]}>Need Help?</Text>
      </TouchableOpacity>

      {/* Social */}

      <Text style={[styles.subtitle, {alignSelf:'center', marginTop: 24}]}>Access Quickly</Text>

      <View style={styles.socialContainer}>

        <TouchableOpacity>
          <Text style={[styles.link, styles.blue]}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.link, { color: "#d12121" }]}>Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
        <Text style={[styles.link, styles.blue]}>Twitter</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    alignSelf: "flex-start",
    fontSize: 20,
    marginBottom: 10,
  },

  subtitle: {
    color:"rgb(126, 126, 126)",
    alignSelf: "flex-start",
    fontSize: 16,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "#f2f2f2",
    color: "#8f8f8f",
    borderRadius: 15,
    height: 45,
    paddingHorizontal: 10,
    width: "100%", 
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#d12121",
    borderRadius: 15,
    paddingVertical: 12,
    width: "100%", 
    alignItems: "center",
    marginVertical: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  red: {
    color: "#d12121",
  },

  blue: {
    color: "#2145d1",
  },

  link: {
    fontWeight: "600",
    marginVertical: 5,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%", 
    marginTop: 20,
  },
});
