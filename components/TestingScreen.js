import React, { useState } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'
import { array } from 'prop-types'

export default function TestingScreen({ navigation }) {

    const [potentialDevices, setPotetntialDevices] = useState([])
    const [selectedDevice, setSelectedDevice] = useState([])

    const displayPotentialDevices = () => {
        console.log("displayPotentialDevices called")
    }


    return (
        // This outermost view is going to house the entire page
        <View style={styles.container}>

            {/* This view is going to house the connect devivce portion of the page */}
            <View style={styles.deviceContainer}>
                <Text>Connect a Research Device</Text>
                <Button
                    title="Search for Devices"
                    onPress={() => console.log(potentialDevices)} />

                <View>
                    <Text>Available Devices</Text>
                    {potentialDevices.map((id, index) =>
                        <Button
                            title={id}
                            ionPress={() => console.log('Pressed')} />)}
                </View>
                <Button
                    title="Connect Selected Device"
                    onPress={() => console.log("Connect Device pressed")} />
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
            </View>

            {/* <Button
                title="Back to Home Screen"
                onPress={() => navigation.navigate("Home")} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonSet: {
        flexDirection: 'row'
    },
    testOuput: {
        paddingTop: 100,
        paddingBottom: 100
    },
    deviceContainer: {
        backgroundColor: "azure",
        flex: 1,
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    testContainer: {
        backgroundColor: "white",
        flex: 3,
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

