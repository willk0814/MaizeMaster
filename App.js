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
  // Fires everytime App Updates
  console.log('APP LOADED!!!')

  // ----State Variables----
  // Testing Session State Variables
  const [researcherID, setResearcherID] = useState('')
  const [sessionStart, setSessionStart] = useState('')

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
    console.log('New researcherID set')
    console.log(researcherID)
  }

  // Handle change Admin credentials
  const handleAdminCredentials = (user, pass) => {
    console.log('Admin credentials updated')
    setAdminID(user)
    setAdminPassword(pass)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} handleResearcherID={handleResearcherID} />}
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
  // 1. Have a list of potential devices outputted
  // 2. Have each be a clickable button

  // 3. Add plant ID text Input, QR code?
  // 6. Organize output screen

  // Create seperate componenets for:
    // 1. Connect device portion of screen
    // 2. Run test portion of screen


  // ----Home Screen----
  // 1. Organize layout a little better

  // ----Admin Acess Screen----
  // 1. Buttons for view logs
  // 2. Buttons for edit admin list`



