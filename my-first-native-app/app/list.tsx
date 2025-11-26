import { collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../firebaseConfig";

export default function MovieList() {

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMovies() {
    try {
      const q = query(collection(db, "movies"));
      const snapshot = await getDocs(q);

      console.log(snapshot.docs)

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMovies(list);

    } catch (err) {
      console.log("Erro ao buscar filmes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateMovie(id: string, data: any) {
    try {
      const ref = doc(db, "movies", id);
      await updateDoc(ref, data);

      alert("Filme atualizado!");
      fetchMovies();

    } catch (err) {
      console.log("Erro ao atualizar:", err);
    }
  }

  async function deleteMovie(id: string) {
    try {
      const ref = doc(db, "movies", id);
      await deleteDoc(ref);

      alert("Filme deletado!");
      fetchMovies();

    } catch (err) {
      console.log("Erro ao deletar:", err);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Nenhum Filme encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: "#171717", padding: 20}]}>
      <Text style={ styles.title}>
        My Movie List
      </Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.box}>

            <Text style={styles.title}> {item.title} ({item.year}) </Text>
            <Text style={{ opacity: 0.7 }}>Nota: {item.rate}</Text>
            <Text style={{ opacity: 0.7 }}>Review: {item.review}</Text>
            
            <Text style={{ opacity: 0.7 }}>
                Data: {item.createdAt ? item.createdAt.toDate().toLocaleDateString() : "Sem data"}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 12, gap: 12 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3498db",
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }}
                onPress={() =>
                  updateMovie(item.id, { brand: "Atualizado" })
                }
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#e74c3c",
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }}
                onPress={() => deleteMovie(item.id)}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  box: {
    backgroundColor: "rgb(65, 65, 65)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    width: "100%"
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
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