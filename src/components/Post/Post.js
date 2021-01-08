//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import store from 'react-native-simple-store';
import base64 from 'react-native-base64'


// create a component
const Post = () => {


    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [postId, setPostID] = useState(null)
    const [infos, setInfos] = useState({})

 
    store.get("PostID").then( res =>  setPostID(res.ID));
    store.get("Username").then( res =>  setUsername(res.userName));
    store.get("Password").then( res =>  setPassword(res.passWord));


    useEffect(() => {

        try {
            fetch('https://react-native-django-api-1.herokuapp.com/posts/' + postId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + base64.encode(username + ':' + password)
                },
            }).then((response) => response.json()
            ).then(data => {
                setInfos(data)
                console.log(data)
                setLoading(false)
            }).catch((error) => {
                console.error(error.message)
                setLoading(false)
            })
        }
        catch (error) { console.log(error) }
    }, [!loading])


    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <View>
                        <Text>Loading...</Text>
                    </View> :
                    <View style={styles.container2}>
                        <FlatList data={infos}
                        renderItem={({item}) => <Text>{item.title}, {item.content}</Text>}
                        />
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
    container2: {
        flex: 1
    },
    item: {
        paddingTop: 10,
        fontSize: 20,
    },
    
});

//make this component available to the app
export default Post;
