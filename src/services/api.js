import axios from 'axios'
import moment from 'moment'

axios.defaults.timeout = 1000 * 45
const _apiBase = 'http://api.brnv.rw/'

export function getCurrentDateTime() {
    return moment().format("H:mm:ss")
}

const getResource =  (url) => {


    const errMsg='Ошибка получения данных'
    return axios.get(`${_apiBase}${url}`)
        .then (response =>  {
            if (response.status===200) {
                // const ss=apiDatatoEntities(response.data.data,SpravRecord)
                // console.log('---',ss.get(2))
                // console.log('-2-',mapToArr(ss))

                return {fetchOK: true,data: response.data.data, msg: `Данные обновлены в ${getCurrentDateTime()}`};
            }
            else {
                return {fetchOK: false, msg: errMsg};
            }
        })
        .catch(error    =>   {
            console.log('-err-',error )
            return {fetchOK: false, msg: errMsg}
        })
}

const pad_with_zeroes=(number) => {
    var my_string = '' + number
    return my_string.length < 2 ? '0' + my_string : my_string
}

    export const fetchPeriod = async (period) =>  await getResource(`exportServicesValues/${period.year}/${pad_with_zeroes(period.month)}`)