import react from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import LivrosCard from "../LivrosCard.js";
import Colors from "../Colors.json";

const CardLivros = () => {
    return(
        <View style={styles.container}>
            <FlatList
                data={LivrosCard}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={item.Imagem} style={styles.imagem} resizeMode="cover" />
                        <Text style={styles.titulo}>{item.Titulo}</Text>
                        <Text style={styles.autor}>{item.Autor}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,

    },
    card: {
        marginRight: 24,
        width: 230,
        alignItems: "center",
        borderRadius: 12,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        paddingBottom: 16,
    },
    imagem: {
        width: 230,
        height: 320,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginBottom: 12,
    },
    titulo: {
        fontFamily: "Inter_700Bold",
        fontSize: 18,
        color: Colors.colors.azulEscuro,
        textAlign: "center",
        paddingHorizontal: 8,
        marginBottom: 2,
    },
    autor: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        paddingHorizontal: 8,
    },
});

export default CardLivros;