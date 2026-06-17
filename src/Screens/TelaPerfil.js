import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, EvilIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Colors from "../Colors.json";
import { useFavoritos } from "../FavoritosContext";
import CardLivros from "../Components/CardLivros";

const TelaPerfil = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const { favoritos } = useFavoritos();

    useEffect(() => {
        async function carregar() {
            try {
                const json = await AsyncStorage.getItem("@usuario");
                if (json) {
                    const obj = JSON.parse(json);
                    setNome(obj.nome || "");
                    setFotoPerfil(obj.foto || null);
                }
            } catch (e) {
                console.log("Erro ao carregar usuário:", e);
            }
        }
        carregar();
    }, []);

    const escolherFoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permissão necessária", "Precisamos acessar sua galeria para definir uma foto de perfil.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setFotoPerfil(uri);
            // Persiste a foto junto com os dados do usuário
            try {
                const json = await AsyncStorage.getItem("@usuario");
                const obj = json ? JSON.parse(json) : {};
                await AsyncStorage.setItem("@usuario", JSON.stringify({ ...obj, foto: uri }));
            } catch (e) {
                console.log("Erro ao salvar foto:", e);
            }
        }
    };

    const sair = () => {
        Alert.alert(
            "Encerrar sessão",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("@usuario");
                        navigation.reset({ index: 0, routes: [{ name: "Inicial" }] });
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={28} color={Colors.colors.azulEscuro} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meu Perfil</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={escolherFoto} activeOpacity={0.8}>
                        {fotoPerfil ? (
                            <Image source={{ uri: fotoPerfil }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarLetra}>
                                    {nome ? nome.charAt(0).toUpperCase() : "?"}
                                </Text>
                            </View>
                        )}
                        <View style={styles.editarIcone}>
                            <Feather name="camera" size={14} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.nomeUsuario}>{nome}</Text>
                    <Text style={styles.subNome}>Leitor(a)</Text>
                </View>

                {/* Separador */}
                <View style={styles.separador} />

                {/* Livros Favoritos */}
                <View style={styles.secao}>
                    <View style={styles.secaoHeader}>
                        <EvilIcons name="star" size={24} color={Colors.colors.azulEscuro} />
                        <Text style={styles.secaoTitulo}>Livros Favoritos</Text>
                    </View>

                    {favoritos.length === 0 ? (
                        <View style={styles.vazioContainer}>
                            <EvilIcons name="star" size={48} color={Colors.colors.azulClaro} />
                            <Text style={styles.vazioTexto}>
                                Nenhum livro favoritado ainda.{"\n"}Toque na estrela de qualquer livro!
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={favoritos}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 4 }}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={() => navigation.navigate("ResenhaLiteraria", { item })}
                                >
                                    <CardLivros item={item} />
                                </TouchableOpacity>
                            )}
                            scrollEnabled={favoritos.length > 1}
                        />
                    )}
                </View>

                {/* Separador */}
                <View style={styles.separador} />

                {/* Botão Sair */}
                <View style={styles.secao}>
                    <TouchableOpacity style={styles.botaoSair} onPress={sair} activeOpacity={0.85}>
                        <MaterialIcons name="logout" size={20} color="#fff" />
                        <Text style={styles.botaoSairTexto}>Encerrar sessão</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.offWhite,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 10,
        marginBottom: 8,
    },
    backButton: {
        padding: 4,
        marginLeft: -4,
    },
    headerTitle: {
        fontSize: 20,
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
    },
    scroll: {
        paddingBottom: 50,
    },

    /* Avatar */
    avatarContainer: {
        alignItems: "center",
        paddingVertical: 32,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: Colors.colors.azulClaro,
    },
    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: Colors.colors.azulClaro,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: Colors.colors.azulMedio,
    },
    avatarLetra: {
        fontSize: 46,
        color: Colors.colors.azulEscuro,
        fontFamily: "Inter_700Bold",
    },
    editarIcone: {
        position: "absolute",
        bottom: 4,
        right: 4,
        backgroundColor: Colors.colors.azulMedio,
        borderRadius: 14,
        padding: 5,
        borderWidth: 2,
        borderColor: Colors.colors.offWhite,
    },
    nomeUsuario: {
        marginTop: 14,
        fontSize: 26,
        fontFamily: "serif",
        color: Colors.colors.azulEscuro,
    },
    subNome: {
        fontFamily: "Inter_400Regular",
        fontSize: 13,
        color: Colors.colors.azulMedio,
        fontStyle: "italic",
        marginTop: 2,
    },

    /* Separador */
    separador: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.colors.azulClaro,
        marginHorizontal: 24,
        marginBottom: 24,
    },

    /* Seção */
    secao: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    secaoHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 6,
    },
    secaoTitulo: {
        fontFamily: "serif",
        fontSize: 20,
        color: Colors.colors.azulEscuro,
        fontWeight: "600",
    },

    /* Vazio */
    vazioContainer: {
        alignItems: "center",
        paddingVertical: 24,
        gap: 10,
    },
    vazioTexto: {
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        lineHeight: 22,
    },

    /* Botão Sair */
    botaoSair: {
        backgroundColor: Colors.colors.azulEscuro,
        borderRadius: 30,
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    botaoSairTexto: {
        color: Colors.colors.offWhite,
        fontSize: 16,
        fontFamily: "Inter_700Bold",
    },
});

export default TelaPerfil;
