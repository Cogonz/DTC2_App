// HomePage.js

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'

// Northwestern colors
const colors = {
  purple: '#4E2A84',
  white: '#FFFFFF',
}

const HomePage = () => {
  const handleLogin = () => Alert.alert('Login button pressed')
  const handleSignUp = () => Alert.alert('Sign Up button pressed')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DriveOnCampus</Text>

      {/* Login button: purple bg, white text */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up button: white bg, purple border/text */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.purple,
    marginBottom: 40,
  },

  loginButton: {
    width: '80%',
    padding: 15,
    backgroundColor: colors.purple,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
  },

  signupButton: {
    width: '80%',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.purple,
    alignItems: 'center',
  },
  signupButtonText: {
    color: colors.purple,
    fontSize: 16,
  },
})
