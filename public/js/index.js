document.querySelector(".login-form").addEventListener("submit", (e) => {

    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    console.log(email)
    console.log(password)

    const message = (text, color, image) => {
        document.querySelector(".message").style.display = "block"
        document.querySelector(".message-content").style.backgroundColor = color
        document.querySelector(".message-text").textContent = text
        document.querySelector(".message-exit").firstChild.setAttribute(`src`, `../images/${image}.png`);
        setInterval(() => {
            document.querySelector(".message").style.display = "none"
        }, 5000)
    }

    fetch("http://localhost:4200/api/login", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if(data.login === 1){
            location.replace("http://localhost:4200/pages/home.html");
        } else if(data.login === 0) {
            message(data.messageText, data.color, data.image)
            document.querySelector(".login-form").reset()
            document.querySelector(".message-exit").addEventListener("click", e => {
                document.querySelector(".message").style.display = "none"
            })
        } else {
            message(data.messageText, data.color, data.image)
            document.querySelector(".login-form").reset()
            document.querySelector(".message-exit").addEventListener("click", e => {
                location.replace("http://localhost:4200/pages/register.html");
            })
        }
    })

    e.preventDefault()
})
