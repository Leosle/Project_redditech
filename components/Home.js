import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, Button, FlatList, TouchableOpacity, Image } from "react-native"
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Video, AVPlaybackStatus } from 'expo-av';
import moment from "moment";

export default function Home({navigation}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getSubredditInfos();
    }, []);

    async function getSubredditInfos() {
        let BearerToken = await SecureStore.getItemAsync('secure_token');
        console.log(BearerToken)
        var config = {
            method: 'GET',
            url: 'https://oauth.reddit.com?raw_json=1',
            headers: { 
                'Authorization': 'Bearer ' + BearerToken, 
            }
        };
        axios(config)
        .then(function (response) {
            let data = response["data"]["data"]["children"]
            setData(data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <View style={styles.global}>
            <View style={styles.bloc1}>
                <View style={styles.container}>
                    <View style={styles.banner}>
                        <View style={styles.flex_banner}>
                            <Text style={styles.text_h1}>Actualités</Text>
                            <Text style={styles.text_h1}>Accueil</Text>
                            <Text style={styles.text_h1}>Populaire</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    renderItem={({ item }) => {
                        item.data.created = moment(item.data.created * 1000).format("DD/MM/YYYY")
                        return (
                            <View style={styles.bloc2}>
                                <View style={styles.bcontainer}>
                                    <Text style={{fontWeight: "bold", fontSize: 15}} onPress={() => navigation.navigate("AddPage", {message: item.data.subreddit_name_prefixed})}>{item.data.subreddit_name_prefixed}</Text>
                                    <Text>u/{item.data.author} ⚈ {item.data.created}</Text>
                                    <Text style={{fontWeight: "bold", marginTop: 22, fontSize: 20}} onPress={() => navigation.navigate("AddPage", {"message": "france"})}>{item.data.title}</Text>
                                    {/* <ScrollView style={{height: 230, marginTop: 20}}>
                                        <Text style={{fontSize: 15}}>{item.data.selftext}</Text>
                                    </ScrollView> */}
                                    <Image style={{width: "80%", height: "80%"}}
                                        source={{uri: item.data.url}}
                                    />
                                    <Text style={{marginTop: 250}}>Nb Comments : {item.data.num_comments}</Text>
                                    <Text>Nb Ups : {item.data.ups}</Text>
                                    {/* <Video
                                        ref={video}
                                        source={{
                                            uri: item.data.secure_media.reddit_video.fallback_url,
                                        }}
                                        useNativeControls
                                        resizeMode="contain"
                                        style={{ width: '100%', aspectRatio: 16/9, backgroundColor: '#000' }}
                                        isLooping
                                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                                    /> */}
                                </View>
                            </View>
                        )
                    }}
                />
            </ScrollView>
            <View style={navbar.container}>
                <View style={navbar.container_flex}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("HomePage")}>
                        <Image source={require('../assets/navbar/home.png')} style={navbar.image} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SearchPage")}>
                        <Image source={require('../assets/navbar/search.png')} style={navbar.image} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("WorksPage")}>
                        <Image source={require('../assets/navbar/add.png')} style={navbar.image} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ChatPage")}>
                        <Image source={require('../assets/navbar/chat.png')} style={navbar.image} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ProfilPage")}>
                        <Image source={require('../assets/navbar/notifications.png')} style={navbar.image} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    global: {
        backgroundColor: "#E5E5E5",
        width: "100%",
        height: "100%",
    },
    bloc1: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 135,
    },
    bloc2: {
        marginTop: 50,
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 400,
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 90,
        height: 650,
    },
    banner: {
        backgroundColor: "#FFFFFF",
        width: "100%",
    },
    flex_banner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text_h1: {
        fontSize: 18,
        color: "#6f6f6f",
        fontWeight: "bold",
    },
    bcontainer: {
        marginLeft: 10,
        marginRight: 20,
        display: "flex",
        height: "100%",
        alignItems: "center",
    }
});

const navbar = StyleSheet.create({
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