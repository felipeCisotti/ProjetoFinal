import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Colors.json";
import { EvilIcons } from "@expo/vector-icons";
import { useFavoritos } from "../FavoritosContext";

const CardLivros = ({ item, isGrid }) => {
    const { isFavorito, toggleFavorito } = useFavoritos();
    const favoritado = isFavorito(item.id);

    return (
        <View style={[styles.card, isGrid && styles.cardGrid]}>
            <Image source={item.Imagem} style={[styles.imagem, isGrid && styles.imagemGrid]} resizeMode="cover" />
            <Text style={[styles.titulo, isGrid && styles.tituloGrid]} numberOfLines={2}>{item.Titulo}</Text>
            <Text style={[styles.autor, isGrid && styles.autorGrid]} numberOfLines={1}>{item.Autor}</Text>
            <View style={styles.avaliacao}>
                <TouchableOpacity
                    onPress={() => toggleFavorito(item)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    activeOpacity={0.7}
                >
                    <EvilIcons
                        name="star"
                        style={styles.starIcon}
                        size={32}
                        color={favoritado ? "#F4A935" : Colors.colors.azulEscuro}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginRight: 24,
        width: 260,
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
    cardGrid: {
        marginRight: 0,
        width: "48%",
    },
    imagem: {
        width: 230,
        height: 320,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginBottom: 12,
    },
    imagemGrid: {
        width: "100%",
        height: 350,
    },
    titulo: {
        fontFamily: "Inter_700Bold",
        fontSize: 18,
        color: Colors.colors.azulEscuro,
        textAlign: "center",
        paddingHorizontal: 8,
        marginBottom: 2,
    },
    tituloGrid: {
        fontSize: 14,
    },
    autor: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        paddingHorizontal: 8,
    },
    autorGrid: {
        fontSize: 12,
    },
    avaliacao: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    starIcon: {
        marginRight: 4,
        fontSize: 32,
    },
});

export default CardLivros;