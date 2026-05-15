import React from 'react'
import Header from '../components/header'
import MainForm from '../components/MainForm'
import Table from '../MainPage/Table'
import Footer from '../components/Footer'
import BuyLinks from '../components/BuyLinks'

const BuyPage = () => {
    return (
        <div>
            <Header />
            <MainForm />
            <BuyLinks />
            <Table />
            <Footer />
        </div>
    )
}

export default BuyPage