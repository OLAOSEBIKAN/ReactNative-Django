import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import CreatePost from '../components/CreatePost/CreatePost'

import Posts from '../components/Posts/Posts'
import Post from '../components/Post/Post'





const AppStack = createStackNavigator();
 function BlogNavigator() {
    return (
        <NavigationContainer >
            <AppStack.Navigator initialRouteName='Login'>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="Posts" component={Posts} />
                <AppStack.Screen name="Post" component={Post} />
                <AppStack.Screen name="Create Post" component={CreatePost} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default BlogNavigator;