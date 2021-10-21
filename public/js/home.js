document.querySelector(".message-exit").addEventListener("click", e => {
    document.querySelector(".message").style.display = "none"
})

const message = (text, color, image) => {
    document.querySelector(".message").style.display = "block"
    document.querySelector(".message-content").style.backgroundColor = color
    document.querySelector(".message-text").textContent = text
    document.querySelector(".message-exit").firstChild.setAttribute(`src`, `../images/${image}.png`)
    setInterval(() => {
        document.querySelector(".message").style.display = "none"
    }, 5000)
}

let link = document.location.search
if(!link.length){
    console.log(link)
    fetch("http://localhost:4200/api/home").then(res => {
        return res.json()
    }).then(data => {

        if(data.activate === "false"){
            message(
                "Siz hali E-mail'ni aktivlashtirmagansiz. Iltimos E-mailni aktivlashtiring!",
                "#f3a02a",
                "exit"
            )
        }

        document.querySelector(".username").textContent = `${data.firstname} ${data.lastname}`
    })
} else {
    let token = document.location.search.split("=")[1]

    fetch("http://localhost:4200/api/home", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            token: token
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.activate === "true"){
            message(
                "Sizning E-mail muvaffaqiyatli aktivlashtirildi!",
                "#3faf8d",
                "exit"
            )
        }

        document.querySelector(".username").textContent = `${data.firstname} ${data.lastname}`
    })
}