import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import ModalSort from '../ModalSorting'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getNotes } from '../../publics/redux/actions/notes'

class listNotes extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            isModalVisible: false,
            search: '',
            sort: 'DESC',
            page: 1
        };
    }

    changePopup = (bool) => {
        this.setState({isModalVisible: bool})
    }

    fetchData = () => {
        this.props.dispatch(getNotes(this.state.search, this.state.sort))
    }

    sortNotes = (data) => {
        this.setState({
            sort: data
        })
        setTimeout(() => {this.fetchData()}, 300)
    }

    searchNotes = (data) => {
        this.setState({
            search: data
        })
        this.fetchData()
    }

    render() {
        return (
          <React.Fragment>
            <View style={styles.header}>
                <TouchableOpacity style={styles.item} onPress={() => {this.props.navigation.openDrawer()}}>
                    <Image 
                      style={styles.image}
                      source={require('../../assets/img/profile.jpeg')}>
                    </Image>
                </TouchableOpacity>
                <View style={styles.nameApp}>
                    <Text style={styles.title}>{'Awesome Notes'.toUpperCase()}</Text>
                </View>
                <TouchableOpacity style={styles.itemSort} onPress={() => this.changePopup(true)}>
                    <Image
                        style={styles.imageSort}
                        source={require('../../assets/img/sort.png')}>
                    </Image>
                </TouchableOpacity>
                <Modal transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.changePopup(false)} style={{width: 150}} animationType='fade'>
                    <TouchableOpacity disabled={true} activeOpacity={1} style={styles.modal}>
                        <View style={{backgroundColor: '#FFFFFF', elevation: 2}}>
                            <View style={{margin: 10, fontSize: 15}}>
                                <TouchableOpacity onPress={()=>{this.changePopup(false), this.sortNotes('ASC')}}>
                                    <Text style={styles.titleModal}>{'Ascending'.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.changePopup(false), this.sortNotes('DESC')}}>
                                    <Text style={styles.titleModal}>{'Descending'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
            <View style={styles.searchBox}>
                <TextInput placeholder="Search..." style={styles.search} onChangeText={_.debounce(this.searchNotes, 300)}/>
            </View>
        </React.Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
      notes: state.notes
    }
}

export default connect(mapStateToProps)(listNotes)

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 49,
        elevation: 3,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    title: { 
        fontSize: 12, 
        fontWeight: '600', 
        color: '#000000', 
        alignSelf: 'center' 
    },
    item: {
        flex: 1,
        padding: 15
    },
    itemApp: {
        flex: 1
    },
    itemSort: {
        flex: 1,
        alignItems: 'flex-end',
        padding: 15
    },
    image: {
        width: 31,
        height: 32,
        borderRadius: 54
    },
    imageSort: {
        width: 20,
        height: 20
    },
    titleModal: {
        margin: 5,
        fontSize: 15,
        fontWeight: '300',
        color: '#000000'
    },
    modal: {
        width: 156, 
        position: 'absolute', 
        right: 10, 
        top: 40
    },
    searchBox: {
        width: '85%', 
        alignSelf: 'center', 
        margin: 20,
    },
    search: { 
        backgroundColor: '#FFFFFF', 
        paddingLeft: 20, 
        borderRadius: 50, 
        elevation: 2, 
        height: 40 
    },
});