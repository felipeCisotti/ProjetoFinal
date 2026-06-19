import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState([]);


    useEffect(() => {
        async function carregar() {
            try {
                const json = await AsyncStorage.getItem("@favoritos");
                if (json) setFavoritos(JSON.parse(json));
            } catch (e) {
                console.log("Erro ao carregar favoritos:", e);
            }
        }
        carregar();
    }, []);


    useEffect(() => {
        AsyncStorage.setItem("@favoritos", JSON.stringify(favoritos)).catch(
            (e) => console.log("Erro ao salvar favoritos:", e)
        );
    }, [favoritos]);

    const toggleFavorito = (item) => {
        setFavoritos((prev) => {
            const jaFavorito = prev.some((f) => f.id === item.id);
            if (jaFavorito) {
                return prev.filter((f) => f.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const isFavorito = (id) => favoritos.some((f) => f.id === id);

    return (
        <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export const useFavoritos = () => useContext(FavoritosContext);
