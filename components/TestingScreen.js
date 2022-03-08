import React, { useState } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'
import { array } from 'prop-types'

export default function TestingScreen({ navigation }) {

    const [potentialDevices, setPotetntialDevices] = useState([
        'SMURF-123', 'PP-145', 'PP-178', 'SMURF-159'
    ])
    const [selectedDevice, setSelectedDevice] = useState([])


    const [connected, setConnected] = useState(false)

    const displayPotentialDevices = () => {
        console.log("displayPotentialDevices called")
    }


    return (
        // This outermost view is going to house the entire page
        <View style={styles.container}>

            {/* This view is going to house the connect devivce portion of the page */}
            <View style={styles.deviceSideBar}>
                <View style={styles.deviceContainer}>
                    <Text style={styles.title}>Connect a Research Device</Text>
                    <Button
                        title="Search for Devices"
                        onPress={() => console.log(potentialDevices)} />

                    <View style={styles.availableDevices}>
                        <Text>Available Devices</Text>
                        {potentialDevices.map((id, index) =>
                            <Button
                                title={id}
                                ionPress={() => console.log('test')} />)}
                    </View>
                    <View style={styles.buttonSet}>
                        <Button
                            disabled={connected}
                            title="Connect"
                            onPress={() => setConnected(true)} />
                        <Button
                            disabled={!connected}
                            title="Disconnect"
                            onPress={() => setConnected(false)} />
                    </View>
                </View>
            </View>


            {/* This view is going to house the run test controls */}
            <View style={styles.testContainer}>
                <View style={styles.buttonSet}>
                    <Button
                        title="Select plant"
                        onPress={() => console.log("Select plant clicked")} />

                    <Button
                        title="Run Test"
                        onPress={() => console.log('Run Test Pressed')} />
                </View>

                <View style={styles.testOuput}>
                    <Text>Test Output</Text>
                </View>


                <View style={styles.buttonSet}>
                    <Button
                        title='Accept'
                        onPress={() => console.log('Accept Result')} />
                    <Button
                        title='Reject'
                        onPress={() => console.log('Reject Result')} />
                </View>
                <Button
                    title="End Testing Session"
                    onPress={() => navigation.navigate("Home")} />
            </View>

            {/* <Button
                title="Back to Home Screen"
                onPress={() => navigation.navigate("Home")} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        flex: 2,
        paddingTop: 20
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonSet: {
        flexDirection: 'row',
        flex: 2,
        paddingTop: 40,
    },
    testOuput: {
        paddingTop: 100,
        paddingBottom: 100,
        flex: 3
    },
    deviceSideBar: {
        backgroundColor: "#ebedeb",
        flex: 1,
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    deviceContainer: {
        alignItems: 'center'
    },
    availableDevices: {
        flex: 3,

    },
    testContainer: {
        backgroundColor: "#fff",
        flex: 3,
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

