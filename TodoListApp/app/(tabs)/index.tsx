import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [taskList, setTaskList] = useState<{ key: string; taskName: string; taskTime: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState<string | null>(null);

  const addOrUpdateTask = () => {
    if (task.trim().length === 0 || time.trim().length === 0) {
      alert("Vui lòng nhập công việc và thời gian của bạn !!!");
      return;
    }
    
    if (isEditing && currentTaskKey) {
      setTaskList(
        taskList.map(t =>
          t.key === currentTaskKey ? { key: t.key, taskName: task, taskTime: time } : t
        )
      );
      setIsEditing(false);
      setCurrentTaskKey(null);
    } else {
      setTaskList([...taskList, { key: Math.random().toString(), taskName: task, taskTime: time }]);
    }
    setTask('');
    setTime('');
  };

  const deleteTask = (key: string) => {
    setTaskList(taskList.filter(task => task.key !== key));
  };

  const editTask = (key: string, taskName: string, taskTime: string) => {
    setTask(taskName);
    setTime(taskTime);
    setIsEditing(true);
    setCurrentTaskKey(key);
  };

  const renderItem = ({ item, drag, isActive }: any) => (
    <ScaleDecorator>
      <View style={styles.taskItem}>
        <TouchableOpacity
          onPressIn={drag}
          disabled={isActive}
          style={styles.textContainer}
        >
          <Text style={styles.taskText}>{item.taskName}</Text>
          <Text style={styles.taskTime}>Thời gian: {item.taskTime} giờ</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => editTask(item.key, item.taskName, item.taskTime)} style={styles.editIcon}>
            <Icon name='pencil' size={20} color='green' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(item.key)}>
            <Icon name='trash' size={20} color='red' />
          </TouchableOpacity>
        </View>
      </View>
    </ScaleDecorator>
  );

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>My Day</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder='Công việc của bạn'
            value={task}
            onChangeText={text => setTask(text)}
          />
          <TextInput
            style={styles.timeInput}
            placeholder='Thời gian'      
            value={time}
            onChangeText={text => setTime(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addOrUpdateTask}>
            {isEditing ? (
              <Icon name='save' size={20} color='white' /> 
            ) : (
              <Icon name='plus' size={20} color='white' /> 
            )}
          </TouchableOpacity>
        </View>
       <GestureHandlerRootView>
        <View style={styles.listContainer}>
          <DraggableFlatList
            data={taskList}
            onDragEnd={({ data }) => setTaskList(data)}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
          /> 
        </View>
       </GestureHandlerRootView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 45,
    lineHeight: 100,
    backgroundColor: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  inputContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskInput: {
    flex: 3, 
    borderColor: '#ddd',
    borderWidth: 2,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  timeInput: {
    flex: 1, 
    borderColor: '#ddd',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 1, 
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTime: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5, 
  },
  editIcon: {
    marginRight: 15,
    marginLeft: 10,
  },
});

export default App;
