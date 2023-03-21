import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { completeTask} from '../../App';

const Task = (props) => {
    const {index, completeTask } = props;
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} key={index} onPress={() => completeTask(index)}>
                </TouchableOpacity>
                <Text style={styles.itemText}>
                    {props.text}
                </Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginRight: 24,
        marginLeft: 24,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 4,
        marginRight: 12,
    },
    itemText: {
        fontSize: 16,
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default Task;
