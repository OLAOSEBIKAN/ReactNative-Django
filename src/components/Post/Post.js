//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, SafeAreaView } from 'react-native';
import store from 'react-native-simple-store';
import base64 from 'react-native-base64'


// create a component
const Post = () => {


    const [loading, setLoading] = useState(true)
    const [infos, setInfos] = useState([])
    const [ID, setID] = useState(0)
    const [USERNAME, setUsername] = useState('')
    const [PASSWORD, setPassword] = useState('')


    store.get("PostID").then(res => setID(res.ID));
    store.get("Username").then(res => setUsername(res.userName));
    store.get("Password").then(res => setPassword(res.passWord));


    useEffect(() => {

        try {
            fetch('https://react-native-django-api-1.herokuapp.com/posts/' + ID, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + base64.encode(USERNAME + ':' + PASSWORD)
                },
            }).then((response) => response.json().then(data => {
                setInfos(data)
                console.log(data)
                setLoading(false)
            })).catch((error) => {
                console.error(error.message)
                setLoading(false)
            })
        }
        catch (error) { console.log(error) }
    }, [loading, USERNAME, PASSWORD])


    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <View>
                        <Text>Loading...</Text>
                    </View> :
                    <View>
                        <Text>{infos.title}</Text>
                        <Text>{infos.content}</Text>
                        <Text>author {infos.author}</Text>
                        <Text>{infos.date_posted}</Text>
                        <Text>ID {infos.id}</Text>
                    </View>
            }
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'hsla(40, 10%, 94%,1)',
    },

    item: {
        paddingTop: 10,
        fontSize: 20,
    },

});

//make this component available to the app
export default Post;






