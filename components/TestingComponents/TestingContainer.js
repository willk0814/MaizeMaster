import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Picker } from 'react-native'

import TestOutputContainer from './TestOutputContainer'
// import SavingPopUp from './SavingPopUp'

// import { Dropdown } from 'react-native-material-dropdown'
// import { Picker } from 'react-native-picker/picker'
import { Dropdown } from 'react-native-element-dropdown'

export default function TestingContainer({ handleEndSessionPressed, handleDevicePopUp, handleRunTest, currentTestData, handleAcceptResult, handleRejectResult, handlePlantID, handleTestType }) {

    // ----State Variables----
    // Boolean state var to hold whether or not end session has been pressed
    const [endSessionPressed, setEndSessionPressed] = useState(false)

    const [tmpPlantID, setPlantID] = useState()


    const [selectedTestType, setSelectedTestType] = useState("None Selected");
    const [dropdownOptions, setDropdownOptions] = useState([
        // { label: "None Selected", value: "None Selected" },
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
        { label: "F", value: "F" }
    ])

    // render function for drop down buttons
    const renderTestTypeOption = (item) => {
        return (
            <View>
                <Text style={styles.testTypeText}>{item.label}</Text>
            </View>
        )
    }

    return (
        <View style={styles.testContainer}>

            <View style={styles.upperMargin}>
                <Text style={styles.title}>Session Info and Testing Controls</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.sessionInfoText}>Device1: </Text>
                    <Text style={styles.sessionInfoText}>Smurf</Text>
                    <TouchableOpacity
                        onPress={handleDevicePopUp}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.sessionInfoText}>Edit </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.runControls}>
                    <View style={styles.testInfoStyle}>
                        <Text style={styles.sessionInfoText}>Plant ID:</Text>
                        <TextInput
                            style={styles.plantIDStyle}
                            placeholder="Enter Plant ID"
                            placeholderTextColor="#315a2a"
                            onChangeText={handlePlantID} />
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.sessionInfoText}> Test Type: </Text>
                        <Dropdown
                            style={styles.pickerStyle}
                            data={dropdownOptions}
                            placeholder="Select Test Type"
                            placeholderStyle={
                                { fontWeight: '400' },
                                { fontSize: 25 }
                            }
                            labelStyle={
                                { fontWeight: '400' },
                                { fontSize: 25 }
                            }
                            labelField="label"
                            valueField="value"
                            label={selectedTestType}
                            labelStyle={styles.labelStyle}
                            onChange={handleTestType}
                            renderItem={(item) => renderTestTypeOption(item)}
                        />
                    </View>

                </View>
                <View style={styles.runButtons}>
                    <TouchableOpacity
                        style={styles.runButtonStyle}
                        onPress={handleRunTest} >
                        <Text style={styles.runTextStyle}>Run Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.runButtonStyle}
                        onPress={handleAcceptResult}>
                        <Text style={styles.runTextStyle}>Accept Result</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.runButtonStyle}
                        onPress={handleRejectResult}>
                        <Text style={styles.runTextStyle}>Reject Result</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.testOuput}>
                <Text style={styles.title}>Test Output</Text>
                <TestOutputContainer currentTestData={currentTestData} />
            </View>

            {/* <View style={styles.centeredView}>
                <TouchableOpacity
                    style={styles.endTestingStyle}
                    onPress={handleEndSessionPressed}>
                    <Text style={styles.runTextStyle}>End Testing Session</Text>
                </TouchableOpacity>
            </View> */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonSet: {
        flexDirection: 'row',
        flex: 2,
        paddingTop: 40,
    },
    testOuput: {
        marginTop: 50,
        paddingTop: 10,
        paddingBottom: 100,
        flex: 3,
        // marginLeft: '10%'
    },
    testContainer: {
        backgroundColor: "#2E2F2F",
        flex: 3,
        height: '100%',
        width: '100%',
        // alignContent: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#CDDDDD'
    },
    sessionInfoText: {
        fontSize: 25,
        fontWeight: '400',
        color: '#cddddd'
    },
    buttonStyle: {
        backgroundColor: '#315a2a',
        paddingLeft: 10,
        width: 60,
        marginLeft: 10
    },
    runControls: {
        marginTop: 25,
        flexDirection: 'row'
    },
    plantIDStyle: {
        backgroundColor: '#cddddd',
        width: 100,
        marginLeft: 10,
        marginRight: 20
    },
    upperMargin: {
        borderBottomColor: '#cddddd',
        borderBottomWidth: 10
    },
    runTextStyle: {
        color: '#cddddd',
        fontWeight: '500',
        fontSize: 25,
    },
    runButtonStyle: {
        backgroundColor: '#315a2a',
        width: 200,
        marginVertical: 25,
        marginHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center'
    },
    runButtons: {
        flexDirection: 'row',
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    endTestingStyle: {
        backgroundColor: '#315a2a',
        width: 400,
        marginVertical: 40,
        marginHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center'
    },
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    pickerStyle: {
        backgroundColor: 'white',
        // borderBottomColor: 'gray',
        // borderBottomWidth: 0.5,
        // backgroundColor: '#2E2F2F',
        marginLeft: 0,
        width: 200
    },
    testInfoStyle: {
        flexDirection: 'row'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    labelStyle: {
        fontSize: 100,
        color: '#2E2F2F',
    },
    testTypeText: {
        fontSize: 25,
        fontWeight: '400',
        color: '#2E2F2F',
        marginLeft: 10
    }
});
