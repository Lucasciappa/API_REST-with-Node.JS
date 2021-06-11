const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { User } = require("../database")


router.post("/register", async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const user = await User.create(req.body)
        res.json(user)

    } catch (err) {
        console.log(err);
        res.status(422).json({ error: "El Email ya esta" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (user) {
            const passValid = await bcrypt.compare(req.body.password, user.password)
            if (passValid) {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, "secret", { expiresIn: 60 * 15 })

                res.json({ token })
                console.log("pis");
            } else {
                res.status(401).json({ error: "Credenciales invalidas" })
            }

        } else {
            res.status(401).json({ error: "Credenciales invalidas" })
        }
        console.log("caca");

    } catch (err) {
        console.log(err);
        res.status(505).json({ error: "Error en DB" })
    }
})



module.exports = router