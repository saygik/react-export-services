import React, {useContext} from 'react'
import DateContext from '../context'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { LoadPanel } from 'devextreme-react/load-panel';
const TablePage=() => {
    const {data,loading} = useContext(DateContext)
    const position = { of: '#employee' }
    let expandedRow={}
    const expandedDataLen=[...new Set(data.map(item=>item.groupName))].length
    for (var i = 0; i < expandedDataLen; i++) {
        expandedRow[i]=true
    }
    const columns = [{
        Header: 'name',
        accessor: 'name',
        Aggregated: <span></span>,
        width: 400
    }, {
        Header: 'value',
        accessor: 'value',
        aggregate: (values ) => {
            return values.reduce((sum , item) => sum + (item || 0) ,0)
        }  ,
        Aggregated: row => {
            return row.value && row.value
        }
    }, {
        Header: 'plan',
        accessor: 'plan',
        aggregate: (values ) => {
            return values.reduce((sum , item) => sum + (item || 0) ,0)
        }  ,
        Aggregated: row => {
            return row.value && row.value
        }
    },{
        Header :'groupName',
        accessor: 'groupName',
        width: 420
    } ]
    return (
        <div>
            <div id={'employee'}>
                <LoadPanel
                    shadingColor={'rgba(0,0,0,0.4)'}
                    position={position}
                    visible={loading}
                    showIndicator={true}
                    shading={true}
                    showPane={true}
                    closeOnOutsideClick={false}
                />
            </div>
            <ReactTable
                data={data}
                columns={columns}
                pivotBy={["groupName"]}
                className=" -highlight"
                showPagination={false}
                expanded={expandedRow}
                minRows={0}
            />
            {/*<ul>*/}
                {/*{*/}
                    {/*data.map(item =>*/}
                        {/*<li key={item.Id}>{item.Id}/{item.idpred} *** {item['value']}/{item.plan}  </li>*/}
                    {/*)*/}
                {/*}*/}
            {/*</ul>*/}

        </div>
    )
}

export default TablePage
