import React, { useState } from 'react'
import { Button, StyleSheet, View, Text, TextInput } from 'react-native'


export default function HomeScreen({ navigation, handleResearcherID, savedResearcherID }) {
    // ----State Varaiables----
    // Temporary Researcher ID state variables
    const [tmpResearcherID, setTmpResearcherID] = useState('')

    return (
        <View style={styles.container}>
            <Text>Welcome to Maize Master</Text>

            <TextInput
                style={{ padding: 30 }}
                placeholder="Enter Researcher ID"
                onChangeText={value => setTmpResearcherID(value)}
                autoCorrect={false} />

            <Button
                title="Save Researcher ID"
                onPress={() => handleResearcherID(tmpResearcherID)} />

            <Button
                disabled={!savedResearcherID}
                title="Go to Testing"
                onPress={() => navigation.navigate('Testing')} />

            <Button
                title="Admin LogIn"
                onPress={() => navigation.navigate("Admin")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});