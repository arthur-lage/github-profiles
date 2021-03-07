const APIURL = 'https://api.github.com/users/'

const main = document.getElementById("main")
const userInput = document.getElementById("username-input")
const userForm = document.getElementById("form")
const submitButton = document.getElementById("submit-button")

async function getUser(user){
    const resp = await fetch(APIURL + user)
    const respData = await resp.json()

    createUserCard(respData)
}

function createUserCard(user){

    let verifiedName = ''

    if(user.name === null){
        verifiedName = user.login
    } else {
        verifiedName = user.name
    }

    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url} alt="${user.name}"/>
        </div>
        <div>
            <h2>${verifiedName}</h2>
            <p>Bio: ${user.bio}</p>
            
            <ul>
                <li>Followed by <strong>${user.followers}</strong></li>
                <li>Following <strong>${user.following}</strong></li>
                <li><strong>${user.public_repos}</strong> Repositories</li>
            </ul>
        </div>
    </div>
    `
    main.innerHTML = cardHTML
}

userForm.addEventListener('submit', e => {
    e.preventDefault()

    const user = userInput.value

    if (user) {
        getUser(user)
        user = ''
    }
})

submitButton.addEventListener('click', () => {

    const user = userInput.value

    if (user) {
        getUser(user)
        user = ''
    }
})