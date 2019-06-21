import React from 'react'
import {Container} from 'react-bootstrap'
import DataState from './data'
import {MainPage, TablePage2} from './pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.carmine.css'
function App() {
  return (
      <DataState>
          <Container>
              <div className={'text-center pb-0'} style={{color: 'black'}}><strong>Барановичское отделение</strong></div>
              <div className={'pb-0'}><h4>Экспорт услуг</h4></div>
              <div className={'app'}>
                  <MainPage/>
                    <TablePage2/>
              </div>
          </Container>
      </DataState>
  )
}
export default App;
