import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get("window").width * .90;


export default function TestOutputContainer({ currentTestData }) {

    let xLabels = ["2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0"]
    let LOB = [2, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0]
    // let yLabels = [2, 3, 4, 5, 6, 7]

    let yData = []
    for (let i = 0; i < currentTestData.length; i++) {
        yData[i] = currentTestData[i][1]
    }

    // console.log('From Test Output Container')
    // console.log('Prop Data: ', currentTestData)
    // console.log('Y data: ', yData)



    const data = {
        labels: xLabels,
        datasets: [
            {
                data: yData,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            // Control line
            // {
            //     data: LOB,
            //     color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
            //     strokeWidth: 2 // optional
            // }
        ],
        legend: ["Rainy Days"] // optional
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



    return (
        <View style={styles.ouputContainer}>
            <LineChart
                data={data}
                width={screenWidth}
                height={400}
                chartConfig={chartConfig}
                bezier={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ouputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})