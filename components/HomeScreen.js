import React, { useState } from 'react'
import { TouchableOpacity, Button, StyleSheet, View, Text, TextInput } from 'react-native'


export default function HomeScreen({ navigation, handleResearcherID, savedResearcherID }) {
    // ----State Varaiables----
    // Temporary Researcher ID state variables
    const [tmpResearcherID, setTmpResearcherID] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Maize Master</Text>

            <TextInput
                style={styles.inputStyle}
                placeholder="Enter Researcher ID"
                placeholderTextColor="#315a2a"
                onChangeText={value => setTmpResearcherID(value)}
                autoCorrect={false} />

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => handleResearcherID(tmpResearcherID)}>
                <Text style={styles.textStyle}>Save Researcher ID</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("Testing")}
                disabled={!savedResearcherID}>
                <Text style={styles.textStyle}>Begin Testing</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("Admin")}>
                <Text style={styles.textStyle}>View Local Logs</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E2F2F',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 50,
        marginTop: '10%',
        color: '#CDDDDD',
        fontWeight: 'bold',
        marginBottom: '10%',
    },
    buttonStyle: {
        backgroundColor: '#315a2a',
        padding: 20,
        margin: 10,
        elevation: 0,
        width: 400,
    },
    textStyle: {
        color: '#cddddd',
        fontWeight: '900',
        fontSize: 20,
        textAlign: 'center'
    },
    inputStyle: {
        backgroundColor: '#cddddd',
        padding: 10,
        width: 400,
        marginBottom: 20,
        textAlign: 'center',
        color: '#315a2a'
    }
});