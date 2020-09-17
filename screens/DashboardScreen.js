import React from 'react'
import { Text, View, FlatList } from 'react-native'
import alpacaAPI from '../services/alpaca'
import { dashboardStyle } from '../styles/style'
import { Ionicons } from '@expo/vector-icons'

class DashboardScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            buying_power: 0,
            cash: 0,
            long_market_value: 0,
            portfolio_value: 0,
            DIA: 0,
            SPY: 0,
            QQQ: 0,
            IWM: 0,
            positions: []
        }
    }

    componentDidMount() {
        //console.log('fetch data from Alpaca')

        // Account Info
        const api = alpacaAPI()
        api.getAccount().then((response) => {
            //console.log(response)
            if (response.ok) {
                this.setState({
                    buying_power: response.data.buying_power,
                    cash: response.data.cash,
                    long_market_value: response.data.long_market_value,
                    portfolio_value: response.data.portfolio_value
                })
            }
        })

        // Market Info
        const symbols = ['DIA,SPY,QQQ,IWM']
        api.getBars(symbols, '5Min', '1').then((response) => {
            //console.log(response)
            if (response.ok) {
                this.setState({
                    DIA: response.data.DIA[0].c,
                    SPY: response.data.SPY[0].c,
                    QQQ: response.data.QQQ[0].c,
                    IWM: response.data.IWM[0].c
                })
            }
        })

        // Positions Info
        api.getPositions().then((response) => {
            //console.log(response)
            if (response.ok) {
                this.setState({
                    positions: response.data
                })
            }

        })

    }

    renderRow = ({ item }) => {
        if (item.change_today >= 0) {
            return (
                <View key={item.asset_id} style={dashboardStyle.position}>
                    
                    <View style={dashboardStyle.positionsLeftCell}>
                        <Text style={dashboardStyle.symbol}>{item.symbol}</Text>
                        <Text style={dashboardStyle.symbolData}>{item.qty} @ {item.avg_entry_price}</Text>
                    </View>
                    <View style={dashboardStyle.positionsRightCell}>
                        <Text style={[dashboardStyle.symbolPrice]}>{item.current_price}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="md-arrow-dropup" size={20} color='green'><Text> </Text></Ionicons>
                            <Text style={[dashboardStyle.symbolChange, item.change_today>=0 ? dashboardStyle.pos : dashboardStyle.neg ]}>
                                {(item.change_today * 100).toFixed(2)}%
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View key={item.asset_id} style={dashboardStyle.position}>
                    
                    <View style={dashboardStyle.positionsLeftCell}>
                        <Text style={dashboardStyle.symbol}>{item.symbol}</Text>
                        <Text style={dashboardStyle.symbolData}>{item.qty} @ {item.avg_entry_price}</Text>
                    </View>
                    <View style={dashboardStyle.positionsRightCell}>
                        <Text style={[dashboardStyle.symbolPrice]}>{item.current_price}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="md-arrow-dropdown" size={20} color='red'><Text> </Text></Ionicons>
                            <Text style={[dashboardStyle.symbolChange, item.change_today>=0 ? dashboardStyle.pos : dashboardStyle.neg ]}>
                                {(item.change_today * 100).toFixed(2)}%
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

    render() {
        return <View style={{flex: 1, flexDirection: 'column'}}>

            <View style={dashboardStyle.account}> 
                <Text style={dashboardStyle.heading}>Account Details</Text>
                <View style={dashboardStyle.accountCell}>
                    <View style={dashboardStyle.accountLeftCell}>
                        <Text style={dashboardStyle.label}>Buying Power</Text>
                        <Text style={dashboardStyle.value}>{this.state.buying_power}</Text>
                        <Text style={dashboardStyle.label}>Cash</Text>
                        <Text style={dashboardStyle.value}>{this.state.cash}</Text>
                    </View>
                    <View style={dashboardStyle.accountRightCell}>
                        <Text style={dashboardStyle.label}>Long Market Value</Text>
                        <Text style={dashboardStyle.value}>{this.state.long_market_value}</Text>
                        <Text style={dashboardStyle.label}>Portfolio Value</Text>
                        <Text style={dashboardStyle.value}>{this.state.portfolio_value}</Text>
                    </View>
                </View>
            </View>

            <View style={dashboardStyle.market}>
                <Text style={dashboardStyle.heading}>Market</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={dashboardStyle.scoreboardItem}>
                        <Text style={dashboardStyle.indexSymbol}>DIA</Text>
                        <Ionicons name="md-arrow-dropup" size={24} color="white"></Ionicons>
                        <Text style={dashboardStyle.indexPrice}>{this.state.DIA}</Text>
                    </View>
                    <View style={dashboardStyle.scoreboardItem}>
                        <Text style={dashboardStyle.indexSymbol}>SPY</Text>
                        <Ionicons name="md-arrow-dropup" size={24} color="white"></Ionicons>
                        <Text style={dashboardStyle.indexPrice}>{this.state.SPY}</Text>
                    </View>
                    <View style={dashboardStyle.scoreboardItem}>
                        <Text style={dashboardStyle.indexSymbol}>QQQ</Text>
                        <Ionicons name="md-arrow-dropup" size={24} color="white"></Ionicons>
                        <Text style={dashboardStyle.indexPrice}>{this.state.QQQ}</Text>
                    </View>
                    <View style={dashboardStyle.scoreboardItem}>
                        <Text style={dashboardStyle.indexSymbol}>IWM</Text>
                        <Ionicons name="md-arrow-dropup" size={24} color="white"></Ionicons>
                        <Text style={dashboardStyle.indexPrice}>{this.state.IWM}</Text>
                    </View>
                </View>
            </View>

            <View style={dashboardStyle.positions}>
                <Text style={dashboardStyle.heading}>Positions</Text>
                <FlatList
                    data = {this.state.positions}
                    renderItem = {this.renderRow}
                    keyExtractor = {item => item.asset_id}
                />
            </View>
        </View>
    }

}

export default DashboardScreen