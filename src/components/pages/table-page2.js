import React, {useContext} from 'react'
import DateContext from '../context'
import DataGrid,
{
    Column,
    Grouping,
    Sorting,
    Paging,
    SearchPanel,
    Summary,
    GroupItem,
    TotalItem,
    Editing,
    Popup,
    Position,
    Form,
    RequiredRule,

}
  from 'devextreme-react/data-grid'
import { Item } from 'devextreme-react/form'
//import notify from 'devextreme/ui/notify';
import ProcentCell from './procent-cell'
import 'react-table/react-table.css'


const TablePage2=() => {
    const { data, updateData } = useContext(DateContext)
    let dataServices={}
    data.map(item=>{
        if (!dataServices[item.GroupNumber]) {
            dataServices[item.GroupNumber]=item.groupName
        }
        return 0
    })

    return (
        <div>
            <DataGrid
                id={'gridContainer'}
                dataSource={data}
                keyExpr={'Id'}
//                paging={false}
                allowColumnReordering={true}
                selection={{ mode: 'single' }}
                showBorders={true}
                hoverStateEnabled={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showRowLines={true}
                showColumnLines={false}
                onRowUpdating={(e)=>{
                    const sendData ={
                        idyear: e.oldData.idyear,
                        idmes: e.oldData.idmes,
                        idpred: e.oldData.idpred,
                        value: e.newData.value || e.oldData.value,
                        plan: e.newData.plan || e.oldData.plan
                    }
//                    console.log('-newData-',sendData)
                    e.cancel=updateData(sendData)
                        .then(res => {
                            // console.log('-res-',res)
                            if (res.status===200) {
                                return false
                            }
                            return true
                        })
                        .catch(error    => {
                            console.log('-ERROR-', error)
                            return true
                        })
                }}
            >
                <Editing
                    mode={'popup'}
                    allowUpdating={true}>
                    <Popup title={'изменение услуги'} showTitle={true} width={400} height={400}>
                        <Position my={'center'} at={'center'} of={window} />
                    </Popup>
                    <Form hoverStateEnabled={true} >
                        <Item itemType={'group'}   colSpan={2} >
                            <Item dataField={'plan'} />
                            <Item dataField={'value'} />
                        </Item>

                    </Form>
                </Editing>
                <SearchPanel visible={true} placeholder={'поиск...'} />
                <Sorting mode={'none'} />
                <Paging pageSize={0}  />
                <Grouping autoExpandAll={true} />

                <Column caption={''}
                        dataField={'GroupNumber'}
                        dataType={'string'}
                        groupIndex={0}
                        customizeText={(cellInfo)=> dataServices[cellInfo.value]}
                />
                <Column allowSorting={false}
                        dataField={'groupName'}
                        dataType={'string'}
                        visible={false}
                />
                <Column caption={'услуга'}
                        dataField={'name'}
                        dataType={'string'}
                />
                <Column caption={'план'}
                        dataField={'plan'}
                        dataType="number"
                        format="###,##0"
                        width={150}
                        alignment={'right'}
                >
                    <RequiredRule />
                </Column>
                <Column caption={'факт'}
                        dataField={'value'}
                        dataType="number"
                        format="###,##0"
                        width={150}
                        alignment={'right'}
                >
                    <RequiredRule />
            </Column>
                <Column caption={'процент'}
//                        calculateCellValue={(data)=> (data.plan===0) ? 0: Math.round(data.value/data.plan*100)}
                        cellRender={ProcentCell}
                        width={100}
                        alignment={'right'}
                />
                <Summary recalculateWhileEditing={true} >
                    <GroupItem
                        column={'plan'}
                        summaryType={'sum'}
                        valueFormat={'###,##0'}
                        showInGroupFooter={false}
                        displayFormat={'{0}'}
                        alignByColumn={true} />
                    <GroupItem
                        column={'value'}
                        summaryType={'sum'}
                        valueFormat={'###,##0'}
                        showInGroupFooter={false}
                        displayFormat={'{0}'}
                        alignByColumn={true} />
                    <TotalItem
                        column={'name'}
                        summaryType={'count'}
                    displayFormat={'{0} услуги всего'} />
                    <TotalItem
                        column={'plan'}
                        summaryType={'sum'}
                        valueFormat={'###,##0'}
                       displayFormat={'ИТОГО : {0}'} />
                    <TotalItem
                        column={'value'}
                        summaryType={'sum'}
                        valueFormat={'###,##0'}
                    displayFormat={'{0}'} />
                </Summary>
            </DataGrid>

        </div>
    )
}
export default TablePage2
