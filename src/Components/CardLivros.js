import react from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LivrosCard from "../src/LivrosCard.js";
import colors from "../src/Colors.json";

const CardLivros = () => {
    return(
        <View style={styles.container}>
            <FlatList
                data={LivrosCard}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={item.Imagem} style={styles.imagem} />
                        <Text style={styles.titulo}>{item.Titulo}</Text>
                        <Text style={styles.autor}>{item.Autor}</Text>
                        <Text style={styles.descricao}>{item.Descricao}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.offWhite,
    },
});

export default CardLivros;