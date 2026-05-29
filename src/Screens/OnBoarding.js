import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList
} from "react-native";
import Colors from "../Colors.json";
import FirstSlide from "../../assets/OnBoarding/PrimeiroSlide.jpg";
import Logo from "../../assets/LogoPrincipal.png";
import Botao from "../Components/BotãoOnBoarding";

export default function OnBoarding({ navigation }) {
    return (
        <View>
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo} />
                <Text style={styles.text}>Explore os clássicos dos Vestibulares</Text>
            </View>
            <Botao texto="Próximo" onPress={() => navigation.navigate("OnBoarding2")} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "absolute",
        top: 15,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    logo: {
        width: 80,
        height: 80,    
    },
    text: {
        color: Colors.colors.offWhite,
        fontSize: 32,
        fontFamily: "PlayfairDisplay_400Regular",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 100,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.colors.azulEscuro,
        opacity: 0.5
    },
});