import historyAgua from '../data/history/history-AGUAS-A.json'
import historyAndina from '../data/history/history-ANDINA-B.json'
import historyBci from '../data/history/history-BCI.json'
import historySantander from '../data/history/history-BSANTANDER.json'
import historyCap from '../data/history/history-CAP.json'
import resumenAgua from '../data/resumen/AGUAS-A.json'
import resumenAndina from '../data/resumen/ANDINA-B.json'
import resumenBci from '../data/resumen/BCI.json'
import resumenSantander from '../data/resumen/BSANTANDER.json'
import resumenCap from '../data/resumen/CAP.json'

export const getHistoryDetails = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')
        let infoHistory = {
            info: {
                details: null,
                historyData: null,
            },
        }
        if (name === 'AGUAS-A') {
            infoHistory.info.details = historyAgua.data.info
            infoHistory.info.historyData = historyAgua.data.chart.reduce((latest, current) =>
                current.datetimeLastPriceTs > latest.datetimeLastPriceTs ? current : latest
            )
        } else if (name === 'ANDINA-B') {
            infoHistory.info.details = historyAndina.data.info
            infoHistory.info.historyData = historyAndina.data.chart.reduce((latest, current) =>
                current.datetimeLastPriceTs > latest.datetimeLastPriceTs ? current : latest
            )
        } else if (name === 'BCI') {
            infoHistory.info.details = historyBci.data.info
            infoHistory.info.historyData = historyBci.data.chart.reduce((latest, current) =>
                current.datetimeLastPriceTs > latest.datetimeLastPriceTs ? current : latest
            )

        } else if (name === 'BSANTANDER') {
            infoHistory.info.details = historySantander.data.info
            infoHistory.info.historyData = historySantander.data.chart.reduce((latest, current) =>
                current.datetimeLastPriceTs > latest.datetimeLastPriceTs ? current : latest
            )
        } else if (name === 'CAP') {
            infoHistory.info.details = historyCap.data.info
            infoHistory.info.historyData = historyCap.data.chart.reduce((latest, current) =>
                current.datetimeLastPriceTs > latest.datetimeLastPriceTs ? current : latest
            )

        } else {
            throw new Error('No hay informacion de este Instrumento.')
        }
        return infoHistory
    } catch (error) {
        alert('no hay informacion de este instrumento')
        throw error
    }
}

export const getChartIntrument = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')
        let chart
        if (name === 'AGUAS-A') {
            chart = historyAgua.data.chart
        } else if (name === 'ANDINA-B') {
            chart = historyAndina.data.chart
        } else if (name === 'BCI') {
            chart = historyBci.data.chart
        } else if (name === 'BSANTANDER') {
            chart = historySantander.data.chart
        } else if (name === 'CAP') {
            chart = historyCap.data.chart
        } else {
            throw new Error('No hay informacion de este Instrumento.')
        }
        return chart
    } catch (error) {
        alert('No hay información de este index')
        throw error
    }
}

export const getDetailsInstrument = async (name) => {
    try {
        if (!name) throw new Error('El nombre del índice es requerido')
        let resumenData = {}
        if (name === 'AGUAS-A') {
            resumenData = resumenAgua.data
        } else if (name === 'ANDINA-B') {
            resumenData = resumenAndina.data
        } else if (name === 'BCI') {
            resumenData = resumenBci.data
        } else if (name === 'BSANTANDER') {
            resumenData = resumenSantander.data
        } else if (name === 'CAP') {
            resumenData = resumenCap.data
        } else {
            throw new Error('No hay informacion de este Instrumento.')
        }
        return resumenData
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw error
    }
}

