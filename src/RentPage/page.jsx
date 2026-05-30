import React from 'react'
import MainForm from '../components/MainForm'
import RentTable from '../components/RentTable'
import DownNav from '../components/DownNav'

const RentPage = () => {
    return (
        <div>
            <DownNav />
            <MainForm initialAction="rent" />
            <RentTable />
        </div>
    )
}

export default RentPage