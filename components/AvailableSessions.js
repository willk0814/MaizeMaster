import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'


// Required for graphing calls
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


import FontAwesome from '@expo/vector-icons/FontAwesome'

const screenWidth = Dimensions.get("window").width * .90;


export default function AvailableSessions({ keyVal, testData, exportExcel }) {

    const [showGraph, setShowGraph] = useState(false)

    // console.log(testData)

    let xLabels = ["2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0"]

    // console.log('From Available Sessions')
    // console.log(testData)


    let yData = []
    for (let i = 0; i < testData.length; i++) {
        yData.push(testData[i])
    }

    const data = {
        labels: xLabels,
        datasets: [
            {
                data: yData,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
                strokeWidth: 2 // optionalor
            }
        ],
        // legend: ['Rainy Days']
    };

    const chartConfig = {
        backgroundGradientFrom: "#2E2F2F",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#2E2F2F",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    const handlePress = async () => {
        if (showGraph) {
            setShowGraph(false)
        } else {
            setShowGraph(true)
        }

    }

    const kArr = keyVal.split("$")
    let keyDescription = `Plant: ${kArr[0]}, Date: ${kArr[1]}, Device: ${kArr[2]}, Researcher: ${kArr[3]}`

    return (
        <View style={styles.sessionContainer}>
            <View style={styles.sessionRow}>
                <TouchableOpacity
                    onPress={handlePress} >
                    <Text style={styles.sessionText}>{keyDescription}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => exportExcel(keyVal)} >
                    <Image
                        source={require('../assets/download_icon.png')}
                        style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
            {showGraph &&
                <View style={styles.graphView}>
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier={true} />
                    {/* <Text>{testData}</Text> */}
                </View>
            }
        </View>



    )
}

const styles = StyleSheet.create({
    sessionContainer: {
        backgroundColor: '#CDDDDD',
        // paddingVertical: 15,

        marginVertical: 10,
        alignItems: "center",
        width: screenWidth
        // flex: 1
    },
    sessionText: {
        fontSize: 20,
        color: '#2E2F2F',
        fontWeight: '600',
        paddingVertical: 15
    },
    sessionRow: {
        flexDirection: 'row'
    },
    iconStyle: {
        marginLeft: 10,
        paddingHorizontal: 10,
        width: 50,
        height: 55

    }
    // graphView: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: 'center'
    // }
})
