import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Task {
  id: number;
  text: string;
}

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim().length === 0) {
      alert("Vui lòng nhập công việc của bạn!");
      return;
    }
    setTaskList((prevTaskList) => [...prevTaskList, { id: Date.now(), text: task }]);
    setTask('');
  };

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Công việc hôm nay</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Nhập công việc'
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name='plus' size={20} color='white' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Icon name='trash' size={20} color='red' />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default App;
