const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('../backend/middlewares/errorHandler')
const notFound = require('../backend/middlewares/notFound')
const connectDB = require('../backend/config/database')
// Connect to database
connectDB()
// Middlewares
app.use(express.json())
app.use('/api', routes)
// Not Found Middleware
app.use(notFound)
// Error Handler Middleware
app.use(errorHandler)
// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)
})