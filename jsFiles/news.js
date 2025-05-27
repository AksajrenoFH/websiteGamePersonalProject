// Hamburger Menu

const h = document.getElementById('hamburger');
const m = document.getElementById('menu');

h.addEventListener('click', () =>{
    m.classList.toggle('show')
    h.classList.toggle('active')
})

// Navbar

const n = document.getElementById('navbar')

window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
        n.classList.add('fixed')
    } else{
        n.classList.remove('fixed')
    }
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        n.classList.add('fixed2')
        if(h.classList.contains('active') & m.classList.contains('show')){
            m.classList.remove('show')
            h.classList.remove('active')
        }
    } else if(n.classList.contains('fixed')){
        n.classList.remove('fixed2')
    } else{
        n.classList.remove('fixed2')
    }
})

// Dropdown Menu

// Buat variabel konstan bernama toggle
// isinya yaitu ambil semua document yg punya id dropdown
const toggle = document.querySelectorAll('.dropbtn')

// ini buat semua elemen toggle yg berada didalamnya
toggle.forEach(toggle => {
    // ksih event handler yaitu 'click' di elemenya 
    // dan klo diklik jalanin fungsi ini
    toggle.addEventListener('click', function (e) {
        // buat varianel konstan bernama menu
        // ambil elemen elemen setelah elemen itu diklik
        // misal, klo ngeklik <div class="dropdown"> dan dibawah elemennya ada <div class="dropdown-menu">
        // yg diambil itu elemen setelah dropdown atau dropdown-menu
        const menu = this.nextElementSibling
        
        // ambil semua document yg punya class dropdown-menu
        // setiap class yang diambil--
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            // -- Kalo elemen itu bkn menu yg gk aktif, kasih display: none;
            if(m !== menu) m.style.display = 'none'
        })

        // Kalo menunya itu display: block;
        if(menu.style.display === 'block'){
            // maka ubah menunya jdi display: none;
            menu.style.display = 'none'
        } else{
            // Klo bkn, display ubah jdi block
            menu.style.display = 'block'
        }
    })
})

// Searchbar

const newsItem = document.querySelectorAll('.news .detail')
const search = document.getElementById('searchBar')

search.addEventListener('input', function (){
    const query = this.value.toLowerCase()

    newsItem.forEach(item => {
        const title = item.querySelector('.title').textContent.toLowerCase()
        if(title.includes(query)){
            item.style.display = 'block'
        } else{
            item.style.display = 'none'
        }

        console.log()
    })
})

// Dropdown Items

let category = 'all'
let view = null
let date = 'new'

// newsItem ada dibagian Searchbar //
const catLabel = document.querySelector('#catBtn .label')
const viewLabel = document.querySelector('#viewBtn .label')
const dateLabel = document.querySelector('#dateBtn .label')

    // Filter & Sort

function updateNewsDisplay() {
    let filtered = [...newsItem]

    if(category !== 'all'){
        filtered = filtered.filter(item => item.dataset.category === category)
    }

    if(view){
        filtered.sort((a, b) => {
            const aViews = parseInt(a.dataset.view)
            const bViews = parseInt(b.dataset.view)
            return view === "most" ? bViews - aViews : aViews - bViews
        })
    }

    if(date){
        filtered.sort((a, b) => {
            const aDate = new Date(a.dataset.date)
            const bDate = new Date(b.dataset.date)
            return date === "new" ? bDate - aDate : aDate - bDate
        })
    }

    const newContainer = document.querySelector('.news')

    newContainer.innerHTML = ''
    filtered.forEach(item => {
        newContainer.appendChild(item)
    })
}

    // Change Dropdown Name (Category => All)

function setCategory(id){
    category = id
    catLabel.textContent = id === 'all' ? 'Category' : capitalize(id)
    view = null
    viewLabel.textContent = "Views"
    date = null
    dateLabel.textContent = "Date"
    enableDropdown('viewBtn')
    enableDropdown('dateBtn')
    updateNewsDisplay()
}

function setView(id){
    view = id
    viewLabel.textContent = id === 'most' ? 'Popular' : capitalize(id)
    date = null
    dateLabel.textContent = "Date"
    disableDropdown('dateBtn')
    updateNewsDisplay()
}

function setDate(id){
    date = id
    dateLabel.textContent = id === 'new' ? 'Latest' : capitalize(id)
    view = null
    viewLabel.textContent = 'Views'
    disableDropdown('viewBtn')
    updateNewsDisplay()
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

    // Enable & Disable Dropdown

function enableDropdown(id){
    document.getElementById(id).classList.remove('disabled')
    document.getElementById(id).disabled = false
}

function disableDropdown(id){
    document.getElementById(id).classList.add('disabled')
    document.getElementById(id).disabled = true
}

    // Event Listener

// Category
document.getElementById("all").addEventListener('click', () => {
    setCategory("all")
})
document.getElementById("update").addEventListener('click', () => {
    setCategory("update")
})
document.getElementById("event").addEventListener('click', () => {
    setCategory("event")
})
document.getElementById("system").addEventListener('click', () => {
    setCategory("system")
})

// Views
document.getElementById("most").addEventListener('click', () => {
    setView("most")
})
document.getElementById("least").addEventListener('click', () => {
    setView("least")
})

// Date
document.getElementById("new").addEventListener('click', () => {
    setDate("new")
})
document.getElementById("old").addEventListener('click', () => {
    setDate("old")
})

updateNewsDisplay()