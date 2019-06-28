import React from 'react'
import { LoadPanel } from 'devextreme-react/load-panel'


const Loading =({visible})=> {
    return (
        <div>
            <LoadPanel
                shadingColor={'rgba(0,0,0,0.4)'}
                visible={visible}
                showIndicator={true}
                shading={true}
                showPane={true}
                message={'Идет загрузка...'}
                closeOnOutsideClick={false}
            />
        </div>
    )
}
export default Loading
