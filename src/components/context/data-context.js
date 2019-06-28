import React from 'react';

const DateContext = React.createContext({
    date: {year: 2013, month:1},
    updateDate: () => {},
    data:[],
    updateData: () => {},
    loading: false,
    dataServices:{}
    })

export default DateContext



