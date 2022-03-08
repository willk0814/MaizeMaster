import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// React Navigate modules
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Created Components
import HomeScreen from './components/HomeScreen';
import TestingScreen from './components/TestingScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminAccess from './components/AdminAccess';

const Stack = createNativeStackNavigator();

export default function App() {
  // Runs everytime that App is loaded
  console.log('APP LOADED')

  // ----State Variables----
  // Testing Session State Variables
  const [researcherID, setResearcherID] = useState('')
  const [sessionStart, setSessionStart] = useState('')
  const [savedResearcherID, setSavedResearcherID] = useState(false)

  // Testing Device State Variables
  const [connected, setConnected] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [deviceID, setDeviceID] = useState('')

  // Admin Credentials State Variables
  const [adminID, setAdminID] = useState('')
  const [adminPassword, setAdminPassword] = useState('')


  // Handle Input Researcher ID
  const handleResearcherID = (value) => {
    setResearcherID(value)
    if (value != "") {
      setSavedResearcherID(true)
    } else {
      setSavedResearcherID(false)
    }
  }

  // Handle change Admin credentials
  const handleAdminCredentials = (user, pass) => {
    setAdminID(user)
    setAdminPassword(pass)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props}
            handleResearcherID={handleResearcherID}
            savedResearcherID={savedResearcherID} />}
        </Stack.Screen>
        <Stack.Screen name="Testing" component={TestingScreen} />
        <Stack.Screen name="Admin">
          {props => <AdminLoginScreen {...props} handleAdminChange={handleAdminCredentials} />}
        </Stack.Screen>
        <Stack.Screen name="AdminAcess" component={AdminAccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


  // To-Do's for Tomorrow:
  // ----Testing Screen----



  // ----Home Screen----
  // 1. Organize layout a little better

  // ----Admin Acess Screen----




