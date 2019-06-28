import React from 'react';

// const gridCellData = function(gridData) {
//     return gridData.data[gridData.column.caption.toLowerCase()];
// };

export default function ProcentCell(cellData) {
    const calculatedProc=(cellData.data['plan']===0) ? 0: Math.round(cellData.data['value']/cellData.data['plan']*100)
    return (
        calculatedProc && cellData.data['value']!==0 && cellData.data['plan']!==0
        ? <div className={calculatedProc > 99 ? 'inc' : 'dec'}>
            <div className={'diff'}>{Math.abs(calculatedProc)}</div>
        </div>
        : <div></div>

    );
}
// (cellData)=>{
//     const calculatedProc=(cellData.key['plan']===0) ? 0: Math.round(cellData.key['value']/cellData.key['plan']*100)
//     console.log('-cellData-',calculatedProc)
//     return <div className={'diff'}>{calculatedProc}</div>}