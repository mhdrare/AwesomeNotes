import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { getNotes, postNotes } from '../../publics/redux/actions/notes'

class App extends Component {
    createNotes = (data) => {
        this.props.dispatch(postNotes(data))
        // setTimeout(() => {this.props.dispatch(getNotes())}, 500)
    }
    render() {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.item} onPress={() => {this.props.navigation.goBack()}}>
                <Image 
                    style={styles.image}
                    source={require('../../assets/img/back.png')}>
                </Image>
            </TouchableOpacity>
            <View style={styles.nameApp}>
                <Text style={styles.title}>ADD NOTES</Text>
            </View>
            <TouchableOpacity style={styles.itemSort} onPress={()=>{this.createNotes({title: this.props.title, description: this.props.description, category: this.props.category}), this.props.navigation.goBack()}}>
                <Image
                    style={styles.imageDone}
                    source={require('../../assets/img/checked.png')}>
                </Image>
            </TouchableOpacity>
        </View>
    );
    }
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(App)

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
    width: 20,
    height: 20
  },
  imageDone: {
    width: 23,
    height: 23
  }
});