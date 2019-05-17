import React, {Component} from 'react'
import {DataConsumer} from '../context'
import MonthPicker from '../monthpicker'


class MainPage extends Component {
    render() {
        return (
            <div>
                <DataConsumer>
                    { (data) =>
                        <div>
                            <MonthPicker date={data.appData.date} updateDate={data.updateDate}/>
                        </div>
                    }
                </DataConsumer>

            </div>
        )
    }
}


export default MainPage
