//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import store from 'react-native-simple-store';


import base64 from 'react-native-base64'

// create a component
const Posts = () => {

    const postUrl = 'https://react-native-django-api-1.herokuapp.com/posts/';

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [datas, setDatas] = useState([])


    const navigation = useNavigation()

    gotToPost = function (id) {
        store.save('PostID', {ID: id.toString()})
        navigation.navigate('Post')

    }



    gotToCreate =  () => {
        navigation.navigate('Create Post')

    }


    store.get("Username").then( res =>  setUsername(res.userName));
    store.get("Password").then( res =>  setPassword(res.passWord));

    useEffect(() => {

        try {
            fetch(postUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + base64.encode(username + ':' + password)
                },
            }).then((response) => response.json()
            ).then(data => {
                setDatas(data)
                console.log(data)
                setLoading(false)
            }).catch((error) => {
                alert(error.message)
                console.error(error)
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
                        <FlatList data={datas}
                            keyExtractor={({ id }, index) => id.toString()}
                            renderItem={({ item }) =>
                            (
                                <TouchableOpacity onPress={() => gotToPost(item.id)}
                                style={styles.touch}><Text style={styles.item}> {item.title}</Text></TouchableOpacity>
                            )

                            }
                        />

                        <Button
                            onPress={() => gotToCreate}
                            style={styles.button} title='Create Post' />
                    </View>
            }
        </SafeAreaView>
    );
};

// define your styles>
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
    touch: {
        width: 200,
        padding: 15,
        borderRadius: 25,
    }
});

//make this component available to the app
export default Posts;
