import React, {Component} from 'react';
import {  ScrollView, Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Touchable} from 'react-native';
import { connect } from 'react-redux';
import { fetchTasksAction, addTask, updateTask, deleteTask } from '../actions/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

class TaskList extends Component {    
    constructor(props) {  
        super(props);  
        this.state = {    
          text: '',
        };
    }
    
    componentDidMount() {
        this.props.fetchTasksAction()
    };

    _createTask = () => {  
        const {text} = this.state; 
        const task = {name: text, completed: false};  
        this.props.createTask(task);  
        this.setState({text: ""});
    }
    
    _completeTask = () => {
        /* write function to complete task: once done add it to render task function on press */
    }

    _renderTasks() {
        const { status, tasks} = this.props.tasks;

        
        if (status === 'failure') {
            return <Text>{'Error'}</Text>;
        } else if (status === 'loading') {
            return <Text>{'Loading'}</Text>;
        }

        return (
            <View style={styles.items}>
                {tasks.map((task) => this._renderTask(task))}
            </View>
        );
    };

    _completeTask = (id) => {
        const task = this.props.tasks.tasks.find((task) => task.id === id);
        console.log("Task is completed: ",task.completed);
        if (task) {
            this.props.updateTask(id, task.name, !task.completed);
        }
    }  

    _renderTask(task) {
        const textStyle = task.completed ? [styles.itemText, styles.crossedText] : styles.itemText;
        const squareStyle = task.completed ? [styles.square, styles.completedSquare] : styles.square;
        
        return (
        <View style={styles.item} key={task.id}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={squareStyle} onPress={() => this._completeTask(task.id)}>
                </TouchableOpacity>
                <Text style={textStyle}>
                    {task.name}
                </Text>
            </View>
            <Icon name="ios-person" size={30} color="#4F8EF7" />
            <View style={styles.circular}></View>
        </View>
        );
    }

    _renderTaskInput() {  
        return (
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" } style={styles.writeTaskWrapper} >
                    <TextInput style={styles.input} placeholder={'Write a task'} value={this.state.text} onChangeText={text => this.setState({text})} />
                    <TouchableOpacity onPress={this._createTask} >
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.sectionTitle}>Today's Tasks</Text>
                    {this._renderTasks()}
                </ScrollView>
                {this._renderTaskInput()} 
            </View>
        );  
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
    },
    tasksWrapper: {
     paddingTop: 80,
     paddingHorizontal: 20
    },
    sectionTitle: {
      fontSize: 24,
      paddingTop: 40,
      marginLeft: 24,
      fontWeight: 'bold',
    },
    items: {
      marginTop: 30
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#c0c0c0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
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
    crossedText: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: '#000',
    },
    completedSquare: {
        backgroundColor: '#3B83AC',
    },
  });

const mapStateToProps = (state) => ({
    tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTasksAction: () => dispatch(fetchTasksAction()),
    createTask: (task) => dispatch(addTask(task.name)),
    updateTask: (id, name, completed) => dispatch(updateTask(id, name, completed)),
    deleteTask: (id) => dispatch(deleteTask(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);