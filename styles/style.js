import { StyleSheet } from 'react-native'

export const dashboardStyle = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f0f0f0',
        paddingBottom: 5
    },
    label: {
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f0f0f0'
    },
    value: {
        color: '#f0f0f0'
    },

    // account data
    account: {
        margin: 10,
        borderRadius: 5,
        // borderColor: '#2b2b2b',
        // backgroundColor: '#242424',
        flex: 1
    },
    accountCell: {
        flex: 1,
        flexDirection: 'row'
    },
    accountLeftCell: {
        flex: 1,
        margin: 5,
        alignItems: 'center'
    },
    accountRightCell: {
        flex: 1,
        margin: 5,
        alignItems: 'center'
    },

    // market data
    market: {
        margin: 10,
        flex: 1
    },
    scoreboardItem: {
        flex: 1,
        margin: 8,
        backgroundColor: 'green',
        borderRadius: 5,
        alignItems: 'center'
    },
    indexSymbol: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#f0f0f0'
    },
    indexPrice: {
        fontSize: 18,
        color: '#f0f0f0',
        paddingBottom: 4
    },

    // positions data
    positions: {
        margin: 10,
        flex: 2
    },
    position: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#2e2e2e',
        padding: 5,
        paddingTop: 10,
        backgroundColor: '#242424'
        // backgroundColor: '#e3e3e3'
    },
    positionsLeftCell: {
        flex: 5,
        paddingLeft: 10
    },
    positionsRightCell: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    symbol: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f0f0f0'
    },
    symbolData: {
        fontSize: 14,
        color: '#8f8f8f'
    },
    symbolPrice: {
        fontSize: 16,
        paddingLeft: 1,
        color: '#f0f0f0'
    },
    symbolChange: {
        fontSize: 14
    },
    pos: {
        color: 'green'
    },
    neg: {
        color: 'red'
    }
})


export const activitiesStyle = StyleSheet.create({
    activities: {
        margin: 10
    },
    activity: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#2e2e2e',
        padding: 10,
        backgroundColor: '#242424'
    },
    activityLeftCell: {
        flex: 5,
        paddingLeft: 10
    },
    activityRightCell: {
        flex: 4,
        // alignItems: 'left',
        justifyContent: 'center',
        paddingLeft: 20
    },
    symbol: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f0f0f0'
    },
    symbolData: {
        fontSize: 15,
        color: 'green'
    },
    symbolTime: {
        fontSize: 14,
        color: '#8f8f8f'
    }
})


export const searchStyle = StyleSheet.create({
    label: {
        color: '#f0f0f0'
    },
    data: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#2e2e2e',
        padding: 10,
        backgroundColor: '#242424'
    },
    dataLeftCell: {
        flex: 1,
        alignItems: 'center'
    },
    dataRightCell: {
        flex: 1,
        alignItems: 'center'
    },
    dataCenterCell: {
        flex: 1,
        alignItems: 'center'
    },
    symbol: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f0f0f0'
    },
    dataOpen: {
        fontSize: 15,
        color: '#8f8f8f'
    },
    dataClose: {
        fontSize: 15,
        color: '#f0f0f0'
    },
    dataHigh: {
        fontSize: 15,
        color: 'green'
    },
    dataLow: {
        fontSize: 15,
        color: 'red'
    },
    dataTime: {
        fontSize: 14,
        color: '#8f8f8f'
    },
    filterBar: {
        flexDirection: 'row',
        padding: 5, 
        margin: 5, 
        borderRadius: 5,
        backgroundColor: '#242424'
    },
    filterItem: {
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    graph: {
        margin: 10, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export const settingsStyle = StyleSheet.create({
    label: {
        color: '#f0f0f0'
    },
    filterBar: {
        flexDirection: 'column', 
        padding: 5, 
        margin: 5, 
        borderRadius: 5, 
        backgroundColor: '#242424'
    },
    filterItem: {
        margin: 40, 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})