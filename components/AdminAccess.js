import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'


export default function AdminAccess() {
    return (
        <View style={styles.container}>
            <Text>This is Text</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})