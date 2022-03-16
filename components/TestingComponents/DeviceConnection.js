import React, { useState } from 'react'
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native'

export default function DeviceConnection({ handleDevicePopUp }) {

    // ----State Variables----
    // Boolean state variable to represent whether or not a device is connected
    const [connected, setConnected] = useState(false)

    // Array state variable to hold the potential devices recovered from Search
    const [potentialDevices, setPotetntialDevices] = useState([
        'SMURF-123', 'PP-145', 'PP-178', 'SMURF-159'])


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Search for Available Devices</Text>
            </TouchableOpacity>
            <View style={styles.deviceList}>
                <Text style={{ textAlign: 'center' }, { color: '#CDDDDD' }}>List of available devices</Text>
            </View>

            <View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={handleDevicePopUp}>
                    <Text style={styles.buttonText}>Connect</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Disconnect</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 30,
    },
    buttonText: {
        color: '#CDDDDD',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonStyle: {
        backgroundColor: '#315a2a',
        padding: 10,
        margin: 5,
        width: 450
    },
    deviceList: {
        padding: 30,
    }
})
