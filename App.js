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

// React FileSharing modules
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// XLSX Module
import XLSX from 'xlsx';

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
  const [savedPlantID, setSavedPlantID] = useState(false)

  // SV to hold available sessions
  const [availableSessions, setAvailableSessions] = useState([])

  // SV to hold available sessions data
  const [availableSessionsData, setAvailableSessionsData] = useState([[]])

  // SV to hold both above in a dictionary
  const [dataDict, setDataDict] = useState({})

  // Boolean SV to toggle display of confirm delete Modal
  const [displayConfirmClearModal, setDisplayConfirmClearModal] = useState(false)

  // SV to hold Test Type
  const [testType, setTestType] = useState('None Selected')



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

  // Handle Store Test Type
  const handleTestType = (value) => {
    setTestType(value.value)
  }



  // Handle Plant ID
  const handlePlantID = (value) => {
    setPlantID(value)
    if (value != "") {
      setSavedPlantID(true)
    } else {
      setSavedPlantID(false)
    }
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
    exportExcel(key)
    setCurrentTestData([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
  }


  const handleGenerateTestKey = () => {
    let tmpKey = ''
    let dateVal = generateTime()
    let plant = plantID
    let device = deviceID
    let researcher = researcherID

    // testLetter that is set via the drop down that needs to be included in the key
    let testLetter = testType

    tmpKey = `${plant}$${dateVal}$${device}$${researcher}`

    return tmpKey
  }

  const exportExcel = async (value) => {
    const infoArray = value.split("$")
    const dateArray = infoArray[1].split(" ")

    let data = [{
      "Tester Name": infoArray[3],
      "Date": dateArray[0],
      "Plant ID - Replicate Number": infoArray[0],
      "Planting Date": "1/1/2022",
      "Test Type": "A",
      "Torsional Stiffness": "1 +/- 0.1",
      "Additional Notes": "No Notes"
    }];

    let ws = XLSX.utils.json_to_sheet(data);
    let wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "PlantData")
    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });

    const fileName = infoArray[0] + '_' + dateArray[0].replaceAll('/', '_') + '_' + dateArray[1].replaceAll(':', '_') + '.xlsx'
    const uri = FileSystem.cacheDirectory + fileName.replace(' ', '_');
    console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64
    });

    await Sharing.shareAsync(uri, {
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dialogTitle: "Data for Spreadsheets",
      UTI: 'com.microsoft.excel.xlsx'
    });
  }



  const handleRejectResult = () => {
    setCurrentTestData([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
  }



  const generateTime = () => {
    // create the date value
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');;
    let month = String(date.getMonth() + 1).padStart(2, '0');;
    let year = date.getFullYear();;
    let hours = String(date.getHours()).padStart(2, '0');;
    let min = String(date.getMinutes()).padStart(2, '0');;
    let sec = String(date.getSeconds()).padStart(2, '0');;
    let dateVal = `${month}/${day}/${year} ${hours}:${min}:${sec}`;
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
            handlePlantID={handlePlantID}
            handleTestType={handleTestType} />}
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
            toggleConfirmClearModalOn={toggleConfirmClearModalOn}
            exportExcel={exportExcel} />}
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





