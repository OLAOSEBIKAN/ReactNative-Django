//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import base64 from 'react-native-base64'
import store from 'react-native-simple-store'



// create a component
const CreatePost = () => {

    let [Title, setTitle] = useState('')
    let [Content, setContent] = useState('')
    let [Author, setAuthor] = useState(0)
    let [Date_posted, setDatePosted] = useState('')
    let [loading, setLoading] = useState(false)
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    const postUrl = 'https://react-native-django-api-1.herokuapp.com/posts'


    const navigation = useNavigation()

    goToPosts = () => navigation.navigate('Posts')

    sendPost = function () {
        
        store.get('username').then((res) => setUsername(res.usernameData))
        store.get('password').then((res) => setPassword(res.passwordData))
        store.get('author').then((res) => setAuthor(res.authorData))
        const getdateposted = new Date()
        setDatePosted(getdateposted.toISOString())
        
        setLoading(true);
        fetch(postUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Basic " + base64.encode(username + ':' + password),
            },
            body: JSON.stringify({
                title: Title,
                content: Content,
                date_posted: Date_posted,
                author: Author
            }),

        }).then(response => response.json()
        ).then((data => {
            setLoading(false)
            alert("Post Created")
            goToPosts()
        })
        ).catch((error) => {
            console.error(error)
            setLoading(false)
        });
    }

    return (
        <View>
            {
                loading ?
                    <View >
                        <Text>Loading...</Text>
                    </View> :
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../images/newpost.jpeg')} />
                        </View>
                        <View >
                            <TextInput style={styles.input}
                                placeholder="Title"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                onChangeText={(text) => setTitle(text)} />
                            <TextInput style={styles.input2}
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                placeholder="Content"
                                onChangeText={(text) => setContent(text)} />
                            <Button style={styles.button}
                                disabled={!Title || !Content}
                                onPress={() => sendPost()}
                                title="Create" />
                        </View>
                    </View>
            }
        </View>
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
    input: {
        height: 40,
        backgroundColor: 'hsla(354, 80%, 73%,1)',
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'hsla(30, 14%, 95%,1)',
    },
    input2: {
        height: 80,
        backgroundColor: 'hsla(354, 80%, 73%,1)',
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'hsla(30, 14%, 95%,1)',
    },
    button: {
        alignSelf: 'center',
        color: 'hsla(211, 12%, 48%,1)',
    },
    imageContainer: {

    },
    image: {
        height: 200,
        marginBottom: 20,
    }


});

//make this component available to the app
export default CreatePost;
