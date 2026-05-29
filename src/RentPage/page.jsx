import React from 'react'
import Header from '../components/header'
import MainForm from '../components/MainForm'
import RentTable from '../components/RentTable'
import Footer from '../components/Footer'
import DownNav from '../components/DownNav'

const RentPage = () => {
    return (
        <div>
            <Header />
            <DownNav />
            <MainForm initialAction="rent" />
            <RentTable />
            <Footer />
        </div>
    )
}

export default RentPage