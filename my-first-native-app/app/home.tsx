import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Swal from 'sweetalert2';
import { app, db } from '../firebaseConfig';

const generosLista = ["Ação", "Comédia", "Romance", "Drama", "Terror", "Ficção"];

export default function Home() {

  const auth = getAuth(app);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [rate, setRate] = useState("");
  const [review, setReview] = useState("");
  const [generos, setGeneros] = useState<string[]>([]);

  const toggle = (g: string) => {
    if (generos.includes(g)) {
      // remover se já existe
      setGeneros(generos.filter(item => item !== g));
    } else {
      // adicionar
      setGeneros([...generos, g]);
    }
  };

  async function registerMovie() {
    try {

      if (!title || !rate) {
        Swal.fire({
          icon: "error",
          title: "Missing data",
          text: "Title and Rate are required!",
        });
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

      // RESET
      setTitle("");
      setYear("");
      setPoster("");
      setRate("");
      setReview("");
      setGeneros([]);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR: " + err,
      });
    }
  }

  return (

    <View style={[styles.container, styles.main, { backgroundColor: "#171717" }]}>
      
      <Text style={[styles.title, { alignSelf: 'center' }]}>Hello There!</Text>

      {/* Title */}
      <Text style={styles.subtitle}>Title</Text>
      <TextInput
        value={title}
        placeholder="Movie Title"
        onChangeText={setTitle}
        placeholderTextColor="#777"
        style={styles.input}
      />

      {/* Year */}
      <Text style={styles.subtitle}>Releasing Year</Text>
      <TextInput
        value={year}
        placeholder="YYYY"
        onChangeText={setYear}
        placeholderTextColor="#777"
        style={styles.input}
      />

      {/* Poster */}
      <Text style={styles.subtitle}>Poster</Text>
      <TextInput
        value={poster}
        placeholder="Image Link"
        onChangeText={setPoster}
        placeholderTextColor="#777"
        style={styles.input}
      />

      {/* Rate */}
      <Text style={styles.subtitle}>Rate</Text>
      <TextInput
        value={rate}
        placeholder="Between 1 and 10"
        onChangeText={setRate}
        placeholderTextColor="#777"
        style={styles.input}
      />

      {/* Review */}
      <Text style={styles.subtitle}>Review</Text>
      <TextInput
        value={review}
        placeholder="Write your review..."
        onChangeText={setReview}
        placeholderTextColor="#777"
        style={styles.textArea}
        multiline
      />

      {/* GENRES */}
      <Text style={styles.subtitle}>Genre</Text>
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
                backgroundColor: generos.includes(g) ? "#d12121" : "transparent",
                borderRadius: 6,
              }}
            >
              {generos.includes(g) && (
                <Text style={{ color: "white", fontSize: 16 }}>✓</Text>
              )}
            </View>

            <Text style={{ marginLeft: 10, color: "rgb(156, 156, 156)" }}>
              {g}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={registerMovie}>
        <Text style={styles.buttonText}>Register Movie</Text>
      </TouchableOpacity>
    
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/list')}>
        <Text style={styles.buttonText}>Movie List</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  textArea: {
    backgroundColor: "#333333",
    color: "rgb(156, 156, 156)",
    borderRadius: 15,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    height: 120,
    textAlignVertical: "top",
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
    width: "30%",
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
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    color: "rgb(156, 156, 156)",
    fontSize: 20,
    marginBottom: 10,
  },

  subtitle: {
    color: "rgb(126, 126, 126)",
    fontSize: 16,
    alignSelf: "flex-start",
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

});