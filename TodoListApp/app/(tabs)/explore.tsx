// import React from 'react';
// import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';

// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

// const ExploreScreen = () => {
//   const theme = useSelector((state: RootState) => state.theme.value);

//   return (
//     <SafeAreaView style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
//       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
//         <Text style={[styles.text, theme === 'light' ? styles.lightText : styles.darkText]}>
//           Welcome to {'\n'}
//           <Text>REACT NATIVE</Text>
//         </Text>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 30,
//     lineHeight: 40,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sử dụng màu nền để văn bản nổi bật trên hình nền
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   lightContainer: {
//     backgroundColor: 'white',
//   },
//   darkContainer: {
//     backgroundColor: '#333',
//   },
//   lightText: {
//     color: 'black',
//   },
//   darkText: {
//     color: 'white',
//   },
// });

// export default ExploreScreen;
