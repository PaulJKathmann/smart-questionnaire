import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/reducers/store';
import TaskList from './src/screens/TaskListScreen';

export default function App() {
  
  return (
    <Provider store={store}>
        <TaskList></TaskList>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
