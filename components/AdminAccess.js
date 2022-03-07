import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function AdminAccess() {
    return (
        <View style={styles.container}>
            <Text>Welcome Admin</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});