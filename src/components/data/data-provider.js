import React, {Component} from 'react'
import moment from 'moment'
import {DataProvider} from '../context/index'
import {fetchPeriod} from '../../services/api'

class DataState extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appData: {
                date: {year: 2013, month:1},
                data:[]
            }
        }
        this.updateDate = date  =>this.setAppDataState({date: date})
    }

    setAppDataState(property) {
        this.setState(prevState => ({
            appData: {
                ...prevState.appData,
                ...property
            }
        }))
    }
    componentDidUpdate(prevProps,prevState) {
        if (this.state.appData && this.state.appData.date!==prevState.appData.date) {
            fetchPeriod(this.state.appData.date).then(data=>{
                if (data && data.fetchOK) {
                    this.setAppDataState({data: data.data})
                }

            })
        }
    }
    componentDidMount() {
        this.setAppDataState({date: {year: moment().year(), month:moment().month()+1}})

    }

    render() {
        const { updateDate } = this;
        const { appData } = this.state;
        return (
            <DataProvider value={{appData, updateDate}} >
                {this.props.children}
            </DataProvider>        )
    }
}

export default DataState
