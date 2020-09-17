import React from 'react'
import { Text, View, FlatList, Dimensions, TextInput, Picker } from 'react-native'
import alpacaAPI from '../services/alpaca'
import { searchStyle } from '../styles/style'

import config from '../config'

import {
    LineChart,
    // BarChart,
    // PieChart,
    // ProgressChart,
    // ContributionGraph,
    // StackedBarChart
  } from 'react-native-chart-kit'


var searchTimeout = null;

class SearchScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: 'undefined',
            interval: '1Min',
            period: '100',
            data: [],
            time: [],
            open: [],
            high: [],
            low: [],
            close: [],
            linedata: {
                labels: [0],
                datasets: [
                    {
                        data: [0],
                        strokeWidth: 2, // optional
                    }
                ],
            },
            graphColor: {
                color: 'orange',
                background: '#e26a00',
                gradientFrom: '#fb8c00',
                gradientTo: '#ffa726',
            }
        }

        this.searchHandler = this.searchHandler.bind(this);
        this.periodHandler = this.periodHandler.bind(this);
        this.intervalHandler = this.intervalHandler.bind(this);
        this.graphColorHandler = this.graphColorHandler.bind(this);
    }

    unixToTime(unix_timestamp) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);

        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();

        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var mseconds = "0" + date.getMilliseconds();

        return `${day}/${month}/${year}\n${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
    }

    // handle symbol change
    searchHandler(value) {
        this.setState({ search: value.toUpperCase().replace(/\s/g, "") })

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            this.callAPI()
        }, 500);
    }

    // handle period change
    periodHandler(value) {
        if (value == '') { this.setState({ period: '10' }) }
        else if (0 < parseFloat(value) <= 1000) { this.setState({ period: value.replace(/\s/g, "") }) }
        else { this.setState({ period: '10' }) }

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            this.callAPI()
        }, 500);
    }

    // handle interval change
    intervalHandler(value) {
        this.setState({ interval: value }, () => { this.callAPI() });
    }

    callAPI() {
        const api = alpacaAPI()
        api.getBars(this.state.search, this.state.interval, this.state.period).then((response) => {
            if (response.ok) {
                this.setState({
                    data: [],
                    time: [],
                    open: [],
                    high: [],
                    low: [],
                    close: []
                })
                for (const [key, value] of Object.entries(response.data)) {
                    this.setState({
                        data: value
                    })
                    var i;
                    for (i = 0; i < value.length; i++) {
                        if (i == 0 || i == value.length-1) {
                            this.state.time.push(this.unixToTime(value[i].t))
                        }
                        else {
                            this.state.time.push('')
                        }
                        this.state.open.push(parseFloat(value[i].o))
                        this.state.high.push(parseFloat(value[i].h))
                        this.state.low.push(parseFloat(value[i].l))
                        this.state.close.push(parseFloat(value[i].c))
                    }
                }
                let linedata = this.state.linedata;
                // linedata["labels"] = this.state.data.t;
                linedata["labels"] = this.state.time;
                linedata["datasets"][0]["data"] = this.state.close;
                this.setState({ linedata: linedata })
            }
        })
    }

    // handle graph color change
    graphColorHandler(color) {
        if (color=='orange') {
            this.setState({ 
                graphColor: {
                    color: color,
                    background: '#e26a00',
                    gradientFrom: '#fb8c00',
                    gradientTo: '#ffa726',
                }
            })
        }
        else if (color=='green') {
            this.setState({
                graphColor: {
                    color: color,
                    background: '#00912c',
                    gradientFrom: '#007a25',
                    gradientTo: '#02b037',
                }
            })
        }
        else if (color=='grey') {
            this.setState({
                graphColor: {
                    color: color,
                    background: '#4a4a4a',
                    gradientFrom: '#383838',
                    gradientTo: '#5c5c5c',
                }
            })
        }
        else {
            console.log('graph color handler ELSE')
        }
    }

    componentDidMount() {
    }

    renderInfo = ({ item }) => {
        return (
            <View style={searchStyle.data}>
                <View style={searchStyle.dataLeftCell}>
                    <Text style={searchStyle.symbol}>{this.state.search}</Text>
                    <Text style={searchStyle.dataTime}>{this.unixToTime(item.t)}</Text>
                </View>

                <View style={searchStyle.dataCenterCell}>
                    <Text style={searchStyle.dataOpen}>open: {item.o}</Text>
                    <Text style={searchStyle.dataClose}>close: {item.c}</Text>
                </View>

                <View style={searchStyle.dataRightCell}>
                    <Text style={searchStyle.dataHigh}>high: {item.h}</Text>
                    <Text style={searchStyle.dataLow}>low : {item.l}</Text>
                </View>
            </View>
        )
    }

    render() {

        // console.log(this.state.data)
        // console.log(this.state.search)
        // console.log(this.state.period)
        // console.log(this.state.interval)
        console.log(this.props.route)

        const setColor = this.props.route.params
        if (this.state.graphColor.color != setColor) {
            this.graphColorHandler(setColor)
        }
        

        return <View>

            <View style={searchStyle.filterBar}>

                <View style={searchStyle.filterItem}>
                    <TextInput
                        type='text'
                        id='search'
                        textAlign={'center'}
                        placeholder='AAPL'
                        // onChange={this.searchHandler}
                        onChangeText={text => this.searchHandler(text)}
                        style={searchStyle.label}
                    />
                    <Text style={searchStyle.label}>symbol</Text>
                </View>

                <View style={searchStyle.filterItem}>
                    <TextInput
                        type='text'
                        id='period'
                        textAlign={'center'}
                        placeholder='0 to 1000'
                        // onChange={this.periodHandler}
                        onChangeText={text => this.periodHandler(text)}
                        style={searchStyle.label}
                    />
                    <Text style={searchStyle.label}>period</Text>
                </View>

                <View style={searchStyle.filterItem}>
                    <Picker
                        // selectedValue={selectedValue}
                        style={{ height: Dimensions.get('window').height*0.035, width: Dimensions.get('window').width*0.11 }}
                        onValueChange={(itemValue) => this.intervalHandler(itemValue)}
                    >
                        <Picker.Item value='1Min' label='1 Min' />
                        <Picker.Item value='5Min' label='5 Min' />
                        <Picker.Item value='15Min' label='15 Min' />
                        <Picker.Item value='day' label='1 day' />
                    </Picker>

                    <Text style={searchStyle.label}>interval</Text>
                </View>

            </View>


            <View style={searchStyle.graph}>
                <Text>
                    Bezier Line Chart
                </Text>
                <LineChart
                    data={this.state.linedata}
                    width={Dimensions.get('window').width*0.95} // from react-native
                    height={Dimensions.get('window').height*0.4}
                    yAxisLabel={'$'}
                    yAxisInterval={10}
                    // verticalLabelRotation={-10}
                    // horizontalLabelRotation={-10}
                    // decorator
                    // onDataPointClick
                    chartConfig={{
                    backgroundColor: this.state.graphColor.background,
                    backgroundGradientFrom: this.state.graphColor.gradientFrom,
                    backgroundGradientTo: this.state.graphColor.gradientTo,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    // scrollableDotFill: '#fff',
                    // scrollableDotRadius: 6,
                    // scrollableDotStrokeColor: 'tomato',
                    // scrollableDotStrokeWidth: 3,
                    // scrollableInfoViewStyle: {
                    //   justifyContent: 'center',
                    //   alignContent: 'center',
                    //   backgroundColor: '#121212',
                    //   borderRadius: 2,
                    //   marginTop: 25,
                    //   marginLeft: 25
                    // },
                    // scrollableInfoTextStyle: {
                    //   fontSize:10,
                    //   color: '#C4C4C4',
                    //   marginHorizontal: 2,
                    //   flex: 1,
                    //   textAlign: 'center',
                    // },
                    // scrollableInfoSize: {width: 30, height: 30},
                    // scrollableInfoOffset: 15,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 6
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 5,
                    borderRadius: 15
                    }}
                />
            </View>


            <View>
                <FlatList
                    // inverted
                    data = {this.state.data}
                    renderItem = {this.renderInfo}
                    keyExtractor = {item => item.t}
                />
            </View>

        </View>
    }
}

export default SearchScreen
