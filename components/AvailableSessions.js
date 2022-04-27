import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


// Required for graphing calls
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width * .90;


export default function AvailableSessions({ keyVal, testData }) {

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
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optionalor
            }
        ],
        // legend: ['Rainy Days']
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
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



    return (
        <View style={styles.sessionContainer}>
            <TouchableOpacity
                onPress={handlePress} >
                <Text style={styles.sessionText}>{keyVal}</Text>
            </TouchableOpacity>
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
        paddingVertical: 15,
        marginVertical: 5,
        alignItems: "center",
        width: screenWidth
        // flex: 1
    },
    sessionText: {
        fontSize: 20,
        color: '#2E2F2F',
        fontWeight: '600'
    },
    // graphView: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: 'center'
    // }
})
