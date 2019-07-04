import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text, ScrollView, Modal, ActivityIndicator } from 'react-native'
import Notes from '../components/Notes';
import Header from '../components/header/Home'
import { connect } from 'react-redux'
import { searchNotesByTitle } from '../publics/redux/actions/notes'

class HeaderRight extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            isModalVisible: false,
        };
    }

    changePopup = (bool) => {
        this.setState({isModalVisible: bool})
    }

    render(){
        return(
            <React.Fragment>
                <TouchableOpacity style={styles.itemSort} onPress={() => this.changePopup(true)}>
                    <Image
                        style={styles.imageSort}
                        source={require('../assets/img/sort.png')}>
                    </Image>
                </TouchableOpacity>
                <Modal transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.changePopup(false)} style={{width: 150}} animationType='fade'>
                    <ModalSort changePopup={this.changePopup}/>
                </Modal>
            </React.Fragment>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            isModalVisible: false,
            search: '',
            sort: 'DESC'
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

    fetchData = (state) => {
        this.props.dispatch(searchNotesByTitle(this.state.search))
    }

    searchNotes = (data) => {
        this.setState({
            search: data
        })
    }

    render() {
        return (
          <React.Fragment>
            <Header navigation={this.props.navigation} modal={this.state} sort={this.sort} />
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <TextInput placeholder="Search..." style={styles.search} onChangeText={this.searchNotes}/>
                </View>
                <ScrollView>
                    <Notes navigation={this.props.navigation} item={this.props.notes} />
                </ScrollView>
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
        backgroundColor: '#F5FCFF',
    },
    search: { 
        backgroundColor: '#FFFFFF', 
        paddingLeft: 20, 
        borderRadius: 50, 
        elevation: 2, 
        height: 40 
    },
    searchBox: {
        width: '85%', 
        alignSelf: 'center', 
        margin: 20,
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