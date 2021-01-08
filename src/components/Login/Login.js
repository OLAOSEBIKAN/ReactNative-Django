//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import LoginForm from './LoginForm';
import { useNavigation } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';

// create a component
const Login = () => {

    const navigation = useNavigation();

    goToRegister = () => {
        navigation.navigate("Register");
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={require('../../images/hand.png')} />
                    <Text style={styles.title}>Login. Don't have an Account?</Text>
                    <Button onPress={() => goToRegister()} title="Register" />
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
                </View>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsla(40, 10%, 94%,1)',
    },
    imageContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 150,
        alignItems: 'center',
    },
    title: {
        color: 'hsla(211, 12%, 48%,1)',
        marginTop: 5,
        textAlign: 'center',
        width: 300
    },
    formContainer: {
        width: 350,
    },
});

//make this component available to the app
export default Login;
