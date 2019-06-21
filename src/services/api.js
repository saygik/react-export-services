import axios from 'axios'
import moment from 'moment'

axios.defaults.timeout = 1000 * 45
const _apiBase = 'http://api.brnv.rw/'

export function getCurrentDateTime() {
    return moment().format("H:mm:ss")
}

// const getResource =  (url) => {
//
//
//     const errMsg='Ошибка получения данных'
//     return axios.get(`${_apiBase}${url}`)
//         .then (response =>  {
//             if (response.status===200) {
//                 return {fetchOK: true,data: response.data.data, msg: `Данные обновлены в ${getCurrentDateTime()}`};
//             }
//             else {
//                 return {fetchOK: false, msg: errMsg};
//             }
//         })
//         .catch(error    =>   {
//             console.log('-err-',error )
//             return {fetchOK: false, msg: error}
//         })
// }

// export const fetchPeriod = async (period) =>  await getResource(`exportServicesValues/${period.year}/${pad_with_zeroes(period.month)}`)
// export const fetchServices = async () =>  await getResource(`exportServices`)

export const setData = async row =>  axios.post(_apiBase +'exportServicesValues', row )

export const getData = async (period) =>  {
    try {
        const services = await axios.get(`${_apiBase}exportServices`)
        const periodData = await axios.get(`${_apiBase}exportServicesValues/${period.year}/${pad_with_zeroes(period.month)}`)
        if (services.status===200 && periodData.status===200) {
            const periodDataWithServices=periodData.data.data.map(dataItem => {
                const currentService=services.data.data.find(item=>item.Id===dataItem.Id)
                let newDataItem={...dataItem}
                newDataItem.value=newDataItem.value || 0
                newDataItem.plan=newDataItem.plan || 0
                return {...newDataItem, GroupNumber: currentService.GroupNumber, groupName: currentService.GroupLIst, name: currentService.ShortName, sort: currentService.SortList}
                }
            )
            return {fetchOK: true,data: periodDataWithServices};
            // return {fetchOK: true,data: periodDataWithServices.sort((a,b)=>a.GroupNumber<b.GroupNumber)};
        } else
        {
            return {fetchOK: false, msg: 'Ошибка получения данных'};
        }
    }
catch (err) {
    console.log('An error occurred.' + err );
     return {fetchOK: false, msg: err};
    }
}

const pad_with_zeroes=(number) => {
    var my_string = '' + number
    return my_string.length < 2 ? '0' + my_string : my_string
}
