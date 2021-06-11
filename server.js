const express = require("express")
const app = express()
const { checkToken } = require("./middleware/checkToken")


require("./database")

// for parsing aplication/json
app.use(express.json())

// for parsing aplication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get("/",checkToken , (req, res) => {
    console.log(req.params);
    res.send("ok")
})

app.use("/api/users", require("./routes/users"))
app.use("/api/categorias", require("./routes/categorias"))

app.listen(3000, () => {
    console.log("*:3000");
})
