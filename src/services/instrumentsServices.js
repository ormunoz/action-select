import historyData from '../data/history/history-IPSA.json'
import constituensData from '../data/constituyentes/constituensList.json'

export const getAllInstrument = async () => {
    try {
        const constituents = constituensData.data.constituents
        const instruments = constituents.map(item => ({ codeInstrument: item.codeInstrument, name: item.name }))
        return instruments
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export const getOneIndexName = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')

        let infoHistory = {
            info: {
                details: null, 
                historyIpsaData: null,
            },
        }

        if (name === 'IPSA') {
            infoHistory.info.details = historyData.data.info;
            infoHistory.info.historyIpsaData = historyData.data.chart.reduce((latest, current) =>
                current.datetimeLastPriceTs > latest.datetimeLastPriceTs ? current : latest
            )
        } else if (name === 'IGPA') {
            historyData = data.data
        } else if (name === 'NASDAQ') {
            historyData = data.data
        } else if (name === 'DOW JONES') {
            historyData = data.data
        } else {
            historyData = data.data
        }

        return infoHistory
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw error
    }
};

export const getAllChart = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')

        let chart 

        if (name === 'IPSA') {
            chart = historyData.data.chart
        } else if (name === 'IGPA') {
            historyData = data.data
        } else if (name === 'NASDAQ') {
            historyData = data.data
        } else if (name === 'DOW JONES') {
            historyData = data.data
        } else {
            historyData = data.data
        }

        return chart
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw error
    }
}

