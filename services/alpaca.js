import apisauce from 'apisauce'
import config from '../config'

const alpacaAPI = (baseURL=config.BASE_URL, apiKEY=config.APCA_API_KEY, secretKEY=config.APCA_SECRET_KEY) => {

    const api = apisauce.create({
    baseURL: baseURL,
    headers: {
        'APCA-API-KEY-ID': apiKEY,
        'APCA-API-SECRET-KEY': secretKEY
    },
    timeout: 5000
    })

    const getAccount = () => api.get('/v2/account')
    const getPositions = () => api.get('/v2/positions')
    const getActivities = () => api.get('/v2/account/activities')
    const getBars = (symbols, interval, period) => api.get(`https://data.alpaca.markets/v1/bars/${interval}?symbols=${symbols}&limit=${period}`)


    return {
        getAccount,
        getPositions,
        getActivities,
        getBars
    }

}

export default alpacaAPI