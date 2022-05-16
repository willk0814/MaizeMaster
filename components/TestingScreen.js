import React, { useState, useEffect } from 'react'
import { Modal, Button, StyleSheet, View, Text } from 'react-native'
import { array } from 'prop-types'

import TestOutputContainer from './TestingComponents/TestOutputContainer'
import SavingPopUp from './TestingComponents/SavingPopUp'

import DeviceConnection from './TestingComponents/DeviceConnection'
import TestingContainer from './TestingComponents/TestingContainer'

export default function TestingScreen({ navigation, handleRunTest, currentTestData, handleAcceptResult, handleRejectResult, handlePlantID, handleTestType }) {

    // ----State Variables----
    // Boolean State Variables to control display of Modals
    const [endSessionPressed, setEndSessionPressed] = useState(false)

    // Boolean SV to store whether or not a device is connected => should pop-up be displayed
    const [viewDevicePopUp, setViewDevicePopUp] = useState(true)

    // SV to represent current test data
    const [currentTest, setCurrentTest] = useState()

    // SV to represent whether or not the first test was run -- session has begun
    const [runFirstTest, setRunFirstTest] = useState(false)



    // ----Necessary Functions----
    // Handle return to testing
    const handleReturnToTesting = () => {
        setEndSessionPressed(false)
    }

    // Handle end testing
    const handleEndSessionPressed = () => {
        setEndSessionPressed(true)
    }

    // toggle device pop up on and off
    const toggleDevicePopUpOn = () => {
        setViewDevicePopUp(true)
    }

    const toggleDevicePopUpOff = () => {
        setViewDevicePopUp(false)

    }

    // // handle end session to test creating a new session
    // const testEndSession = () => {
    //     setRunFirstTest(false)
    //     setTotalTests(0)
    //     setSavedTests(0)
    // }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.centeredView}>
                <Modal
                    visible={viewDevicePopUp}
                    transparent={true}
                    animationType="slide">
                    <View style={styles.centeredView}>
                        <DeviceConnection handleDevicePopUp={toggleDevicePopUpOff} />
                    </View>
                </Modal>
            </View>

            <View style={styles.testContainer}>
                <TestingContainer
                    handleEndSessionPressed={handleEndSessionPressed}
                    handleDevicePopUp={toggleDevicePopUpOn}
                    handleRunTest={handleRunTest}
                    currentTestData={currentTestData}
                    handleAcceptResult={handleAcceptResult}
                    handleRejectResult={handleRejectResult}
                    handlePlantID={handlePlantID}
                    handleTestType={handleTestType}
                />
            </View>

            <Modal
                visible={endSessionPressed}
                transparent={true}
                animationType="slide" >
                <View style={styles.centeredView}>
                    <SavingPopUp
                        handleReturnToTesting={handleReturnToTesting} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    devicePopUp: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2E2F2F",
        width: '60%',
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    testContainer: {
        backgroundColor: "#fff",
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmModal: {
        backgroundColor: '#000000aa',
        height: '70%',
        marginTop: '25%',
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

