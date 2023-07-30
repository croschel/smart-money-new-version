import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Routes} from '~/routes';
import colors from '~/styles/colors';
import {AuthProvider} from './contexts/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="light-content"
        translucent={false}
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </SafeAreaView>
  );
};
export default App;
