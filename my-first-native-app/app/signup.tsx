import { router } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Swal from 'sweetalert2';
import { app } from '../firebaseConfig';

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [text, setText] = useState("");
  // const screenWidth = Dimensions.get("window").width;

  const auth = getAuth(app)

  let minPassLength = 6;

  const signUp = async () => {
    if ( password.length > minPassLength ){
      if (password === confirmPassword){
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          Swal.fire({
            icon: "success",
            title: "Success!!",
            text: "Your account has been created. Welcome!",
          });
          return router.navigate('/');
        } catch(e){
            return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "This email is already registred!",
            });
          }
      } else {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The passwords must be identical!",
        });
      }
    } else {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The Password must be at least 6 char!",
        });
    }
  }

  // const signUp = () => {
  //   if ( password === confirmPassword){
  //     return createUserWithEmailAndPassword(auth, email, password)
  //   } else {
  //     return alert("erro")
  //   }
  // }

  useEffect(() => {
    console.log(email, password, confirmPassword)
  }, [email, password, confirmPassword])

  return (

    <View style={[styles.container, {backgroundColor: "#171717"}]}>
      <Text style={styles.title}>Please Insert Your Data!</Text>

      {/* <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Name" style={styles.input} /> */}
      <TextInput placeholder="Email"  style={styles.input} onChangeText={(value) => setEmail(value)} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={(value) => setPassword(value)} />
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input}  onChangeText={(value) => setConfirmPassword(value)} />

      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("Button Clicked!")}>
        <Text style={[styles.link, styles.red]} onPress={() => router.navigate('/')}>Already have an account?</Text>
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
    color:"rgb(156, 156, 156)",
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
    backgroundColor: "#333333",
    color: "rgb(156, 156, 156)",
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
    color: "#c7c7c7",
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
