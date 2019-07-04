import React from 'react';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';

import store from './src/publics/redux/store';
import Home from "./src/screens/Home";
import Category from "./src/screens/AddCategory";
import Notes from "./src/screens/AddNotes";
import SingleNotes from "./src/screens/SingleNotes";
import DrawerNavigator from './src/components/DrawerNavigator';

const StackNavigator = createStackNavigator({
    Home: {
        screen: Home,
    },
    SingleNotes: {
        screen: SingleNotes,
    },
    Notes: {
        screen: Notes,

    },
    Category: {
        screen: Category,
    }
})

const AppNavigator = createDrawerNavigator({
    Home: StackNavigator
}, {
    contentComponent: DrawerNavigator
})

const Navi = createAppContainer(AppNavigator);

export default class App extends React.Component{
    render(){
        return(
            <Provider store={store} >
                <Navi />
            </Provider>
        )
    }
}