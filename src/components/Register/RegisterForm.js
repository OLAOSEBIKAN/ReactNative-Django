//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';


// create a component
const RegisterForm = () => {

    let [Username, setUsername] = useState('')
    let [Email, setEmail] = useState('')
    let [Password, setPassword] = useState('')
    let [loading, setLoading] = useState(false)
    let [hasError, setHasError] = useState(false)
    let [data, setData] = useState({})

    const registerUrl = 'https://react-native-django-api-1.herokuapp.com/register/';

    registerApi = () => {
        setLoading(true);
        fetch(registerUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: Username,
                email: Email,
                password: Password
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                alert("Your Account has been created. Please Log In")
            })
            .catch((error) => {
                setHasError(true)
                console.error(error)
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return (
        <View>
            {
                loading ?
                    <View style={styles.ani}>
                        <Text>Loading...</Text>
                    </View> :
                    <View style={styles.container}>
                        {
                            hasError && <View style={styles.hasErrorStyle}>
                                <Text>An Error Occured. Please Try Again</Text>
                            </View>
                        }
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            onChangeText={text => setUsername(text)}
                            style={styles.input} />
                        <TextInput
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                            style={styles.input} />
                        <TextInput
                            secureTextEntry={true}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            placeholder="Password"
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            style={styles.input} />
                        <Button
                            disabled={!Username || !Email||!Password}
                            onPress={() => registerApi}
                            style={styles.button} title='LOGIN' />
                    </View>
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'hsla(354, 80%, 73%,1)',
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'hsla(30, 14%, 95%,1)',
    },
    buttonContainer: {
        backgroundColor: 'hsla(46, 81%, 73%,1)',
        paddingVertical: 4,
        width: 60,
        alignSelf: 'center'
    },
    button: {
        textAlign: 'center',
        color: 'hsla(211, 12%, 48%,1)',
    },
    ani: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
    },
    hasErrorStyle: {
        height: 30,
        backgroundColor: 'hsla(356, 100%, 41%, 1)'
    },

});

//make this component available to the app
export default RegisterForm;
