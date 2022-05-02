// React Native Imports
import React, { useState, useEffect } from 'react'
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

  // SV to hold current plant ID
  const [plantID, setPlantID] = useState()


  // SV to hold available sessions
  const [availableSessions, setAvailableSessions] = useState([])

  // SV to hold available sessions data
  const [availableSessionsData, setAvailableSessionsData] = useState([[]])

  // SV to hold both above in a dictionary
  const [dataDict, setDataDict] = useState({})

  // Boolean SV to toggle display of confirm delete Modal
  const [displayConfirmClearModal, setDisplayConfirmClearModal] = useState(false)



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
    // let tmpArray = []
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

    for (let i = 0; i < tmpAvailableSessions.length; i++) {
      // search each key for the corresponding record
      let tmpSessionData = JSON.parse(await AsyncStorage.getItem(tmpAvailableSessions[i]))

      // console.log(tmpSessionData)

      let tmpYData = []
      for (let i = 0; i < tmpSessionData.length; i++) {
        tmpYData[i] = tmpSessionData[i][1]
      }
      tmpDict[tmpAvailableSessions[i]] = tmpYData

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
    console.log(plantID)
    var tmpData = new Array();
    for (let i = 0; i < 9; i++) {
      let x = i;
      let y = Math.floor(Math.random() * 10);
      tmpData.push([x, y]);
    }
    setCurrentTestData(tmpData)
  }


  // Handle Plant ID
  const handlePlantID = () => {
    console.log('called')
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
    let plant = plantID
    let device = deviceID
    let researcher = researcherID

    tmpKey = 'Plant: ' + plant + ', Date: ' + dateVal + ', Device: ' + device + ', Researcher: ' + researcher

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


  // Functions to handle the clear storage button
  const handleEmptyStorage = async () => {
    setDisplayConfirmClearModal(false)
    await AsyncStorage.removeItem('sessions')
  }

  const toggleConfirmClearModalOff = () => {
    setDisplayConfirmClearModal(false)
  }

  const toggleConfirmClearModalOn = () => {
    setDisplayConfirmClearModal(true)
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
            handleRejectResult={handleRejectResult}
            handlePlantID={handlePlantID} />}
        </Stack.Screen>
        <Stack.Screen name="Admin">
          {props => <AdminLoginScreen {...props}
            handleAdminChange={handleAdminCredentials}
            handleSearchForRecords={handleSearchForRecords}
            emptyStorage={handleEmptyStorage}
            availableLogs={availableSessions}
            availableSessionsData={availableSessionsData}
            dataDict={dataDict}
            displayConfirmClearModal={displayConfirmClearModal}
            toggleConfirmClearModalOff={toggleConfirmClearModalOff}
            toggleConfirmClearModalOn={toggleConfirmClearModalOn} />}
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





