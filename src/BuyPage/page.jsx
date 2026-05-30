import React from 'react'
import MainForm from '../components/MainForm'
import BuyTable from '../components/BuyTable'
import DownNav from '../components/DownNav'

const BuyPage = () => {
    return (
        <div>
            <DownNav />
            <MainForm initialAction="buy" />
            <BuyTable />
        </div>
    )
}

export default BuyPage