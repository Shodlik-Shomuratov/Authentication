const knex = require("../connection/knex")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


router.get("/home", async (req, res) => {

    const token = await req.headers.cookie.split("=")[1]

    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decode) => {
        const user = await knex("users").where("email", decode.email)

        res.json(user[0])
    })

})

router.post("/home", async (req, res) => {
    const { token } = req.body

    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decode) => {
        const { email, activate } = decode

        const updating = await knex("users").where("email", email).update({
            activate: activate
        })
        const user = await knex("users").where("email", email)
        res.json(user[0])
    })

})


router.post("/login", async (req, res) => {

    const { email, password } = req.body
    const hasUser = await knex("users").where("email", email)
    
    if(hasUser.length){
        if(hasUser[0].password === password){
            
            const token = jwt.sign({ email: email, activate: "false" }, process.env.TOKEN_SECRET)
            res.cookie("token", token)

            res.json({
                login: 1,
            })
        } else {
            res.json({
                login: 0,
                messageText: "Parolni xato kiritdingiz!",
                color: "#f3a02a",
                image: 'exit'
            })
        }
    } else {
        res.json({
            login: -1,
            messageText: "Bunday foydalanuvchi yo'q! Iltimos ro'yxatdan o'ting!",
            color: "#d11142",
            image: "arrow"            
        })
    }
    
})



// Register Page
router.post("/register", async (req, res) => {
    
    const { firstname, lastname, date, course, email, password } = req.body
    const token = jwt.sign({ email: email, activate: "true" }, process.env.TOKEN_SECRET)
    const activateLink = `http://localhost:4200/pages/home.html?user=${token}`

    const htmlInfo = `
        <div class="body" style="max-width: 900px; background: #121212; margin: 10px auto; font-family: 'Trebuchet MS', sans-serif; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4); border-radius: 5px;">
            <p style="font-size: 48px; color: #fff; text-align: center; padding: 25px 0 15px 0;">${firstname} ${lastname}</p>
            <p style="font-size: 18px; color: #ddd; text-align: center; padding-bottom: 20px;">Ushbu link orqali E-mail'ingizni aktivlashtiring!</p>
            <p style="font-size: 18px; width: 100%; padding: 30px 20px; background: #fff; text-align: center; color: #121212;">${activateLink}</p>
            <p style="font-size: 24px; color: #ddd; text-align: center; padding: 15px 0;">&copy; APPX Group</p>
        </div>
    `

    try{
        const hasUser = await knex("users").where("email", email)
        if(!hasUser.length){
            const inserting = await knex("users").insert({
                firstname: firstname,
                lastname: lastname,
                date: date,
                course: course,
                email: email,
                password: password
            })

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "shodlikcoder@gmail.com",
                    pass: "vwxokucyoujzuldg"
                }
            })

            let info = transporter.sendMail({
                from: '"APPX Group" <shodlikcoder@gmail.com>',
                to: email,
                subject: "Activate your E-mail account",
                text: "You have to activate your account for use our services!",
                html: htmlInfo
            })

            res.json({
                action: 1
            })

        } else {

            res.json({
                action: 0
            })

        }

    } catch (error) {

        res.status(500).json({
            action: 2
        })        
        
    }
})

module.exports = router