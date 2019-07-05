import React from 'react'
import ModalAddCategory from './ModalAddCategory'
import { View, ScrollView, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Alert } from 'react-native'
import { connect } from 'react-redux'
import { getCategories, deleteCategory } from '../publics/redux/actions/categories'
import { getNotes } from '../publics/redux/actions/notes'

class PopupCategoryItem extends React.Component {
	constructor(props) {
        super(props);
  
        this.state = {
            isModalVisible: false,
        };
    }

    changePopup = (bool) => {
        this.setState({isModalVisible: bool})
    }

    render() {
    	return (
    	<React.Fragment>
    		<TouchableOpacity style={styles.category} onPress={() => this.changePopup(true)}>
				<Image source={require('../assets/img/plus.png')} style={{width: 20, height: 20}}/>
				<Text style={styles.drawer}>Add Category</Text>
			</TouchableOpacity>
	    	<Modal transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.changePopup(false)} style={{width: 150}}>
		        <ModalAddCategory changePopup={this.changePopup}/>
		    </Modal>
		</React.Fragment>
    	)
    }
}



class ProfileDrawerContent extends React.Component {
	
	componentDidMount(){
		this.getData()
	}

	getData = () => {
		this.props.dispatch(getCategories())
	}

	deleteData = (id) => {
		Alert.alert(
            "Delete Category",
            "Are you sure want to delete category?",
            [
                {
                    text: "NO", onPress: () => {
                    }
                },
                {
                    text: "YES", onPress: () => {
                        this.props.dispatch(deleteCategory(id))
                        setTimeout(() => this.props.dispatch(getNotes()), 100)
                    }
                }
            ],
            { cancelable: false }
        )
	}

	render(){
		return (
			<React.Fragment>
				<View style={styles.profile}>
					<Image
						style={styles.image}
						source={require('../assets/img/profile.jpeg')}
					/>
					<Text style={styles.name}>
						M Faisal Akbar
					</Text>
				</View>
				<ScrollView>
					<View>
						<FlatList
							data = { this.props.categories.data }
							refreshing={this.props.categories.isLoading}
							keyExtractor = {(item) => item.id.toString()}
            				onRefresh={this.getData}
							renderItem = {({item}) => { return (
								<TouchableOpacity style={styles.category}
									onLongPress={()=>{this.deleteData(item.id)}}>
									<Image style={{ width:24, height:24 }} source={{ uri: item.url_image }}/>
									<Text numberOfLines={1} style={styles.drawer}>{ item.categoryName }</Text>
								</TouchableOpacity>
							)}}/>
						<PopupCategoryItem/>
					</View>
				</ScrollView>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.categories
	}
}

export default connect(mapStateToProps)(ProfileDrawerContent)

const styles = StyleSheet.create({
	profile: {
		alignItems: 'center',
		margin: 15
	},
	image: {
		width: 95,
		height: 96,
		borderRadius: 54
	},
	name: {
		fontSize: 17,
		marginTop: 10,
		fontWeight: '600',
		color: '#000000'
	},
	drawer: {
		margin: 10,
		fontWeight: '600', 
		color: '#000', 
		fontSize: 15,
		paddingLeft: 10
	},
	category: {
		width: '100%', 
		flexDirection: 'row', 
		alignItems: 'center', 
		paddingLeft: 18 
	}
});