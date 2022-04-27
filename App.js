// React Native Imports
import React, { useState, useEffect } from 'react'
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
// import computeSourceMap from 'sucrase/dist/computeSourceMap';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { generate } from 'fast-glob/out/managers/tasks';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  // Runs everytime that App is loaded
  console.log('APP LOADED')

  // ----State Variables----
  // Testing Session State Variables
  const [researcherID, setResearcherID] = useState('')
  const [sessionStart, setSessionStart] = useState('')
  const [savedResearcherID, setSavedResearcherID] = useState(false)


  // Single Test SV
  const [currentTestData, setCurrentTestData] = useState([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])

  // SV to hold whether or not session has begun and if it contains at least one test
  const [sessionStarted, setSessionStarted] = useState(false)
  const [nonEmptySession, setNonEmptySession] = useState(false)

  // Testing Device State Variables
  const [connected, setConnected] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [deviceID, setDeviceID] = useState('')


  // SV to hold available sessions
  const [availableSessions, setAvailableSessions] = useState([])

  // SV to hold available sessions data
  const [availableSessionsData, setAvailableSessionsData] = useState([[]])

  // SV to hold both above in a dictionary
  const [dataDict, setDataDict] = useState({})



  // Async Store Data Function - JSON object
  const storeData = async (storageKey, value) => {
    try {
      await AsyncStorage.setItem(storageKey, value)
    } catch (err) {
      console.log(err)
    }
  }


  // Handling search for records
  // This function should return 2 arrays, one of the keys, and one of the data
  const handleSearchForRecords = async () => {
    let tmpArray = []
    let tmpAvailableSessions = null
    try {
      tmpAvailableSessions = JSON.parse(await AsyncStorage.getItem('sessions')).split('$$$')
      // tmpArray = availableSessions.replace('\/\g', '').split('$$$')
      // console.log(availableSessions)
    } catch (err) {
      console.log(err)
    }
    // console.log(availableSessions)
    setAvailableSessions(tmpAvailableSessions)

    let tmpDict = {}

    for (let i = 0; i < availableSessions.length; i++) {
      // search each key for the corresponding record
      let tmpSessionData = JSON.parse(await AsyncStorage.getItem(availableSessions[i]))

      // console.log(tmpSessionData)

      // let tmpYData = []
      // for (let i = 0; i < tmpSessionData.length; i++) {
      //   tmpYData[i] = tmpSessionData[i][1]
      // }

      // // only hits on the first pass
      // if (availableSessionsData == null) {
      //   setAvailableSessionsData(tmpSessionData)

      // } else {
      //   let tmpAvailableSessionsData = availableSessionsData
      //   tmpAvailableSessionsData.push(tmpSessionData)
      //   setAvailableSessionsData(tmpAvailableSessionsData)
      // }
      // add each element to the data dict
      tmpDict[availableSessions[i]] = tmpSessionData

    }

    // console.log(tmpDict)
    setDataDict(tmpDict)
  }


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




  // Running Test - sets current Test Data 
  const handleRunTest = () => {
    var tmpData = new Array();
    for (let i = 0; i < 9; i++) {
      let x = i;
      let y = Math.floor(Math.random() * 10);
      tmpData.push([x, y]);
    }
    setCurrentTestData(tmpData)

  }

  const handleAcceptResult = async () => {
    let key = handleGenerateTestKey()
    let currentSessions = null
    try {
      currentSessions = JSON.parse(await AsyncStorage.getItem('sessions'))
    } catch (err) {
      console.log(err)
    }
    // console.log(currentSessions)
    if (currentSessions == null) {
      currentSessions = key
    } else {

      currentSessions += '$$$' + key
    }
    let tmp = JSON.stringify(currentSessions)
    // console.log(tmp)
    storeData('sessions', tmp)
    storeData(key, JSON.stringify(currentTestData))
    setCurrentTestData([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
  }


  const handleGenerateTestKey = () => {
    let tmpKey = ''
    let dateVal = generateTime()
    let device = deviceID
    let researcher = researcherID

    tmpKey = 'Date: ' + dateVal + ', Device: ' + device + ', Researcher: ' + researcher

    return tmpKey
  }



  const handleRejectResult = () => {
    setCurrentTestData([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
  }



  const generateTime = () => {
    // create the date value
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let sec = new Date().getSeconds();
    let dateVal = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
    return dateVal
  }


  const handleEmptyStorage = async () => {
    await AsyncStorage.removeItem('sessions')
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
            // sessionData={sessionData}
            // endSession={endSession}
            handleRunTest={handleRunTest}
            currentTestData={currentTestData}
            handleAcceptResult={handleAcceptResult}
            handleRejectResult={handleRejectResult} />}
        </Stack.Screen>
        <Stack.Screen name="Admin">
          {props => <AdminLoginScreen {...props}
            handleAdminChange={handleAdminCredentials}
            handleSearchForRecords={handleSearchForRecords}
            emptyStorage={handleEmptyStorage}
            availableLogs={availableSessions}
            availableSessionsData={availableSessionsData}
            dataDict={dataDict} />}
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





