import React, {useState, useEffect} from "react"
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from "react-native"
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Button } from "react-native-elements/dist/buttons/Button";

export default function Chat({navigation}) {
    const [videoAutoplay, getVideoAutoplay] = useState('');
    const [privateFeeds, getPrivateFeeds] = useState('');
    const [over18, getOver18] = useState('');
    const [emailChatRequest, getEmailChatRequest] = useState('');
    const [storeVisits, getStoreVisits] = useState('');
    const [beta, getBeta] = useState('');
    const [threadedMessages, getThreadedMessages] = useState('');
    const [emailCommentReply, getEmailCommentReply] = useState('');
    const [activityRelevantAds, getActivityRelevantAds] = useState('');
    const [emailMessages, getEmailMessages] = useState('');
    const [profileOptOut, getProfileOptOut] = useState('');
    const toggleSwitch1 = () => patchPrefsInfos("video_autoplay", !videoAutoplay);
    const toggleSwitch2 = () => patchPrefsInfos("private_feeds", !privateFeeds);
    const toggleSwitch3 = () => patchPrefsInfos("over_18", !over18);
    const toggleSwitch4 = () => patchPrefsInfos("email_chat_request", !emailChatRequest);
    const toggleSwitch5 = () => patchPrefsInfos("store_visits", !storeVisits);
    const toggleSwitch6 = () => patchPrefsInfos("beta", !beta);
    const toggleSwitch7 = () => patchPrefsInfos("threaded_messages", !threadedMessages);
    const toggleSwitch8 = () => patchPrefsInfos("email_comment_reply", !emailCommentReply);
    const toggleSwitch9 = () => patchPrefsInfos("activity_relevant_ads", !activityRelevantAds);
    const toggleSwitch10 = () => patchPrefsInfos("email_messages", !emailMessages);
    const toggleSwitch11 = () => patchPrefsInfos("profile_opt_out", !profileOptOut);
    useEffect(() => {
        getPrefsInfos();
    }, []);

    async function patchPrefsInfos(my_key, value) {
        let BearerToken = await SecureStore.getItemAsync('secure_token');
        console.log(value)
        var obj = {};
        obj[my_key] = value;
        var config = {
            method: 'PATCH',
            url: 'https://oauth.reddit.com/api/v1/me/prefs',
            headers: { 
                'Authorization': 'Bearer ' + BearerToken,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(obj)
        };
        axios(config)
        .then(function (response) {
            getPrefsInfos();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async function getPrefsInfos() {
        let BearerToken = await SecureStore.getItemAsync('secure_token');
        var config = {
            method: 'GET',
            url: 'https://oauth.reddit.com/api/v1/me/prefs?raw_json=1',
            headers: { 
                'Authorization': 'Bearer ' + BearerToken, 
            }
        };
        axios(config)
        .then(function (response) {
            let videoAutoplay = response["data"]["video_autoplay"]
            let privateFeeds = response["data"]["private_feeds"]
            let over18 = response["data"]["over_18"]
            let emailChatRequest = response["data"]["email_chat_request"]
            let storeVisits = response["data"]["store_visits"]
            let beta = response["data"]["beta"]
            let threadedMessages = response["data"]["threaded_messages"]
            let emailCommentReply = response["data"]["email_comment_reply"]
            let activityRelevantAds = response["data"]["activity_relevant_ads"]
            let emailMessages = response["data"]["email_messages"]
            let profileOptOut = response["data"]["profile_opt_out"]
            getVideoAutoplay(videoAutoplay)
            getPrivateFeeds(privateFeeds)
            getOver18(over18)
            getEmailChatRequest(emailChatRequest)
            getStoreVisits(storeVisits)
            getBeta(beta)
            getThreadedMessages(threadedMessages)
            getEmailCommentReply(emailCommentReply)
            getActivityRelevantAds(activityRelevantAds)
            getEmailMessages(emailMessages)
            getProfileOptOut(profileOptOut)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <View style={{marginTop: 40}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {navigation.navigate('ProfilPage')}}>
                    <Image source={require('../assets/Profil/back.png')} style={styles.profil_back}/>
                </TouchableOpacity>
                <Text style={styles.h1Text}>Paramètres</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Video autoplay</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={videoAutoplay ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch1}
                    value={videoAutoplay}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Private Feeds</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={privateFeeds ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch2}
                    value={privateFeeds}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Over18</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={over18 ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch3}
                    value={over18}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Email Chat Request</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={emailChatRequest ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch4}
                    value={emailChatRequest}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Store Visits</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={storeVisits ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch5}
                    value={storeVisits}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Beta</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={beta ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch6}
                    value={beta}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Threaded Messages</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={threadedMessages ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch7}
                    value={threadedMessages}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Email Comment Reply</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={emailCommentReply ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch8}
                    value={emailCommentReply}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Activity Relevant Ads</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={activityRelevantAds ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch9}
                    value={activityRelevantAds}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Email Messages</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={emailMessages ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch10}
                    value={emailMessages}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.optionsText}>Profile Opt Out</Text>
                    <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={profileOptOut ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch11}
                    value={profileOptOut}
                    />
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
    header: {
        marginLeft: 20,
        display: "flex",
        flexDirection: "row",
        height: 100,
        width: "65%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    h1Text: {
        fontSize: 30,
    },
    profil_back: {
        width: 35,
        height: 28,
    },
    optionsText: {
        fontSize: 30,
    },
    box: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        height: "87%",
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