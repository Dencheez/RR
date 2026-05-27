import React from 'react'
import Header from '../components/header'
import MainForm from '../components/MainForm'
import BuyTable from '../components/BuyTable'
import Footer from '../components/Footer'
import BuyLinks from '../components/BuyLinks'
import DownNav from '../components/DownNav'

import BottomNav from '../components/BottomNav'

const BuyPage = () => {
    return (
        <div>
            <Header />
            <DownNav />
            <MainForm initialAction="buy" />
            <BuyTable />
            <BuyLinks />
            <Footer />
            <BottomNav />
        </div>
    )
}

export default BuyPage