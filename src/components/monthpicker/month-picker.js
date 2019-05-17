import React, {Component} from 'react'
import Picker from 'react-month-picker'
import MonthBox from './month-box'
import 'react-month-picker/css/month-picker.css'



class MonthPicker extends Component {

    render() {

        const pickerLang = {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            from: 'От', to: 'До',
        }
        const {date, updateDate} = this.props

        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + ' ' + m.year)
            return '?'
        }

        return (
            <Picker
                ref="pickAMonth"
                years={{min: 2013}}
                value={date}
                lang={pickerLang.months}
                onChange={()=>this.refs.pickAMonth.dismiss()}
                onDismiss={(value)=>updateDate(value)}
            >
                Выбранный период: <span style={{color:'blue', fontWeight: 'bold'}}> <MonthBox value={makeText(date)} onClick={()=>this.refs.pickAMonth.show()} /></span>
            </Picker>
        )
    }
}
export default MonthPicker