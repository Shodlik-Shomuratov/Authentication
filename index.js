const express = require("express")
require("dotenv").config()

const app = express()
const signupRouter = require("./routes/signup.router")

app.use(express.json())

app.use("/api", signupRouter)
app.use("/", express.static("public"))


const port = process.env.PORT || 4200
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))