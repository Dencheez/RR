import React from 'react'
import Header from '../components/header'
import MainForm from '../components/MainForm'
import BuyTable from '../components/BuyTable'
import Footer from '../components/Footer'
import BuyLinks from '../components/BuyLinks'
import DownNav from '../components/DownNav'

const BuyPage = () => {
    return (
        <div>
            <Header />
            <DownNav />
            <MainForm initialAction="buy" />
            <BuyTable />
            <BuyLinks />
            <Footer />
        </div>
    )
}

export default BuyPage