
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootState } from '../../redux/themeMode/themeStore'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/themeMode/themeSlice';

const IndexScreen = () => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [taskList, setTaskList] = useState<{ key: string; taskName: string; taskTime: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState<string | null>(null);
  const addOrUpdateTask = () => {
    if (task.trim().length === 0 || time.trim().length === 0) {
      alert('Vui lòng nhập công việc và thời gian của bạn !!!');
      return;
    }

    if (isEditing && currentTaskKey) {
      setTaskList(
        taskList.map((t) =>
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
    setTaskList(taskList.filter((task) => task.key !== key));
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
        <TouchableOpacity onPressIn={drag} disabled={isActive} style={styles.textContainer}>
          <Text style={styles.taskText}>{item.taskName}</Text>
          <Text style={styles.taskTime}>Thời gian: {item.taskTime} giờ</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => editTask(item.key, item.taskName, item.taskTime)} style={styles.editIcon}>
            <Icon name="pencil" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(item.key)}>
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </ScaleDecorator>
  );
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <SafeAreaView style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
      <View style={styles.headContainer}>
       <Text style={[styles.title, theme === 'light' ? styles.lightText : styles.darkText]}>My Day</Text>
        <View style={styles.customButton}>
            <Text style={theme === 'light' ? styles.buttonLightText : styles.buttonDarkText}>
          {theme === 'light' ? 'Hồng Mode' : 'Tím Mode'}
          </Text>
          <TouchableOpacity 
      style={[
        styles.buttonMode, 
        theme === 'light' ? styles.lightButton : styles.darkButton
      ]}
          onPress={handleToggleTheme}
                  activeOpacity={0.8}
    >
      <View 
        style={[
          styles.circle, 
          theme === 'light' ? styles.circleLeft : styles.circleRight
        ]}
          />
        </TouchableOpacity>   
          </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Công việc của bạn"
          placeholderTextColor={'grey'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TextInput
          style={styles.timeInput}
          placeholder="Thời gian"
          placeholderTextColor={'grey'}
          value={time}
          onChangeText={(text) => setTime(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addOrUpdateTask}>
          {isEditing ? <Icon name="save" size={20} color="white" /> : <Icon name="plus" size={20} color="white" />}
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
    padding: 20,
  },
  lightContainer: {
    backgroundColor: 'pink',
  },
  darkContainer: {
    backgroundColor: 'purple',
  },
  headContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 45,
    lineHeight: 100,
    fontWeight: 'bold',
  },
  lightText: {
    color: 'purple',
  },
  darkText: {
    color: 'pink',
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
    backgroundColor: 'white',
  },
  timeInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
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
  customButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
    buttonMode: {
    width: 60,
    height: 30,
    borderRadius: 15,
    padding: 10,
      justifyContent: 'center',
    marginTop: 10,
    
  },
  lightButton: {
    backgroundColor: 'purple',
  },
  darkButton: {
    backgroundColor: 'pink',
  },
   circle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  circleLeft: {
    left: 3,
  },
  circleRight: {
    right: 3,
  },
  buttonLightText: {
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDarkText: {
    color: 'pink',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IndexScreen;
