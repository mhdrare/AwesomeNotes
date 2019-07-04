import ModalCategory from '../components/ModalAddCategory';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false,
        };
    }

    changePopup = (bool) => {
        this.setState({isModalVisible: bool})
    }
  
    static navigationOptions = {
        title: 'Add Category',
        drawerIcon: (
            <Image source={require('../assets/img/+.png')} style={{width: 20, height: 20}}/>
        )
    }
    
    render() {
        return (
        <React.Fragment>
            <Modal transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.changePopup(false)} style={{width: 150}} animationType='fade'>
                <ModalCategory navigation={this.props.navigation} />
            </Modal>
        </React.Fragment>
    );
  }
}