import React, {useState, useEffect, useMemo} from 'react'
import moment from 'moment'
import DateContext from '../context/index'
import {getData, setData} from '../../services/api'

const DataState = ({children}) => {

    const updateDate = date  => {
        updateCurrentDate(date)
    }
    const updateData = async  row  => {
        return await setData(row)
    }



    const [appDate, updateCurrentDate] = useState({year: moment().year(), month:moment().month()+1})
    const [appData, updateAppData] = useState([])
    const [loading, updateLoading] = useState(false)
//    const [dataServices, updateDataServices] = useState({})


    const dataServicesCalculate = data => {
        let tempDataServices={}
        data.map(item=>{
            if (!tempDataServices[item.GroupNumber]) {
                tempDataServices[item.GroupNumber]=item.groupName
            }
            return 0
        })
     return tempDataServices
    }
    const dataServices = useMemo(() => dataServicesCalculate(appData), [appData]);


    const DataState = {
        date:appDate,
        updateDate,
        data:appData,
        updateData,
        loading: loading,
        dataServices: dataServices
    }


    useEffect(() => {
            updateLoading(true)
            getData(appDate)
                .then (data =>  {
                    updateLoading(false)
                    updateAppData(data.data)
                })
                .catch(error    =>   {
                    console.log('-err-',error )
                    updateLoading(false)
                    updateAppData([])
                })
    }, [appDate])

    return (
            <DateContext.Provider value={DataState} >
                {children}
            </DateContext.Provider>
    )
}
export default DataState
