import React, {Component} from 'react';
import { Alert, ActivityIndicator, FlatList, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import { getNotes, deleteNotes } from '../publics/redux/actions/notes'
import moment from 'moment'

class listNotes extends Component {
	constructor(props) {
        super(props);
  
        this.state = {

        };
    }

	componentDidMount(){
		this.getData()
	}

	getData = () => {
		this.props.dispatch(getNotes())
	}

	deleteData = (id) => {
		Alert.alert(
            "Delete Note",
            "Are you sure want to delete note?",
            [
                {
                    text: "NO", onPress: () => {
                    }
                },
                {
                    text: "YES", onPress: () => {
                        this.props.dispatch(deleteNotes(id))
                        setTimeout(() => {this.props.dispatch(getNotes())}, 500)
                    }
                }
            ],
            { cancelable: false }
        )
	}

	render() {
		return (
			<View style={{alignItems: 'center', flexDirection: 'row', margin: 8}}>
			{
                this.props.notes.isLoading ?
                <View style={{width: '100%'}}>
                	<ActivityIndicator size="large" color="#000000"/>
                </View>:
                this.props.notes.isError ? 
                <Text>Error, please try again!</Text> : (
					<FlatList
						data = { this.props.notes.data }
						numColumns = {2}
						keyExtractor = {(item) => item.id.toString()}
						refreshing={this.props.notes.isLoading}
	            		onRefresh={this.getData}
						renderItem = {({item, index}) => {
							return (
							<TouchableOpacity
								onPress={() => {this.props.navigation.navigate('SingleNotes', item)}}
								onLongPress={() => {this.deleteData(item.id)} }
								style={{
									flex: 1, height: 140, margin: 9, borderRadius: 5, elevation: 2,
									backgroundColor: item.categoryName == 'Learn' ? '#2FC2DF' : 
													item.categoryName == 'Wishlist' ? '#FAD06C' :
													item.categoryName == 'Work' ? '#C0EB6A' :
													item.categoryName == 'Personal' ? '#FF92A9' : '#000000'}}>
								<Text style={styles.textDate}>{moment(item.time).format("D MMMM")}</Text>
								<Text numberOfLines={1} style={styles.textTitle}>{item.title}</Text>
								<Text numberOfLines={1} style={styles.textBottom}>{item.categoryName}</Text>
								<Text numberOfLines={5} style={styles.textDescription}>{item.description}</Text>
							</TouchableOpacity>
							);
						}
					}>
					</FlatList>
					)
			}
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		notes: state.notes
	}
}

export default connect(mapStateToProps)(listNotes)

const styles = StyleSheet.create({
	textDate: {
		margin: 5, 
		fontSize: 10,
		marginRight: 10, 
		textAlign: 'right', 
		color: '#FFFFFF'
	},
	textTitle: {
		fontSize: 15, 
		fontWeight: 'bold',
		paddingRight: 30,
		width: '100%',
		color: 'white', 
		marginLeft: 15
	},
	textBottom: {
		fontSize: 10,
		color: '#FFFBFB', 
		marginLeft: 15
	},
	textDescription: {
		fontSize: 10,
		color: '#FFFFFF', 
		marginLeft: 15,
		paddingRight: 30,
		width: '100%'
	}
});