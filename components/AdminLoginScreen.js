import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import AvailableSessions from './AvailableSessions.js'
import { __values } from 'tslib'

export default function AdminLoginScreen({ navigation, handleAdminChange, handleSearchForRecords, emptyStorage, availableLogs, availableSessionsData, dataDict }) {
    //----State Variables----
    // Temporary Admin Credentials
    const [tmpAdminID, setTmpAdminID] = useState('')
    const [tmpAdminPassword, setTmpAdminPassword] = useState('')

    const [tmpTest, setTmpTest] = useState([])

    // console.log(availableLogs.length)
    // console.log(availableLogs)

    const returnTestData = async (key) => {
        let testData = JSON.parse(await AsyncStorage.getItem(key))
        setTmpTest(testData)
    }


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



            <ScrollView
                style={styles.listView}
                horizontal={false}
                showsVerticalScrollIndicator={true}>

                {Object.entries(dataDict).map(([key, value]) => <AvailableSessions keyVal={key} testData={value} />)}

            </ScrollView>



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


            <View>
                <TouchableOpacity
                    style={styles.searchButtonStyle}
                    onPress={() => console.log('Pressed')}>
                    <Text style={styles.buttonText}> Save All </Text>
                </TouchableOpacity>
            </View>


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
    // listView: {
    //     flexDirection: 'column',
    //     alignContent: "center",
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // }
});