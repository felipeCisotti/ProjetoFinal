import React, { useEffect } from "react";
import {
    View,
    Image,
    StyleSheet,
} from "react-native";
import Colors from "../Colors.json";

export default function Inicial({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("OnBoarding");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/LogoPrincipal.png")} style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.azulEscuro,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});
