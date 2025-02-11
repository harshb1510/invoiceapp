/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import InvoiceScreen from './src/screens/InvoiceScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <InvoiceScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
