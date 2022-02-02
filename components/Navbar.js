import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Navbar( {navigation} ) {
    return (
        <View style={style.container}>
            <View style={style.container_flex}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("HomePage")}>
                    <Image source={require('../assets/navbar/home.png')} style={style.image} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SearchPage")}>
                    <Image source={require('../assets/navbar/search.png')} style={style.image} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("WorksPage")}>
                    <Image source={require('../assets/navbar/add.png')} style={style.image} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ChatPage")}>
                    <Image source={require('../assets/navbar/chat.png')} style={style.image} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ProfilPage")}>
                    <Image source={require('../assets/navbar/notifications.png')} style={style.image} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    container_flex: {
        marginLeft: 30,
        marginRight: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "90%",
    },
    image: {
        width: 30,
        height: 30,   
    }
})