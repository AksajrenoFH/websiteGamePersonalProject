// Hamburger Menu

const h = document.getElementById('hamburger');
const m = document.getElementById('menu');

h.addEventListener('click', () =>{
    m.classList.toggle('show')
    h.classList.toggle('active')
})

// navbar

const n = document.getElementById('navbar')

window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
        n.classList.add('fixed')
    } else{
        n.classList.remove('fixed')
    }
900
    if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
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