import React, { useState } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import exportExcel from './Spreadsheets'


export default function AdminAccess() {

    let DATA = [
        {
            id: "Tim A$4/12/2022$A73_Plant01$06/01/2020$A$0.751 +/- 0.032$Example A",
            title: "TA A73_Plant01",
        },
        {
            id: "Jane B$4/10/2022$B99_Plant02$08/01/2020$A$0.631 +/- 0.025$Example B",
            title: "JB B99_Plant02",
        },
        {
            id: "Bob C$4/14/2022$C12_Plant03$01/01/2020$A$0.810 +/- 0.038$Example C",
            title: "BC C12_Plant03",
        },
        {
            id: "Tim A$4/12/2022$A73_Plant04$06/01/2020$A$0.751 +/- 0.032$Example D",
            title: "TA A73_Plant04",
        },
        {
            id: "Jane B$4/10/2022$B99_Plant05$08/01/2020$A$0.631 +/- 0.025$Example E",
            title: "JB B99_Plant05",
        },
        {
            id: "Bob C$4/14/2022$C12_Plant06$01/01/2020$A$0.810 +/- 0.038$Example F",
            title: "BC C12_Plant06",
        },
    ];

    const [selectedId, setSelectedId] = useState(null);

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#05611d" : "#99ffb4";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => [setSelectedId(item.id), exportExcel(item.id)]}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>View your session data</Text>
            <View style={styles.list}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    list: {
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 20
    },
    item: {
        width: 300,
        backgroundColor: '#a2ffcb',
        padding: 5,
        marginVertical: 4,
        fontSize: 12
    },
    title: {
        fontSize: 32,
    },
})