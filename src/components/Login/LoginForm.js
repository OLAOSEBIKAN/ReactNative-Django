//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import store from 'react-native-simple-store';




// create a component
const LoginForm = () => {

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [token, setToken] = useState('')


    const navigation = useNavigation()
    goToPosts = () => navigation.navigate('Posts')


    const loginUrl = 'https://react-native-django-api-1.herokuapp.com/login/';



    loginApi = () => {
        setLoading(true)
        store.save('Username', {userName: Username})
        store.save('Password', {passWord: Password})

        fetch(loginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: Username,
                password: Password,
            }),
        }).then(response => response.json()
        ).then((data) => {
            setToken(data.token)
            goToPosts()
        }).catch((error) => {
            setHasError(true);
            console.error(error)
            setLoading(false)
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
                                <Text>An Error Occured. Please Login Again</Text>
                            </View>
                        }
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            onChangeText={(text) => setUsername(text)}
                            style={styles.input} />
                        <TextInput
                            secureTextEntry={true}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input} />
                        <Button
                            disabled={!Username || !Password}
                            onPress={() => loginApi()}
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
    hasErrorStyle: {
        height: 30,
        backgroundColor: 'hsla(356, 100%, 41%, 1)'
    },
    input: {
        height: 40,
        backgroundColor: 'hsla(354, 80%, 73%,1)',
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'hsla(30, 14%, 95%,1)',
    },
    button: {
        alignSelf: 'center',
        color: 'hsla(211, 12%, 48%,1)'
    },
    ani: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
    },
});

//make this component available to the app
export default LoginForm;
