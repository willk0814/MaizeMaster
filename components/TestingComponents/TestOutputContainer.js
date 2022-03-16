import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function TestOutputContainer() {
    return (
        <View style={styles.ouputContainer}>
            <Text>This is the Testing Output Container</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ouputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})