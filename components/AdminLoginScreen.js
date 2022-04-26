import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native'

export default function AdminLoginScreen({ navigation, handleAdminChange, handleSearchForRecords, emptyStorage, availableLogs }) {
    //----State Variables----
    // Temporary Admin Credentials
    const [tmpAdminID, setTmpAdminID] = useState('')
    const [tmpAdminPassword, setTmpAdminPassword] = useState('')

    console.log(availableLogs.length)
    console.log(availableLogs)


    const renderItem = ({ item }) => {
        return (
            <Text key={item} style={styles.title}>{item}</Text>
        );
    };

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.title}>Locally Stored Data</Text>
            <View style={styles.centeredView}>
                <TouchableOpacity
                    style={styles.searchButtonStyle}
                    onPress={handleSearchForRecords}>
                    <Text style={styles.buttonText}>Search for Logs</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.searchButtonStyle}
                    onPress={emptyStorage}>
                    <Text style={styles.buttonText}>Clear Storage</Text>
                </TouchableOpacity>

            </View>



            <View style={styles.listView}>

                <FlatList
                    data={availableLogs}
                    render={renderItem}
                    keyExtractor={item => item}
                    style={styles.listStyle} />

            </View>



            {/* <TextInput
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
                onPress={() => navigation.navigate("Home")} /> */}
        </View >
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#2E2F2F',
        alignItems: 'center',

    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#CDDDDD',
        marginTop: 50
    },
    searchButtonStyle: {
        backgroundColor: '#315a2a',
        padding: 20,
        width: 300,
        margin: 25,

    },
    buttonText: {
        color: '#CDDDDD',
        alignSelf: "center",
        fontSize: 30,
        fontWeight: '600'
    },
    centeredView: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    listView: {
        flexDirection: 'column',
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center'
    }
});