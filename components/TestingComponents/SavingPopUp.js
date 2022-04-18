import React from 'react'
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function SavingPopUp({ handleReturnToTesting, endSession }) {
    return (
        <View style={styles.popupContainer}>
            {/* <TouchableOpacity
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Save Locally</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Save to Device</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Save to Google Drive</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleReturnToTesting}>
                <Text style={styles.buttonText}>Return to Testing</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={endSession}>
                <Text style={styles.buttonText}>Test End Session</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    popupContainer: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: '#315a2a',
        padding: 20,
        margin: 10,
        width: 450
    },
    buttonText: {
        color: '#cddddd',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
