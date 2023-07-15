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


const visibilityThresh = innerHeight > 760 ? .7 : innerHeight > 520 ? .2 : .05;
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
function modifyForSamDark() {
    if (!(navigator.userAgent.toLowerCase().includes('samsungbrowser')))
        return
    document.body.getElementById("holder").innerHTML = "DETeeeeeeeeeeeeeev ved"
    document.querySelector(':root').style.setProperty("--brown", `ff9900`)
    bg.style.filter = 'brightness(.85)'

}
function onInit() {
    modifyForSamDark()
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
    }, 6500)

})
