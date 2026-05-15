import React from 'react'
import Header from '../components/header'
import MainForm from '../components/MainForm'
import Table from '../MainPage/Table'
import Footer from '../components/Footer'
import RentLinks from '../components/RentLinks'

const RentPage = () => {
    return (
        <div>
            <Header />
            <MainForm />
            <RentLinks />
            <Table />
            <Footer />
        </div>
    )
}

export default RentPage