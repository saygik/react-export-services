import React, {useContext} from 'react'
import MonthPicker from '../monthpicker'
import DateContext from '../context'

const MainPage =() => {
    const {date, updateDate} = useContext(DateContext)
        return (
            <div>
                  <MonthPicker date={date} updateDate={updateDate}/>
            </div>
        )
}


export default MainPage
