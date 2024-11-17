import historyIpsa from '../data/history/history-IPSA.json'
import constituensData from '../data/constituyentes/constituensList.json'
import resumenIpsa from '../data/resumen/IPSA.json'

export const getAllInstrument = async () => {
    try {
        const constituents = constituensData.data.constituents
        const instruments = constituents.map(item => ({ codeInstrument: item.codeInstrument, name: item.name }))
        return instruments
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw error
    }
}

export const getOneIndexName = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')
        let infoHistory = {
            info: {
                details: null,
                historyData: null,
            },
        }

        if (name === 'IPSA') {
            infoHistory.info.details = historyIpsa.data.info
            infoHistory.info.historyData = historyIpsa.data.chart.reduce((latest, current) =>
                current.datetimeLastPriceTs > latest.datetimeLastPriceTs ? current : latest
            )
        } else if (name === 'IGPA') {
            throw new Error('No hay información de este indice')
        } else if (name === 'NASDAQ') {
            throw new Error('No hay información de este indice')
        } else if (name === 'DOW JONES') {
            throw new Error('No hay información de este indice')
        } else {
            throw new Error('No hay información de este indice')
        }
        return infoHistory
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw error
    }
}

export const getNameChart = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')
        let chart
        if (name === 'IPSA') {
            chart = historyIpsa.data.chart
        } else if (name === 'IGPA') {
            throw new Error('No hay información para el chart de este indice')
        } else if (name === 'NASDAQ') {
            throw new Error('No hay información para el chart de este indice')
        } else if (name === 'DOW JONES') {
            throw new Error('No hay información para el chart de este indice')
        } else {
            throw new Error('No hay información para el chart de este indice')
        }
        return chart
    } catch (error) {
       alert('No hay información de este index')
        throw error
    }
}

export const getNameSummary = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')
        let resumenData = {}
        if (name === 'IPSA') {
            resumenData = resumenIpsa.data
            // resumenData.price = resumenIpsa.data.price
        } else if (name === 'IGPA') {
            throw new Error('No hay Detalles para este indice')
        } else if (name === 'NASDAQ') {
            throw new Error('No hay Detalles para este indice')
        } else if (name === 'DOW JONES') {
            throw new Error('No hay Detalles para este indice')
        } else {
            throw new Error('No hay Detalles para este indice')
        }
        return resumenData
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw error
    }
}


export const getAllData = async (name) => {
    try {
        let dataPart1 = {}
        let dataPart2 = {}

        let allData = {}

        if (name === 'IPSA') {
            allData = constituensData.data.constituents
        } else if (name === 'IGPA') {
            throw new Error('No hay información de esta tabla')
        } else if (name === 'NASDAQ') {
            throw new Error('No hay información de esta tabla')
        } else if (name === 'DOW JONES') {
            throw new Error('No hay información de esta tabla')
        } else {
            throw new Error('No hay información de esta tabla')
        }

        const halfLength = Math.ceil(allData.length / 2)
        dataPart1 = allData.slice(0, halfLength)
        dataPart2 = allData.slice(halfLength)

        return { dataPart1, dataPart2 }
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw error
    }
}
