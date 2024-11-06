const $ = (selector, parent = document) => parent.querySelector(selector)
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)]

let themeId = 2
let activePageIdx = 0




const colorPickerBtn = document.getElementById("color-pdicker-btn")
colorPickerBtn.addEventListener('click', () => {
    colorPickerBtn.classList.toggle('active')
})

const themes = colorPickerBtn.querySelectorAll(".color-selector-pickers .color-selector-btn.picker-item")

themes.forEach((theme, idx) => {
    theme.addEventListener('click', (t) => {
        const [primaryColor, secondaryColor] =  theme.getAttribute('style').split(';').map(e => e.trim().split(":")[1].trim())
        const cosmicCobalt = primaryColor === '#53655E' ? '#202F95' : primaryColor

        document.documentElement.style.setProperty('--Nandor', primaryColor)
        document.documentElement.style.setProperty('--Pastel-Mint', secondaryColor)
        document.documentElement.style.setProperty('--Cosmic-Cobalt', cosmicCobalt)

        console.log(primaryColor, secondaryColor, cosmicCobalt);
        

        localStorage.setItem('checked-in-theme', JSON.stringify({
            primaryColor,
            secondaryColor,
            cosmicCobalt
        }))
        theme.classList.add("selected")
        const parent = theme.parentElement
        theme.remove()
        parent.prepend(theme)

        themeId = idx
        showDetails(activePageIdx)
    })
})



const theme = localStorage.getItem('checked-in-theme')
if(theme){
    const {primaryColor, secondaryColor, cosmicCobalt} = JSON.parse(theme)
    document.documentElement.style.setProperty('--Nandor', primaryColor)
    document.documentElement.style.setProperty('--Pastel-Mint', secondaryColor)
    document.documentElement.style.setProperty('--Cosmic-Cobalt', cosmicCobalt)

    themes.forEach((theme, idx) => {
        const [pc] =  theme.getAttribute('style').split(';').map(e => e.trim().split(":")[1].trim())
        if(pc === primaryColor){
            theme.classList.add("selected")
            const parent = theme.parentElement
            theme.remove()
            parent.prepend(theme)

            themeId = idx
            
        }
    })
}




const pages = [
    {
        title: 'Landing',
        heading: 'Landing page',
        content: 'This is the page the user sees when they first visit the site.',
        url: 'https://thriving-gaufre-a6b8fe.netlify.app/pages/landingpage/index.html'
    },
    {
        title: 'Verification',
        heading: 'Verification page',
        content: 'This is the where the user is redirected to after they click on the ">" icon on the landing page.',
        url: 'https://thriving-gaufre-a6b8fe.netlify.app/pages/guest-verification/index.html'
    },
    {
        title: 'Dashboard',
        heading: 'Dashboard page',
        content: 'This is the page page where users can view all the details.',
        url: 'https://thriving-gaufre-a6b8fe.netlify.app/pages/dashboard/index.html'
    },
    {
        title: 'Add-ons',
        heading: 'Upgrade your stay',
        content: 'This is the page where users can add more products, facilities or extras to thier stay.',
        url: 'https://thriving-gaufre-a6b8fe.netlify.app/pages/upgrades/index.html'
    },
    {
        title: 'Nearby',
        heading: 'Nearby places',
        content: 'This is the page where users can view nearby places recommended by the hotel.',
        url: 'https://thriving-gaufre-a6b8fe.netlify.app/pages/guides/index.html'
    },
    {
        title: 'Contact',
        heading: 'Contact host',
        content: 'This is the page where users can contact the host or hotel.',
        url: 'https://thriving-gaufre-a6b8fe.netlify.app/pages/chat/index.html'
    }
]

const navBtnsContainer = $('.nav-btns-container')

function init(){
    // <a href="#" class="nav-btn active">Home</a>
    const navBtns = []
    pages.forEach((page, index) => {
        const navBtn = document.createElement('a')
        navBtn.href = page.url
        navBtn.textContent = page.title
        navBtn.classList.add('nav-btn')
        if(index === 0){
            navBtn.classList.add('active')
            showDetails(0)
        }
        navBtnsContainer.appendChild(navBtn)

        navBtn.addEventListener('click', (e) => {
            e.preventDefault()
            navBtns.forEach(btn => btn.classList.remove('active'))
            navBtn.classList.add('active')
            showDetails(index)
        })

        navBtns.push(navBtn)

    })
}
const pageTitle = $('.info-title')
const pageInfo = $('.info-text')

const iframe = $('.demo-iframe')

function showDetails(pageIdx){
    activePageIdx = pageIdx

    pageTitle.textContent = pages[pageIdx].heading
    pageInfo.textContent = pages[pageIdx].content

    iframe.src = pages[pageIdx].url + `?theme_id=${themeId}`
    console.log(pages[pageIdx].url + `?theme_id=${themeId}`)
}

init()


