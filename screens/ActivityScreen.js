import React from 'react'
import { Text, View, FlatList } from 'react-native'
import alpacaAPI from '../services/alpaca'
import { activitiesStyle } from '../styles/style'

class ActivityScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        const api = alpacaAPI()

        api.getActivities().then((response) => {
            if (response.ok) {
                // console.log(response)
                this.setState({
                    activities: response.data
                })
            }
        })

    }

    renderCol = ({ item }) => {
        return (
            <View key={item.id} style={activitiesStyle.activity}>
                <View style={activitiesStyle.activityLeftCell}>
                    <Text style={activitiesStyle.symbol}>{item.symbol}</Text>
                    <Text style={activitiesStyle.symbolTime}>{item.transaction_time.substring(0,10)}</Text>
                </View>
                <View style={activitiesStyle.activityRightCell}>
                    <Text style={activitiesStyle.symbolData}>{item.side} {item.qty} @ {item.price}</Text>
                </View>
            </View>
        )
    }

    render() {
        return <View>

            <View style={activitiesStyle.activities}>
                <FlatList
                    data = {this.state.activities}
                    renderItem = {this.renderCol}
                    keyExtractor = {item => item.id}
                />
            </View>

        </View>
    }

}

export default ActivityScreen