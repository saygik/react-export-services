import React, {useState, useEffect} from 'react'
import moment from 'moment'
import DateContext from '../context/index'
import {getData, setData} from '../../services/api'

const DataState = ({children}) => {

    const updateDate = date  => setAppDataState({date: date})
    const updateData = async  row  => {
        return await setData(row)
    }

    const setAppDataState = (property)=> {
        UpdateState(prevState => ({
                ...prevState,
                ...property
        }))
    }
    const DataState = {
        updateDate,
        updateData,
        date: {year: moment().year(), month:moment().month()+1},
        data: []
    }

    const [appData, UpdateState] = useState(DataState)


    useEffect(() => {
        getData(appData.date)
            .then (data =>  {
                setAppDataState({data:data.data})
            })
            .catch(error    =>   {
                console.log('-err-',error )
                return {fetchOK: false, msg: error}
            })


                // fetchPeriod(appData.date).then(data=>{
                //     if (data && data.fetchOK) {
                //         setAppDataState({data: data.data})
                //     }
                // })

    }, [appData.date])

    return (
            <DateContext.Provider value={appData} >
                {children}
            </DateContext.Provider>
    )
}
export default DataState
