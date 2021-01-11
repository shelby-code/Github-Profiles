const API_URL = 'https://api.github.com/users/'
const form = document.getElementById('form')
const input = document.querySelector('input')
const main = document.getElementById('main')

async function getUsers(user){

    try{
        const  { data } = await axios(API_URL + user)

        updateCard(data)
        getRopos(user)
    } catch(err){

        if(err.response.status === 404){
            errorMsg('Nothing found')
        }
        
    }
}

async function getRopos(user){
    try{
        const  { data } = await axios(API_URL + user + '/repos')
        createRepos(data)

       
    } catch(err){
            errorMsg('Error Fetching Repos')
        } 
}

function createRepos(repos){
    const reposEl = document.getElementById('repos')

    repos
        .slice(0,10)
        .forEach((repo)=>{
        const tag = document.createElement('a')
        tag.classList.add('cards')
        tag.href = repo.html_url
        tag.target = '_blank'

       tag.innerText = repo.name 
       reposEl.appendChild(tag)
    })
}

function errorMsg(msg){
    const errors = `
        <div>
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = errors
}


function updateCard(users){
    const TEXT = `
    <div class="avatar">
    <img src=${users.avatar_url} alt=${users.name}>
</div>

<div class="profile">
    <div class="profile-name">
        <h1>${users.name}</h1>
        <p>${users.bio}</p>
    </div>

    <div class="profile-details">
        <div class="followers">
            ${users.followers} followers
        </div>

        <div class="following">
            ${users.following} following
        </div>

        <div class="repos">
            ${users.public_repos} Repos
        </div>
    </div>

    <div id="repos">
    </div>

</div>
    `
    main.innerHTML = TEXT

}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const users = input.value
    if(users){
        getUsers(users)


        input.value = ''
    }
})