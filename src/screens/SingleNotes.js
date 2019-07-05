import React, {Component} from 'react'
import { Picker, FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native'
import { connect } from 'react-redux'
import Header from '../components/header/Notes'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.navigation.state.params.id,
            title: this.props.navigation.state.params.title,
            description: this.props.navigation.state.params.description,
            categoryName: this.props.navigation.state.params.categoryName,
            category: this.props.navigation.state.params.category,
        };
    }

    titleChange = (values) => {
        this.setState ({
            title: values
        })
    }

    descriptionChange = (values) => {
        this.setState ({
            description: values
        })
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
        <React.Fragment>
            <Header navigation={this.props.navigation} id={this.state.id} cat_id={this.state.category} title={this.state.title} description={this.state.description} category={this.state.categoryName} />
            <View style={{width: '85%', alignSelf: 'center', paddingTop: 40}}>
                <TextInput placeholder="ADD TITLE . . ." style={{fontSize: 15}} value={this.state.title} onChangeText={this.titleChange} />
                <TextInput placeholder="ADD DESCRIPTION . . ."  multiline={true} style={{fontSize: 15, textAlignVertical: 'top', height: 145}} value={this.state.description} onChangeText={this.descriptionChange} />
                <Text style={styles.textTitle}>{'Category'.toUpperCase()}</Text>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex)=>this.setState({category: itemValue})}>
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
  }
});