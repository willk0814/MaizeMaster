import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// Required for Storage calls
import AsyncStorage from '@react-native-async-storage/async-storage'

// Required for graphing calls
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function AvailableSessions({ text, handleSearchForData }) {

    const handlePress = async () => {
        console.log(JSON.parse(await AsyncStorage.getItem(text)))
    }

    return (
        <View style={styles.sessionContainer}>
            <TouchableOpacity
                onPress={handlePress} >
                <Text style={styles.sessionText}>{text}</Text>
            </TouchableOpacity>

        </View>



    )
}

const styles = StyleSheet.create({
    sessionContainer: {
        backgroundColor: '#CDDDDD',
        padding: 5,
        marginVertical: 5
    },
    sessionText: {
        fontSize: 20,
        color: '#2E2F2F'
    }
})
