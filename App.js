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


  // Testing Session Data SV 
  // const [sessionData, setSessionData] = useState({
  //   researcher: '',
  //   time: '',
  //   device: ''
  // })

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
  const [availableSessions, setAvailableSessions] = useState('')

  // Structure of async storage
  // 1. Some general keyword will search for all available sessions

  // 2. These session ids will be stored in array 

  // 3. Each of these session ids will function as a keyword for a set of test keys

  // 4. Each set of test keys will be stored in array

  // 5. Each test key will yield an array representing that tests data


  // The above architecture requires that 


  // Async Store Data Function - JSON object
  const storeData = async (storageKey, value) => {
    try {
      await AsyncStorage.setItem(storageKey, value)
    } catch (err) {
      console.log(err)
    }
  }

  // const getData = async (storage_Key) => {
  //   try {
  //     const value = await AsyncStorage.getItem(storage_Key)
  //     if (value != null) {
  //       // console.log('From getData:')
  //       // console.log(value)
  //       return value
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // Handling search for records
  const handleSearchForRecords = async () => {
    let tmpArray = []
    try {
      const availableSessions = await AsyncStorage.getItem('sessions')
      tmpArray = availableSessions.replace('\/\g', '').split('$$$')
      // console.log(availableSessions)
    } catch (err) {
      console.log(err)
    }
    console.log(tmpArray)
  }

  // const handleStoreSession = async () => {
  //   let currentStoredSessions = ''
  //   try {
  //     // const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //     currentStoredSessions = await AsyncStorage.getItem('sessions')
  //     // console.log(currentStoredSessions)
  //   } catch (err) {
  //     console.log(err)
  //   }
  //   if (currentStoredSessions == null) {
  //     currentStoredSessions = sessionData
  //   } else {
  //     console.log(sessionData)
  //     currentStoredSessions += JSON.stringify(sessionData)
  //   }

  //   try {
  //     await AsyncStorage.setItem('sessions', ' ')

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


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
    // if (sessionStarted == false) {
    //   setSessionStarted(true)
    //   console.log('Generating and storing session Data')
    //   handleGenerateSession()
    // }
    var tmpData = new Array();
    for (let i = 0; i < 12; i++) {
      let x = i;
      let y = Math.random();
      tmpData.push([x, y]);
    }
    setCurrentTestData(tmpData)

  }

  const handleAcceptResult = async () => {
    let key = handleGenerateTestKey()
    let currentSessions = ''
    try {
      currentSessions = await AsyncStorage.getItem('sessions')
      // console.log('Current Sessions')
      // console.log(currentSessions)
    } catch (err) {
      console.log(err)
    }
    // console.log('New Key')
    // console.log(key)

    if (currentSessions == null) {
      currentSessions = key
    } else {
      currentSessions += key
    }

    let tmp = JSON.stringify(currentSessions)
    let str = tmp.replace(/\\/g, '')

    // console.log(currentSessions)



    storeData('sessions', str)


    storeData(key, JSON.stringify(currentTestData))
    setCurrentTestData([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
  }


  const handleGenerateTestKey = () => {
    let tmpKey = ''
    let dateVal = generateTime()
    let device = deviceID
    let researcher = researcherID

    tmpKey = 'Date: ' + dateVal + ', Device: ' + device + ', Researcher: ' + researcher + '$$$'

    return tmpKey
  }



  const handleRejectResult = () => {
    setCurrentTestData([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
  }


  // const endSession = () => {
  //   console.log('end session called')
  //   // setSessionData({
  //   //   researcher: '',
  //   //   time: '',
  //   //   device: ''
  //   // })
  //   setSessionStarted(false)

  // }

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



  // const handleGenerateSession = () => {
  //   let dateVal = generateTime()


  //   // set the session data SV & print to test
  //   setSessionData({
  //     researcher: researcherID,
  //     time: dateVal,
  //     device: deviceID

  //   })

  // }

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
            emptyStorage={handleEmptyStorage} />}
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





