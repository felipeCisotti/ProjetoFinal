import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LivrosData from "../LivrosData.js";
import LivrosCard from "../LivrosCard.js";
import { useNavigation } from "@react-navigation/native";


export default function CardIndicações({ Titulo: propTitulo, Autor: propAutor, Imagem: propImagem, Descricao: propDescricao, onPress }) {
    const [livro, setLivro] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (propTitulo || propAutor || propImagem || propDescricao) {
            setLivro({
                Titulo: propTitulo,
                Autor: propAutor,
                Imagem: propImagem,
                Descricao: propDescricao,
            });
            return;
        }

        async function carregarLivroRecomendado() {
            try {
                if (!LivrosData || LivrosData.length === 0) return;

                const lastId = await AsyncStorage.getItem("@last_recommended_book_id");
                let selectedBook = LivrosData[0];

                if (LivrosData.length > 1) {
                    const lastIndex = LivrosData.findIndex((b) => b.id === lastId);
                    const nextIndex = (lastIndex + 1) % LivrosData.length;
                    selectedBook = LivrosData[nextIndex];
                }

                await AsyncStorage.setItem("@last_recommended_book_id", selectedBook.id);
                setLivro(selectedBook);
            } catch (error) {
                console.log("Erro ao carregar recomendação diária:", error);
                if (LivrosData && LivrosData.length > 0) {
                    setLivro(LivrosData[0]);
                }
            }
        }

        carregarLivroRecomendado();
    }, [propTitulo, propAutor, propImagem, propDescricao]);

    if (!livro) {
        return <View style={styles.cardContainer} />;
    }

    const { Titulo, Autor, Imagem, Descricao } = livro;
    console.log("CardIndicações livro:", livro);

    const words = Titulo ? Titulo.split(" ") : [];
    let firstPart = "";
    let lastWord = "";

    if (words.length > 1) {
        lastWord = words.pop();
        firstPart = words.join(" ");
    } else if (words.length === 1) {
        lastWord = words[0];
    }

    return (
<TouchableOpacity
    activeOpacity={0.9}
    onPress={() => {
        const itemParaResenha = LivrosCard.find(l => l.id === livro.id) || livro;
        navigation.navigate("ResenhaLiteraria", { item: itemParaResenha });
    }}
    style={styles.cardContainer}
>
            <ImageBackground
                key={Imagem}
                source={Imagem}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 24 }}
                onError={(e) => console.log("Erro ao carregar imagem do livro:", Imagem, e.nativeEvent.error)}
            >
                <View style={styles.overlay} />

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>DAILY CURATED</Text>
                </View>

                <View style={styles.contentArea}>
                    <Text style={styles.titulo}>
                        {firstPart ? `${firstPart} ` : ""}
                        <Text style={styles.tituloItalic}>{lastWord}</Text>
                    </Text>

                    <Text style={styles.descricao} numberOfLines={3}>
                        Por <Text style={styles.autorDestaque}>{Autor}</Text> • {Descricao}
                    </Text>

                    <Text style={styles.readReview}>
                        Ler Resenha {"\u2192"}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        height: 480,
        borderRadius: 24,
        backgroundColor: "#E5E5E5",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "space-between",
        padding: 24,
        boxShadow: "inset 0px -97px 28px -7px rgba(0,0,0,0.1)",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        borderRadius: 24,
    },
    badge: {
        backgroundColor: "rgba(107, 127, 109, 0.9)",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignSelf: "flex-start",
        zIndex: 2,
        top:100,
    },
    badgeText: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "bold",
        letterSpacing: 1.2,
    },
    contentArea: {
        zIndex: 2,
    },
    titulo: {
        fontSize: 32,
        color: "#FFF",
        fontFamily: "serif",
        lineHeight: 38,
        marginBottom: 8,
    },
    tituloItalic: {
        fontStyle: "italic",
    },
    descricao: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.85)",
        lineHeight: 20,
        marginBottom: 16,
    },
    autorDestaque: {
        fontWeight: "600",
        color: "#FFF",
    },
    readReview: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
    },
});
