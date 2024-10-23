import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [task, setTask] = useState(''); // Lưu công việc hiện tại
  const [taskList, setTaskList] = useState<{ key: string; taskName: string }[]>([]); // Lưu danh sách công việc

  const addTask = () => {
    if (task.length > 0) {
      setTaskList([...taskList, { key: Math.random().toString(), taskName: task }]);
      setTask('');
    }
  };

  const deleteTask = (key: string) => {
      setTaskList(taskList.filter(task => task.key !== key));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TodoList</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Nhập công việc...'
          value={task}
          onChangeText={text => setTask(text)}
        />
       <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Icon name='plus' size={20} color='white' />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={taskList}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskIndex}>{index + 1}. </Text>
              <Text style={styles.taskText}>{item.taskName}</Text>
              
              <TouchableOpacity onPress={() => deleteTask(item.key)}>
                <Icon name='trash' size={20} color='red' />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
    listContainer: {
      flex: 1,
    paddingVertical: 10, 
    paddingHorizontal: 10,
    backgroundColor: 'black',
     justifyContent: 'center',
    overflow: 'hidden', // Đảm bảo các phần tử con của container bị giới hạn bởi borderRadius
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
    taskIndex: {
        fontSize: 20,
        fontWeight: 'bold'
  },
    taskText: {
        fontSize: 20,
        flex: 1,
        fontWeight: 'bold'
  },
  title: {
    color: 'white',
    fontSize: 50,
    lineHeight: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'black',
         marginBottom: 20,
  },
    editIcon: {
    marginRight: 15,
  },
});

export default App;
