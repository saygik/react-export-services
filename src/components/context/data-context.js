import React from 'react';

const DateContext = React.createContext({
    updateDate: () => {},
    updateData: () => {},
    date: {year: 2013, month:1},
    data:[]
    })

export default DateContext



