import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'

export default function AdminLoginScreen({ navigation, handleAdminChange }) {
    //----State Variables----
    // Temporary Admin Credentials
    const [tmpAdminID, setTmpAdminID] = useState('')
    const [tmpAdminPassword, setTmpAdminPassword] = useState('')

    return (
        <View style={styles.container}>
            <Text>Welcome to Admin login screen</Text>

            <TextInput
                style={{ padding: 30 }}
                placeholder='Admin ID'
                onChangeText={value => setTmpAdminID(value)}
                autoCorrect={false} />

            <TextInput
                style={{ padding: 30 }}
                placeholder='Admin Password'
                onChangeText={value => setTmpAdminPassword(value)}
                autoCorrect={false} />

            <Button
                title='Submit Admin Credentials'
                onPress={() => navigation.navigate("AdminAcess")} />


            <Button
                title="Back to Home Screen"
                onPress={() => navigation.navigate("Home")} />
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