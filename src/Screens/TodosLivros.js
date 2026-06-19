import React from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons
 } from "@expo/vector-icons";
import Colors from "../Colors.json";
import LivrosData from "../LivrosCard.js";
import CardLivros from "../Components/CardLivros";

const TelaTodosOsLivros = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons
 name="arrow-back" size={28} color={Colors.colors.azulEscuro} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Todos os livros</Text>
            </View>
            <View style={styles.containerLivros}>
                <FlatList
                    data={LivrosData}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listaConteudo}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            activeOpacity={0.85}
                            onPress={() =>
                                navigation.navigate("ResenhaLiteraria", { item })
                            }
                        >
                            <CardLivros item={item} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
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
        marginBottom: 20,
    },
    backButton: {
        padding: 4,
        marginLeft: -4,
    },
    headerTitle: {
        fontSize: 22,
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
    },
    containerLivros: {
        flex: 1,
        width: "100%",
    },
    listaConteudo: {
        paddingBottom: 30,
        alignItems: "center",
    },
    itemContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
});

export default TelaTodosOsLivros;
