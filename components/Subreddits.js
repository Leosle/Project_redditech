import React, {useState, useEffect} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native"
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function Add({route, navigation}) {
    const [username, getUsername] = useState('');
    const [description, getDescription] = useState('');
    const [icon_img, getIconImg] = useState('');
    const [subscribers, getSubscribers] = useState('');
    const [isSubscribers, getIsSubscribers] = useState('');
    const params = JSON.stringify(route.params);
    var obj = JSON.parse(params);
    const subreddit = obj.message
    console.log(subreddit)

    useEffect(() => {
        getSubsInfos();
    }, []);

    function checkSubOrNot() {
        console.log(isSubscribers)
        if (isSubscribers == "Subscribe")
            setSub("sub", subreddit.substring(2))
        else if (isSubscribers == "Unsubscribe")
            setSub("unsub", subreddit.substring(2))
        else
            return
    }

    async function getSubsInfos() {
        let BearerToken = await SecureStore.getItemAsync('secure_token');
        var config = {
            method: 'GET',
            url: "https://oauth.reddit.com/" + subreddit + "/about?raw_json=1",
            headers: { 
                'Authorization': 'Bearer ' + BearerToken, 
            }
        };
        axios(config)
        .then(function (response) {

            let pseudo_reddit = response["data"]["data"]["display_name_prefixed"];
            let description = response["data"]["data"]["public_description"]
            let icon_img = response["data"]["data"]["icon_img"]
            if (icon_img == "") {
                icon_img = response["data"]["data"]["community_icon"]
            }
            let subscribers = response["data"]["data"]["subscribers"]
            let isSubscribers = response["data"]["data"]["user_is_subscriber"]
            //  mobile_banner_image
            if (isSubscribers == false) {
                getIsSubscribers("Subscribe")
            } else {
                getIsSubscribers("Unsubscribe")
            }
            getUsername(pseudo_reddit)
            getDescription(description)
            getIconImg(icon_img)
            getSubscribers(subscribers)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async function setSub(value, subreddit) {
        let BearerToken = await SecureStore.getItemAsync('secure_token');
        var config = {
            method: 'POST',
            url: 'https://oauth.reddit.com/api/subscribe',
            headers: { 
                'Authorization': 'Bearer ' + BearerToken, 
            },
            data: "action=" + value + "&sr_name=" + subreddit,
        };
        axios(config)
        .then(function (response) {
            getSubsInfos();
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
                        <Text style={styles.name_profil}>{username}</Text>
                        <Text>{subscribers} subscribers</Text>
                    </View>
                    <View style={styles.button_edit}>
                        <TouchableOpacity>
                            <Button title={isSubscribers} color="white" onPress={() => {checkSubOrNot()}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flex_infos}>
                    <Text>{description}</Text>
                </View>
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
        height: '91%',
    },
    flex_infos: {
        height: 150,
        display: "flex",
        flexDirection: "row",
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