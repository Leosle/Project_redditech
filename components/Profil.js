import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Image, Button, Alert, ScrollView, TouchableOpacity} from "react-native"
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import moment from "moment";
import * as SecureStore from 'expo-secure-store';
import Navbar from "./Navbar";
import { FlatList } from "react-native-gesture-handler";

export default function App({ navigation }) {
    const [data, setData] = useState([]);
    const [username, getUsername] = useState('');
    const [pseudo, getPseudo] = useState('');
    const [description, getDescription] = useState('');
    const [icon_img, getIconImg] = useState('');
    const [creationDate, getCreationDate] = useState('');
    const [subscribers, getSubscribers] = useState('');

    useEffect(() => {
        getProfilInfos();
    }, []);
    getSubsInfosOnProfil();

    async function getProfilInfos() {
        let BearerToken = await SecureStore.getItemAsync('secure_token');
        var config = {
            method: 'GET',
            url: 'https://oauth.reddit.com/api/v1/me?raw_json=1',
            headers: { 
                'Authorization': 'Bearer ' + BearerToken, 
            }
        };
        axios(config)
        .then(function (response) {
            let pseudo_reddit = response["data"]["subreddit"]["display_name_prefixed"];
            let pseudo = response["data"]["name"];
            let description = response["data"]["subreddit"]["public_description"]
            let icon_img = response["data"]["icon_img"]
            let created = response["data"]["created"]
            let created_moment = moment(created * 1000).format("DD/MM/YYYY")
            let subscribers = response["data"]["subreddit"]["subscribers"]
            getUsername(pseudo_reddit)
            getPseudo(pseudo)
            getDescription(description)
            getIconImg(icon_img)
            getCreationDate(created_moment)
            getSubscribers(subscribers)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async function getSubsInfosOnProfil() {
        let BearerToken = await SecureStore.getItemAsync('secure_token');
        var config = {
            method: 'GET',
            url: "https://oauth.reddit.com/user/" + pseudo + "?raw_json=1",
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
        <View>
            <View style={styles.container}>
                <View style={styles.profil}>
                    <View style={styles.infos}>
                        <Image
                            style={styles.profil_picture}
                            source={{uri: icon_img}}
                        />
                        <Text style={styles.name_profil}>{pseudo}</Text>
                        <Text>{username}</Text>
                    </View>
                    <View style={styles.button_edit}>
                        <TouchableOpacity>
                            <Button title="Modifier" color="white" onPress={() => {navigation.navigate('EditProfilPage')}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flex_infos}>
                    <Text>{description}</Text>
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Text style={{fontWeight: 'bold'}}>Membre depuis: </Text>
                        <Text>{creationDate}</Text>
                    </View>
                    <Text>{subscribers} abonné(e) ></Text>
                </View>
            </View>
            <View style={styles.menu}>
                <View style={styles.menuContainer}>
                    <Button
                        title="Publications"
                        color="black"
                        onPress={() => alert('WIP')}
                    />
                    <Button
                        title="Commentaires"
                        color="black"
                        onPress={() => alert('WIP')}
                    />
                    <Button
                        title="A propos"
                        color="black"
                        onPress={() => alert('WIP')}
                    />
                </View>
            </View>
            <View>
                <ScrollView style={styles.slider}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                // item.data.url
                                <View style={styles.posts}>
                                    <Text style={{fontWeight: 'bold', marginTop: 10 }}>{item.data.title}</Text>
                                    <Text style={{fontWeight: 'bold', marginTop: 10 }}>Posted by {item.data.subreddit_name_prefixed} on {item.data.created}</Text>
                                    <Text style={{color: 'black'}}>Comments : {item.data.num_comments}</Text>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </View>
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
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 70,
    },
    flex_infos: {
        height: 150,
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profil_picture: {
        width: 76,
        height: 74,
        borderRadius: 50,
    },
    name_profil: {
        fontSize: 23,
        fontWeight: "bold",
    },
    button_edit: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FF4500',
        width: 135,
        height: 34,
        borderRadius: 23,
    },
    profil: {
        flexDirection: "row",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    menu: {
        borderTopWidth: 1,
        marginTop: 30,
    },
    menuContainer: {
        marginLeft: 10,
        marginRight: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",   
    },
    slider: {
        backgroundColor: '#E5E5E5',
        width: '100%',
    },
    posts: {
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 78,
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