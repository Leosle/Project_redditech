import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native"
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

export default function App({navigation}) {
    const [pseudo, getPseudo] = useState('');
    const [description, getDescription] = useState('');
    const [icon_img, getIconImg] = useState('');

    useEffect(() => {
        getProfilInfos();
    }, []);

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
            let pseudo = response["data"]["name"];
            let description = response["data"]["subreddit"]["public_description"]
            let icon_img = response["data"]["icon_img"]
            getPseudo(pseudo)
            console.log(pseudo)
            getDescription(description)
            getIconImg(icon_img)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <View style={{backgroundColor: "#ffffff"}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {navigation.navigate('ProfilPage')}}>
                        <Image source={require('../assets/Profil/back.png')} style={styles.profil_back}/>
                    </TouchableOpacity>
                    <View style={styles.profil_header}>
                        <Image
                            style={styles.profil_picture}
                            source={{uri: icon_img}}
                        />
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>{pseudo}</Text>
                    </View>
                    <TouchableOpacity>
                            <Text style={styles.termined_button}>Terminé</Text>
                    </TouchableOpacity>
                </View>
                <DismissKeyboard>
                    <View style={styles.data_input}>
                        <TextInput style={styles.both_input} defaultValue={pseudo} placeholderTextColor={'black'}></TextInput>
                        <TextInput style={styles.both_input} placeholder="Site Web" placeholderTextColor={'black'}></TextInput>
                        <TextInput style={styles.description_input} multiline={true} defaultValue={description} placeholderTextColor={'black'}></TextInput>
                    </View>
                </DismissKeyboard>
                <View style={styles.picture_end}>
                    <Image source={require('../assets/icon_reddit.png')} style={styles.size_picture}/>
                </View>
                <StatusBar style="auto"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 70,
    },
    header: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 100,
    },
    profil_picture: {
        width: 76,
        height: 74,
        borderRadius: 50,
    },
    profil_back: {
        width: 35,
        height: 28,
    },
    profil_header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 25,
    },
    termined_button: {
        fontSize: 16,
        color:'#004596',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    data_input: {
        width: '100%',
        height: 350,
        marginTop: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    both_input: {
        width: 300,
        height: 40,
        padding: 10,
        borderRadius: 23,
        backgroundColor: "#C4C4C4",
        opacity: 0.35
    },
    description_input: {
        width: 300,
        height: 150,
        padding: 10,
        paddingTop: 12,
        borderRadius: 23,
        backgroundColor: "#C4C4C4",
        opacity: 0.35,
    },
    picture_end: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    size_picture: {
        width: 201,
        height: 100,
        marginTop: 30,
    }
  });