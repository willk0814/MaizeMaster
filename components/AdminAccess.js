import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

import exportExcel from './Spreadsheets'


export default function AdminAccess() {

    const info = "Jason He$4/12/2022$B73_Plant01$06/01/2020$A$0.751 +/- 0.032$No Notes"

    return (
        <View style={styles.container}>
            <Text>View your session data</Text>

            <Button
                title="Export Excel"
                onPress={() => exportExcel(info)} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})