import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/themeMode/themeSlice';
import { RootState } from '@/redux/themeMode/themeStore';

const TestScreen = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'light' ? styles.lightContainer : styles.darkContainer,
      ]}
    >
      <Text style={[styles.text, theme === 'light' ? styles.lightText : styles.darkText]}>
        Hello World!
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          theme === 'light' ? styles.lightButton : styles.darkButton,
        ]}
        onPress={handleToggleTheme}
      >
        <Text style={theme === 'light' ? styles.buttonDarkText : styles.buttonLightText}>
          {theme === 'light' ? 'Hồng Mode' : 'Tím Mode'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: 'pink',
  },
  darkContainer: {
    backgroundColor: 'purple',
  },
  text: {
    fontSize: 24,
  },
  lightText: {
    color: 'purple',
  },
  darkText: {
    color: 'pink',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  lightButton: {
    backgroundColor: 'purple',
  },
  darkButton: {
    backgroundColor: 'pink',
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

export default TestScreen;
