import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';

// Northwestern colors
const colors = {
  purple: '#4E2A84',
  white: '#FFFFFF',
  disabledGray: '#CCCCCC',
  disabledText: '#777777',
};

// Only allow emails at @u.northwestern.edu
const emailRegex = /^[^\s@]+@u\.northwestern\.edu$/;

const SignUpPage: React.FC = () => {
  const router = useRouter();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [agree, setAgree] = useState(false);
  

  const handleSignUp = () => {
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please use a valid @u.northwestern.edu email.');
      return;
    }
    if (!firstName || !lastName || !password || !studentId) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (!agree) {
      // This should never fire when disabled, but kept for safety
      Alert.alert('Error', 'You must accept the Terms of Service to continue.');
      return;
    }
    router.push('/map');
    // Call your backend/API here
    Alert.alert(
      'Sign Up',
      `First: ${firstName}\nLast: ${lastName}\nEmail: ${email}\nStudent ID: ${studentId}`
    );
  };

  const openTerms = () => {
    // Navigate to the Terms of Service page
    Linking.openURL('https://bit.ly/3ZjN3We');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create an Account</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Student ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          keyboardType="numeric"
          value={studentId}
          onChangeText={setStudentId}
        />

        <View style={styles.termsContainer}>
          <Switch
            value={agree}
            onValueChange={setAgree}
            trackColor={{ false: '#767577', true: colors.purple }}
            thumbColor={agree ? colors.white : '#f4f3f4'}
          />
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.link} onPress={openTerms}>
              Terms of Service
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, !agree && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={!agree}
        >
          <Text style={[styles.buttonText, !agree && styles.buttonDisabledText]}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.purple,
    marginBottom: 30,
    fontWeight: '600',
  },
  label: {
    width: '100%',
    marginBottom: 5,
    color: colors.purple,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 5,
    marginBottom: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  termsText: {
    marginLeft: 8,
    color: colors.purple,
  },
  link: {
    textDecorationLine: 'underline',
    color: colors.purple,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.purple,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.disabledGray,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonDisabledText: {
    color: colors.disabledText,
  },
});