import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [task, setTask] = useState(''); // Lưu nội dung hiện tại
  const [time, setTime] = useState(''); 
  const [taskList, setTaskList] = useState<{ key: string; taskName: string; taskTime: string }[]>([]); // Lưu danh sách công việc
  const [isEditing, setIsEditing] = useState(false); // Kiểm tra trạng thái đang chỉnh sửa
  const [currentTaskKey, setCurrentTaskKey] = useState<string | null>(null); // Lưu trữ công việc hiện tại để chỉnh sửa

  const addOrUpdateTask = () => {
  if (task.trim().length === 0 || time.trim().length === 0) {
    alert("Vui lòng nhập công việc và thời gian của bạn !!!");
    return;
  }
    
    // Thêm công việc hoặc cập nhật sau khi chỉnh sửa
  if (isEditing && currentTaskKey) {
    // Cập nhật công việc
    setTaskList(
      taskList.map(t =>
        t.key === currentTaskKey ? { key: t.key, taskName: task, taskTime: time } : t
      )
    );
    setIsEditing(false);
    setCurrentTaskKey(null);
  } else {
    // Thêm công việc mới
    setTaskList([...taskList, { key: Math.random().toString(), taskName: task, taskTime: time }]);
  }
  setTask(''); // Xóa ô nhập liệu sau khi thêm/cập nhật
  setTime(''); // Xóa ô nhập thời gian
};

  // Xóa công việc
  const deleteTask = (key: string) => {
    setTaskList(taskList.filter(task => task.key !== key));
  };

  // Chỉnh sửa công việc
  const editTask = (key: string, taskName: string, taskTime: string) => {
    setTask(taskName); // Hiển thị nội dung trong ô nhập liệu để chỉnh sửa
    setTime(taskTime);
    setIsEditing(true);
    setCurrentTaskKey(key); // Lưu key của công việc để cập nhật
  };

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

      <View style={styles.listContainer}>
        <FlatList
          data={taskList}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <View style={styles.textContainer}>
                <View style={styles.taskRow}>
                  <Text style={styles.taskIndex}>{index + 1}. </Text>
                  <Text style={styles.taskText}>{item.taskName}</Text>
                </View>
                <Text style={styles.taskTime}>Thời gian: {item.taskTime} giờ</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => editTask(item.key, item.taskName, item.taskTime)} style={styles.editIcon}>
                  <Icon name='pencil' size={20} color='green' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.key)}>
                  <Icon name='trash' size={20} color='red' />
                </TouchableOpacity>
              </View>
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
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, 
  },
  taskIndex: {
    fontSize: 16,
    fontWeight: 'bold',
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
