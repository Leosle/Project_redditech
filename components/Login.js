import React from "react"
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native"
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as qs from 'qs'
import base64 from 'react-native-base64'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
    tokenEndpoint: "https://www.reddit.com/api/v1/access_token"
};

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

const getToken = (code) => {
    var data = qs.stringify({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'exp://172.20.10.2:19000'
    });
    var conf = {
        method: 'post',
        url: "https://www.reddit.com/api/v1/access_token",
        headers: {
            "Authorization": "Basic " + base64.encode("srCcjg4oGyiC2lmUFZnyFg:") + ""
        },
        data : data
    };
    axios(conf)
    .then(function (response) {
        console.log("[STEP 2] : " + response.data['access_token'])
        save('secure_token', response.data['access_token']);
    })
    .catch(function (error) {
        alert(error)
    });
}

export default function Login({ navigation }) {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'srCcjg4oGyiC2lmUFZnyFg',
            response_type: 'code',
            state: 'Redditech',
            duration: 'permanent',
            scopes: ["identity", "edit", "flair", "history", "modconfig", "modflair", "modlog", "modposts", "modwiki", "mysubreddits", "privatemessages", "read", "report", "save", "submit", "subscribe", "vote", "wikiedit", "wikiread", "account"],
            redirectUri: makeRedirectUri({
                native: 'exp://172.20.10.2:19000',
          }),
        },
        discovery
      );
      
      React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log("[STEP 1] : " + code)
            getToken(code)
            navigation.navigate('HomePage')
          }
      }, [response]);
    return (
        <View style={style.container}>
        <Image source={require('../assets/reddit.png')} style={style.image} />
            <Text style={style.title}>Redditech</Text>
            <Text style={style.h2}>Se connecter à votre compte</Text>
            <View style={style.container_description}>
                <Text>Si vous n’avez pas de compte, vous pouvez en créer un en cliquant sur <Text style={style.link}>s’inscrire.</Text></Text>
                <Text>En continuant, vous acceptez nos <Text style={style.link}>
                    Conditions générales d’utilisation</Text> et notre 
                    <Text style={style.link}> Politique de confidentialité.</Text></Text>
            </View>
            <View style={style.social}>
                <Button color="#004596" title="Continuer avec Reddit" accessibilityLabel="Tant pis" onPress={() => {
                    promptAsync();
                    }}/>
            </View>
            <Text style={{marginTop: 30}}>ou</Text>
            <View style={{marginTop: 20}}>
                <TextInput style={style.input} placeholder="Pseudo" placeholderTextColor={'black'}></TextInput>
                <TextInput style={style.input} placeholder="Mot de passe" placeholderTextColor={'black'}></TextInput>
            </View>
            <View style={style.buttonstyle}>
                <Button color="#FFFFFF" title="Se connecter" accessibilityLabel="Tant pis" onPress={()=>navigation.navigate('Logout')}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginTop: 12,
        fontSize: 35,
        fontWeight: 'bold'
    },
    h2: {
        marginTop: 35,
        fontSize: 23,
        fontWeight: 'bold'
    },
    image: {
        width: 50,
        height: 50,
        alignItems: 'center'
    },
    container_description: {
        marginTop: 50
    },
    link: {
        color: "#043F84"
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius: 23,
        backgroundColor: "#C4C4C4",
        opacity: 0.25
    },
    buttonstyle: {
        width: 300,
        height: 40,
        borderRadius: 23,
        backgroundColor: "#FF4500",
        marginTop: 80
    },
    social: {
        width: 300,
        height: 40,
        borderRadius: 23,
        marginTop: 50,
        borderWidth: 2,
        color: "#004596"
    }
})