import React from 'react';
import { TouchableOpacity, View, TextInput, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { postCategory, getCategories } from '../publics/redux/actions/categories'

class ModalAddCategory extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			category: '',
			url_image: ''
		}
	}

	createCategory = (data) => {
		this.props.dispatch(postCategory(data))
		setTimeout(()=>{this.props.dispatch(getCategories())}, 500)
	}

	categoryChange = (values) => {
        this.setState({
            category: values
        })
    }

    urlImageChange = (values) => {
        this.setState({
            url_image: values
        })
    }

	closePopup = () => {
		this.props.changePopup(false);
	}

	render() {
		return (
			<TouchableOpacity onPress={() => this.closePopup()} style={{width: '100%', height: '100%'}}>
				<TouchableOpacity disabled={true} activeOpacity={1} style={styles.modal}>
					<View style={{backgroundColor: '#FFFFFF', elevation: 2, borderRadius: 5}}>
						<View style={styles.boxInput}>
							<TextInput style={styles.input} placeholder='Category Name' onChangeText={this.categoryChange}/>
							<TextInput style={styles.input} placeholder='Image Url' onChangeText={this.urlImageChange}/>
						</View>
						<View style={{margin: 10, fontSize: 15, flexDirection: 'row', alignSelf: 'flex-end'}}>
							<TouchableOpacity onPress={()=>{this.createCategory({category: this.state.category, url_image: this.state.url_image}), this.closePopup()}}>
								<Text style={styles.title}>Add</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>this.closePopup()}>
								<Text style={styles.cancel}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		notes: state.notes
	}
}

export default connect(mapStateToProps)(ModalAddCategory)

const styles = StyleSheet.create({
	title: {
		margin: 5,
		fontSize: 15,
		fontWeight: '300',
		color: '#000000'
	},
	cancel: {
		margin: 5,
		fontSize: 15,
	},
	modal: {
        flex: 1,
        width: 250,
        alignSelf: 'center',
        justifyContent: 'center'
	},
	input: {
		paddingLeft: 10, 
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2ED1A2'
    },
    boxInput: {
        margin: 10, 
        paddingRight: 20, 
        paddingLeft: 20
    }
});