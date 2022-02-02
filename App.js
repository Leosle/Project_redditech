import React from 'react';
import { View } from 'react-native';
import Login from './components/Login'
import Works from './components/Works'
import Home from './components/Home'
import Search from './components/Search'
import Add from './components/Subreddits'
import Chat from './components/Chat'
import Profil from './components/Profil'
import Navbar from './components/Navbar'
import EditProfil from './components/EditProfil'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage" screenOptions={{headerShown: false}}>
        <Stack.Screen
            name="LoginPage"
            component={Login}>
        </Stack.Screen>
        <Stack.Screen
            name="Navbar"
            component={Navbar}>
        </Stack.Screen>
        <Stack.Screen
            name="WorksPage"
            component={Works}>
        </Stack.Screen>
        <Stack.Screen
            name="HomePage"
            component={Home}>
        </Stack.Screen>
        <Stack.Screen
            name="SearchPage"
            component={Search}>
        </Stack.Screen>
        <Stack.Screen
            name="AddPage"
            component={Add}>
        </Stack.Screen>
        <Stack.Screen
            name="ChatPage"
            component={Chat}>
        </Stack.Screen>
        <Stack.Screen
            name="ProfilPage"
            component={Profil}>
        </Stack.Screen>
        <Stack.Screen
            name="EditProfilPage"
            component={EditProfil}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}