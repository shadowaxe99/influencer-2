const axios = require('axios')
const express = require('express')
const integrateAPIs = async (req, res) => {
try {
const api1Response = await axios.get('http://api1.example.com/data')
const api2Response = await axios.get('http://api2.example.com/data')
const integratedData = {
api1Data: api1Response.data,
api2Data: api2Response.data,
}
res.json(integratedData)
} catch (error) {
res.status(500).json({ error: 'An error occurred while integrating APIs.' })
}
}
module.exports = integrateAPIs