import React, {useContext, createRef} from 'react'
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
    RequiredRule,
}
                from 'devextreme-react/data-grid'
import notify   from 'devextreme/ui/notify'
import ProcentCell from './procent-cell'
import Loading from '../loading'
import 'react-table/react-table.css'


const TablePage2=() => {
    const { data,loading, updateData,dataServices  } = useContext(DateContext)
    const gridRef = createRef()

    // let dataServices={}
    // data.map(item=>{
    //     if (!dataServices[item.GroupNumber]) {
    //         dataServices[item.GroupNumber]=item.groupName
    //     }
    //     return 0
    // })
    return (
        <div>
            <Loading visible={loading}/>
            <DataGrid
                ref={gridRef}
                id={'gridContainer'}
                dataSource={data}
                keyExpr={'Id'}
//                paging={false}
                allowColumnReordering={true}
                showBorders={true}
                hoverStateEnabled={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showRowLines={true}
                twoWayBindingEnabled={false}
                onRowUpdating={(e)=>{
                    let newValue=e.oldData.value
                    let newPlan=e.oldData.plan
                    if (e.newData.value !== undefined) {
                        newValue = e.newData.value
                    }
                    if (e.newData.plan !== undefined) {
                        newPlan = e.newData.plan
                    }
                    const sendData ={
                        idyear: e.oldData.idyear,
                        idmes: e.oldData.idmes,
                        idpred: e.oldData.idpred,
                        value: newValue,
                        plan: newPlan
                    }
                    e.cancel=updateData(sendData)
                        .then(res => {
                            if (res.status===200) {
                                notify('Данные обновлены', 'success', 1000);
                                return false
                            }
                            notify('Ошибка изменения данных', 'error', 2000);
                            return true
                        })
                        .catch(error    => {
                            console.log('-ERROR-', error)
                            notify('Ошибка изменения данных', 'error', 2000);
                            return true
                        })
                }}
            >
                <Editing
                    useIcons={true}
                    mode={'cell'}
                    // mode={'popup'}
                    allowUpdating={true}>
                    {/*<Popup showTitle={false} width={500} height={350}>*/}
                        {/*<Position my={'center'} at={'center'} of={window} />*/}
                        {/*<ToolbarItem*/}
                            {/*toolbar="bottom"*/}
                            {/*widget="dxButton"*/}
                            {/*location="after"*/}
                            {/*options={{text:'Сохранить', type: 'default', onClick: ()=>{gridRef.current.instance.saveEditData()}}}>*/}
                        {/*</ToolbarItem>*/}
                        {/*<ToolbarItem*/}
                            {/*toolbar="bottom"*/}
                            {/*widget="dxButton"*/}
                            {/*location="after"*/}
                            {/*options={{text:'Закрыть', type: 'success', onClick: ()=>{gridRef.current.instance.cancelEditData()}}}>*/}
                        {/*</ToolbarItem>*/}
                    {/*</Popup>*/}
                    {/*<Form >*/}
                        {/*<Item  editorOptions={{name:'plan', showClearButton: true, stylingMode:'underlined',visibleIndex:1 }} visibleIndex={1} dataField={'plan'}  label={{text:'планируемое значение услуги', location:'top'}}  colSpan={2}/>*/}
                        {/*<Item  editorOptions={{ showClearButton: true, stylingMode:'underlined'}} dataField={'value'} label={{text:'фактическое значение услуги', location:'top'}}  colSpan={2}/>*/}
                        {/*<Item itemType={'empty'} colSpan={2} cssClass={'emptyFormItem'}/>*/}
                        {/*<Item  editorOptions={{visible: true, disabled: true, stylingMode:'filled',tabIndex:'0' }} dataField={'name'}  label={{visible: false}} colSpan={2}/>*/}
                    {/*</Form>*/}
                </Editing>
                <SearchPanel visible={true} placeholder={'поиск...'} />
                <Sorting mode={'none'} />
                <Paging pageSize={40}  />
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
                        allowEditing={false}
                />
                <Column caption={'план'}
                        dataField={'plan'}
                        dataType="number"
                        format="###,###,##0"
                        width={150}
                        alignment={'right'}
                >
                    <RequiredRule message={`В поле 'план' должно быть значение`} />
                </Column>
                <Column caption={'факт'}
                        dataField={'value'}
                        dataType="number"
                        format="###,###,##0"
                        width={150}
                        alignment={'right'}
                >
                    <RequiredRule message={`В поле 'факт' должно быть значение`} />
            </Column>
                <Column caption={'процент'}
                        cellRender={ProcentCell}
                        width={100}
                        alignment={'right'}
                />
                {/*<Column type={'buttons'} width={100} buttons={['edit']} />*/}

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
