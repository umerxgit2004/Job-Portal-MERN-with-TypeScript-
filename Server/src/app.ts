import express from "express"

import userRoutes from "./routes/userRoutes"

const app = express()

app.use(express.json())

app.use('/api',userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})