import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Swal from 'sweetalert2';
import { app, db } from '../firebaseConfig';

const generosLista = ["Ação", "Comédia", "Romance", "Drama", "Terror", "Ficção"];

export default function Home() {

  const auth = getAuth(app)
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [rate, setRate] = useState("");
  const [review, setReview] = useState("");
  const [generos, setGeneros] = useState<Record<string, boolean>>({});

  const toggle = (g: string) => {
    setGeneros({ 
      ...generos, 
      [g]: !generos[g] 
    });
  };

  async function registerMovie() {
    try{

      if (!title || !generos || !rate){
        console.log("Título, Gênero e Nota Obrigatórios!");
        return;
      }

      const movie = {
        title,
        year,
        poster,
        rate,
        review,
        generos,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, "movies"), movie);
      Swal.fire({
        icon: "success",
        title: "Success!!",
        text: "Your movie has been added!",
      });
      

    } catch (err){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR! " +  err,
      });
    }
  }

  return (

    <View style={[styles.container, styles.main, {backgroundColor: "#171717"}]}>
        
      <Text style={[styles.title, {alignSelf:'center'}]}>Hello There!</Text>

      {/* Title */}
      <Text style={[styles.subtitle, {alignSelf:'flex-start'}]}>Title</Text>
      <TextInput placeholder="Movie Title" onChangeText={(title) => setTitle(title)} placeholderTextColor="#777" style={styles.input} />

      {/* Year */}
      <Text style={[styles.subtitle, {alignSelf:'flex-start'}]}>Releasing Year</Text>
      <TextInput placeholder="YYYY" onChangeText={(year) => setYear(year)} placeholderTextColor="#777" style={styles.input} />

      {/* Image */}
      <Text style={[styles.subtitle, {alignSelf:'flex-start'}]}>Poster</Text>
      <TextInput placeholder="Image Link" onChangeText={(image) => setPoster(image)} placeholderTextColor="#777" style={styles.input} />

      {/* Rate */}
      <Text style={[styles.subtitle, {alignSelf:'flex-start'}]}>Rate</Text>
      <TextInput placeholder="Between 1 and 10" onChangeText={(rate) => setRate(rate)} placeholderTextColor="#777" style={styles.input} />
    
      {/* Review */}
      <Text style={[styles.subtitle, {alignSelf:'flex-start'}]}>Review</Text>
      <TextInput
        placeholder="Write your review..."
        onChangeText={(review => setReview(review))}
        placeholderTextColor="#777"
        style={styles.textArea}
        multiline={true}          // transforma em textarea
        numberOfLines={5}         // altura inicial
        textAlignVertical="top"   // texto começa no topo
        maxLength={800}          // limite de caracteres
      />

      {/* GENRES */}
      <Text style={[styles.subtitle, {alignSelf:'flex-start'}]}>Genre</Text>
      <View style={[styles.grid, styles.box]}>
        {generosLista.map((g) => (
            <Pressable
            key={g}
            onPress={() => toggle(g)}
            style={styles.checkboxItem}
            >
            <View
                style={{
                width: 24,
                height: 24,
                borderWidth: 2,
                borderColor: "#d12121",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: generos[g] ? "#d12121" : "transparent",
                borderRadius: 6,
                }}
            >
                {generos[g] && (
                <Text style={{ color: "white", fontSize: 16 }}>✓</Text>
                )}
            </View>

            <Text style={{ marginLeft: 10, color: "rgb(156, 156, 156)" }}>
                {g}
            </Text>
            </Pressable>
        ))}
        </View>

        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.buttonText} onPress={() => registerMovie()}>Register Movie</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

    textArea: {
        backgroundColor: "#333333",
        color: "rgb(156, 156, 156)",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "100%",
        marginBottom: 10,
        height: 120,
        textAlignVertical: "top",
        textAlign: "left",
    },   

    box: {
        backgroundColor: "#333333",
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 14
    },

    grid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    
    checkboxItem: {
        width: "30%", // 3 por linha (30% + espaçamento)
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
    },

    main: {
        height: "100%",
        paddingVertical: 60
    },

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
    marginVertical: 6,
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
    marginTop: 24,
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
