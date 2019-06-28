import React from 'react'
//import {Container} from 'react-bootstrap'
import DataState from './data'
import {MainPage, TablePage2} from './pages'
import Header from './header'
//import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
function App() {
  return (
      <DataState>
          <Header/>
          <div className={'container dx-clearfix'}>
              <div className={'app'}>
                  <MainPage/>
                    <TablePage2/>
              </div>
          </div>
      </DataState>
  )
}
export default App;
