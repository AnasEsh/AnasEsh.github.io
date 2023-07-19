let mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 110, grabCursor: true,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'coverflow', coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    breakpoints: {
        100: { slidesPerView: 1.1, spaceBetween: 50 },
        450: {
            slidesPerView: 1.2, spaceBetween: 70
        }
        ,
        550: {
            spaceBetween: 75
        },
        1050: {
            slidesPerView: 2, spaceBetween: 110
        }

    },
});


const visibilityThresh = innerHeight > 760 ? .5 : innerHeight > 520 ? .1 : .05;
const intro = document.getElementById("intro")



function startObserving() {


    const observer = new IntersectionObserver((views) => {


        views.forEach((obs) => {
            if (obs.isIntersecting && !obs.target.classList.contains('show')) {
                obs.target.classList.add("show")
                checkNavRad(obs.target.getAttribute('id'))
                changeHeaderFocus(obs.target, true)
                return
            }
            if (obs.intersectionRatio > visibilityThresh) {
                checkNavRad(obs.target.getAttribute('id'))
                changeHeaderFocus(obs.target, true)
                return


            }
            changeHeaderFocus(obs.target, false)
        })

    }, { threshold: visibilityThresh })
    document.querySelectorAll('.topic-container.hidden').forEach((view) => observer.observe(view))
}

function toggleIntro(byUser = false) {
    let newId;
    if (intro.id != 'intro') {
        newId = 'intro'

    }
    else
        newId = 'pname'
    if (byUser) {
        intro.onanimationend = () => {
            console.log("ended")
            intro.style.animation = 'none'
        }
    }
    intro.setAttribute("id", newId);

}
let tp=0
function modifyForSamDark() {
    document.getElementById("holder").innerHTML = `<p>LM: ${window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches}</p><p>DM: ${window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches}</p><p>Sam: ${navigator.userAgent.toLowerCase().includes('samsungbrowser')}</p>`;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        
        modifyForSamDark()
        document.getElementById("holder").innerHTML+=`<p>tp ${tp}</p>`
    })
    if (!navigator.userAgent.includes('samsungbrowser'))
        return

    // document.getElementById("holder").innerHTML += `<p>${matchMedia('(prefers-color-scheme: dark)').matches}</p>`
    // document.getElementById("holder").innerHTML += `<p>${navigator.userAgent.toLowerCase().includes('samsungbrowser')}</p>`

    // document.querySelector(':root').style.setProperty("--lightBlack", `#00000036`)
    bg.style.filter = 'brightness(.85)'
    const samcss=document.createElement("link")
    samcss.setAttribute("rel", "stylesheet")
    samcss.setAttribute("type", "text/css")
    samcss.setAttribute("href", "supplies/styling/sam-colors.css")
    document.head.appendChild(samcss)
}
function onInit() {
    // modifyForSamDark()
    handleNav()
    updateTopPadding()
}
window.addEventListener("load", () => {

    onInit()
    onresize = onInit
    startObserving()

    setTimeout(() => {

        toggleIntro()
        intro.onclick = toggleIntro

        bg.playbackRate = .45
        bg.addEventListener("end", () => {
            bg.currentTime = 0;
            bg.play()
        })
    modifyForSamDark()
    }, 6500)

})
