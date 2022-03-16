import React, { useState } from 'react'
import { Modal, Button, StyleSheet, View, Text } from 'react-native'
import { array } from 'prop-types'

import TestOutputContainer from './TestingComponents/TestOutputContainer'
import SavingPopUp from './TestingComponents/SavingPopUp'

import DeviceConnection from './TestingComponents/DeviceConnection'
import TestingContainer from './TestingComponents/TestingContainer'

export default function TestingScreen({ navigation }) {

    // ----State Variables----
    // Boolean State Variables to control display of Modals
    const [endSessionPressed, setEndSessionPressed] = useState(false)

    // Boolean SV to store whether or not a device is connected => should pop-up be displayed
    const [viewDevicePopUp, setViewDevicePopUp] = useState(true)

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

    // handle 

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
                    handleDevicePopUp={toggleDevicePopUpOn} />
            </View>

            <Modal
                visible={endSessionPressed}
                transparent={true}
                animationType="slide" >
                <View style={styles.centeredView}>
                    <SavingPopUp handleReturnToTesting={handleReturnToTesting} />
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

