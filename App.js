import React, { useState } from 'react'
import { StatusBar, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// React Navigate modules
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


// Created Components
import HomeScreen from './components/HomeScreen';
import TestingScreen from './components/TestingScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import AdminAccess from './components/AdminAccess';
import computeSourceMap from 'sucrase/dist/computeSourceMap';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  // Runs everytime that App is loaded
  console.log('APP LOADED')

  // ----State Variables----
  // Testing Session State Variables
  const [researcherID, setResearcherID] = useState('')
  const [sessionStart, setSessionStart] = useState('')
  const [savedResearcherID, setSavedResearcherID] = useState(false)


  // Testing Session Data SV 
  const [sessionData, setSessionData] = useState([[[]]])

  // Single Test SV
  const [currentTest, setCurrentTest] = useState([[]])
  console.log('Frop App.js')
  console.log(sessionData)

  // Testing Device State Variables
  const [connected, setConnected] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [deviceID, setDeviceID] = useState('')


  // Handle Input Researcher ID
  const handleResearcherID = (value) => {
    setResearcherID(value)
    console.log(researcherID)
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

  const handleRunTest = () => {
    var tmpData = new Array();
    for (let i = 0; i < 5; i++) {
      let x = i;
      let y = i * i;
      tmpData.push([x, y]);
    }
    let tmp = sessionData
    tmp.push(tmpData)
    setSessionData(tmp)

  }


  const endSession = () => {
    setSessionData([[[]]])
  }


  const handleGenerateSession = () => {

    // create the date value
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let sec = new Date().getSeconds();
    let dateVal = 'Date: ' + date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;


    // create the researcher value
    let researcherVal = 'Researcher: ' + researcherID

    // create the device value
    let deviceVal = 'Device ID: ' + deviceID

    // set the session data SV & print to test
    setSessionData([[[dateVal, researcherVal, deviceVal]]])

  }

  // this func will update the session data if the researcher changes the research device
  const handleChangeDevice = () => {

  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props}
            handleResearcherID={handleResearcherID}
            savedResearcherID={savedResearcherID}
            researcherID={researcherID} />}
        </Stack.Screen>
        <Stack.Screen name="Testing">
          {props => <TestingScreen {...props}
            researcherID={researcherID}
            sessionData={sessionData}
            handleGenerateSession={handleGenerateSession}
            endSession={endSession}
            handleRunTest={handleRunTest} />}
        </Stack.Screen>
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





