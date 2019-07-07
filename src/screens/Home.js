import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text, ScrollView, Modal, ActivityIndicator } from 'react-native'
import Notes from '../components/Notes';
import Header from '../components/header/Home'
import { connect } from 'react-redux'
import { getNotes } from '../publics/redux/actions/notes'

class App extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            isModalVisible: false,
            search: '',
        };
    }

    changePopup = (bool) => {
        this.setState({isModalVisible: bool})
    }

    handleNavigate = () => {
        const { navigation } = this.props;
        navigation.navigate('Notes');
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        }
    }

    render() {
        return (
          <React.Fragment>
            <Header navigation={this.props.navigation}/>
            <View style={styles.container}>
                <Notes navigation={this.props.navigation} item={this.props.notes} />
                <TouchableOpacity style={styles.fab} onPress={this.handleNavigate}>
                    <Image source={require('../assets/img/+.png')} />
                </TouchableOpacity>
            </View>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    fab: {
        position: 'absolute', 
        width: 58, 
        height: 57, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 10, 
        bottom: 30, 
        backgroundColor: '#FFFCFC', 
        borderRadius: 50, 
        elevation: 3
    },
    title: {
        fontSize: 16, 
        fontWeight: '600', 
        color: '#000000', 
        alignSelf: 'center'
    },
    image: {
        width: 31,
        height: 32,
        borderRadius: 54
    },
    itemApp: {
        flex: 1,
        justifyContent: 'center'
    },
    headerStyles: {
        flexDirection: 'row',
    },
    itemSort: {
        flex: 1,
        alignItems: 'flex-end',
        padding: 15,
        justifyContent: 'center'
    },
    imageSort: {
        justifyContent: 'center',
        width: 20,
        height: 20
    }
})