
document.getElementById("registration-form").addEventListener("submit", e => {

    const firstname = document.getElementById("firstname").value
    const lastname = document.getElementById("lastname").value
    const date = document.getElementById("date").value
    const course = document.getElementById("course").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    fetch("http://localhost:4200/api/register", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            date: date,
            course: course,
            email: email,
            password: password
        })
    }).then( res => {
        return res.json()
    }).then( data => {
        const action = data.action

        console.log(action)

        const modal = (modalText, link, buttonText, imgUrl) => {
            document.querySelector(".modal").style.display = "flex"
            document.querySelector(".modal-text").textContent = modalText
            document.querySelector(".modal-link").setAttribute("href", link) 
            document.querySelector(".modal-link").firstChild.textContent = buttonText
            document.querySelector(".modal-img").setAttribute("src", imgUrl)
        }
    
        if(action == 0){
            modal(
                "Ushbu E-mail orqali foydalanuvchi ro'yhatdan o'tgan.\n Iltimos qaytadan ro'yxatdan o'ting",
                "http://localhost:4200/pages/register.html",
                "Ro'yhatdan o'tish",
                "../images/warning.png"
                )
        } else if(action == 1) {
            modal(
                "Sizning E-mail akkauntingizga link yuborildi.\n Iltimos akkauntingizni faollashtiring",
                "http://localhost:4200",
                "Davom qilish",
                "../images/success.png"
                )
        } else {
            modal(
                "Serverda xatolik! \n Iltimos keyinroq urinib ko'ring!",
                "http://localhost:4200/pages/register.html",
                "Keyinroq",
                "../images/wrong.png"
            )
        }
    })

    e.preventDefault()
})


