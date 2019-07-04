import React, {Component} from 'react'
import { Picker, StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native'
import { connect } from 'react-redux'
import { getNotes, postNotes } from '../publics/redux/actions/notes'
import Header from '../components/header/AddNotes'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: [],
            title: '',
            description: ''
        };
    }

    titleChange = (values) => {
        this.setState({
            title: values
        })
    }

    descriptionChange = (values) => {
        this.setState({
            description: values
        })
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
        <React.Fragment>
            <Header navigation={this.props.navigation} title={this.state.title} description={this.state.description} category={this.state.category}/>
            <View style={{width: '85%', alignSelf: 'center', paddingTop: 40}}>
                <TextInput placeholder="ADD TITLE . . ." style={{fontSize: 15}} onChangeText={this.titleChange}/>
                <TextInput placeholder="ADD DESCRIPTION . . ."  multiline={true} style={{fontSize: 15, textAlignVertical: 'top', height: 145}} onChangeText={this.descriptionChange}/>
                <Text style={styles.textTitle}>{'Category'.toUpperCase()}</Text>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex)=>this.setState({category: itemValue})}>
                        <Picker.Item label='Select Category' value='1' key='1'/>
                    {
                        this.props.categories.data.map((item) => {
                            return (
                                <Picker.Item label={item.categoryName} value={item.id} key={item.id}/>
                            )
                        })
                    }
                </Picker>
            </View>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: '#000000'
  },
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