import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

export default function AdminAccess() {
    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                <View style={styles.buttonSet}>
                    <Button
                        style={{ backgroundColor: 'red' }}
                        title='View Logs'
                        onPress={() => console.log('Logs Pressed')} />
                    <Button
                        title="Edit Admins"
                        onPress={() => console.log('Edit Admins Pressed')} />
                </View>
            </View>

            <View style={styles.mainPage}>
                <Text>Welcome Admin</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSet: {
        flexDirection: 'row'
    },
    topNav: {
        flex: 1,
    },
    mainPage: {
        flex: 4,
        backgroundColor: '#fff'
    }
});