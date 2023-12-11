import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfluencerList from '../components/InfluencerList'
function Dashboard() {
const [influencers, setInfluencers] = useState([])
useEffect(() => {
axios.get('/api/influencers')
.then(response => {
setInfluencers(response.data)
})
.catch(error => {
console.error('Error fetching data: ', error)
})
}, [])
return (
<div>
<h1>Dashboard</h1>
<InfluencerList influencers={influencers} />
{/* Other dashboard content goes here */}
</div>
)
}
export default Dashboard