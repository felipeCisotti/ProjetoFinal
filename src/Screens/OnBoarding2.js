import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import Colors from "../Colors.json";
import SecondSlide from "../../assets/OnBoarding/SegundoSlide.jpg";
import Logo from "../../assets/LogoPrincipalAzul.png";
import Botao from "../Components/BotãoOnBoarding";

export default function OnBoarding2({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo} />
                <Text style={styles.text}>Transforme leitura em aprovação</Text>
            </View>
            <Botao texto="Próximo" onPress={() => navigation.navigate("HomeScreen")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.offWhite,
    },
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
        color: Colors.colors.azulEscuro,
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