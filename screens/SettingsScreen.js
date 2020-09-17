import React from 'react'
import { Text, View, Button, Dimensions, TextInput, Picker } from 'react-native'
import config from '../config'
import { settingsStyle } from '../styles/style'

class SettingsScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.keyHandler = this.keyHandler.bind(this);
        // this.graphColorHandler = this.graphColorHandler.bind(this);
        const delay = 500;
    }

    keyHandler(event) {
        config.APCA_SECRET_KEY = document.getElementById('secretKey').value
        config.APCA_API_KEY = document.getElementById('apiKey').value
    }

    // handle graph color change
    // graphColorHandler(color) {
    //     if (color=='orange') {
    //         config.graphColor = {
    //             background: '#e26a00',
    //             gradientFrom: '#fb8c00',
    //             gradientTo: '#ffa726',
    //         }
    //     }
    //     if (color=='green') {
    //         config.graphColor = {
    //             background: '#00912c',
    //             gradientFrom: '#007a25',
    //             gradientTo: '#02b037',
    //         }
    //     }
    //     else {
    //         config.graphColor = {
    //             background: '#4a4a4a',
    //             gradientFrom: '#383838',
    //             gradientTo: '#5c5c5c',
    //         }
    //     }
    // }

    componentDidMount() {
    }

    render() {

        return <View>
            
            <View style={settingsStyle.filterBar}>

                <View style={settingsStyle.filterItem}>
                    <TextInput
                        style={settingsStyle.label} 
                        textAlign={'center'}
                        type="text"
                        id='apiKey' 
                        placeholder="Enter API Key" 
                        name="uname"
                    />
                    <Text style={settingsStyle.label}>Alpaca API Key</Text>
                </View>

                <View style={settingsStyle.filterItem}>
                    <TextInput
                        style={settingsStyle.label}
                        textAlign={'center'}
                        type="password" 
                        id='secretKey' 
                        placeholder="Enter Secret Key"
                        name="psw"
                    />
                    <Text style={settingsStyle.label}>Alpaca API Secret Key</Text>
                </View>

                <View style={settingsStyle.filterItem}>
                    <Button
                        // style={settingsStyle.label}
                        title="submit"
                        onPress={this.keyHandler}
                        // color={config.graphColor.background}
                    />
                </View>

                <View style={settingsStyle.filterItem}>
                    <Picker
                        style={{ height: Dimensions.get('window').height*0.03, width: Dimensions.get('window').width*0.15 }}
                        // onValueChange={ (itemValue) => this.graphColorHandler(itemValue) }
                        onValueChange={ (color) => this.props.navigation.navigate('Search', {color}) }
                    >
                        <Picker.Item value='orange' label='orange' />
                        <Picker.Item value='green' label='green' />
                        <Picker.Item value='grey' label='grey' />
                    </Picker>
                    <Text style={settingsStyle.label}>graph color</Text>
                </View>

            </View>


        </View>
    }

}

export default SettingsScreen