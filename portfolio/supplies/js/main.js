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

let sections = new Map([])
const visibilityThresh = innerHeight > 760 ? .7 : innerHeight > 520 ? .2 : .05;
const intro = document.getElementById("intro")


let navRads = document.querySelectorAll('input[name=section-rad]');

const kvRads = new Map(Array.from(navRads).map((e) => [e.getAttribute('data-content'), e]))
const focusClass = 'gained-focus'

function updateTopPadding() {
    document.querySelector(':root').style.setProperty("--headerH", `${document.body.querySelector('header').clientHeight + 10}px `)
}
function checkNavRad(name) {
    kvRads.get(name).checked = true
}
function changeHeaderFocus(topicContainer, focus) {

    topicContainer.querySelector(".topic-header").classList.toggle(focusClass, focus);
}
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

window.addEventListener("load", () => {
    updateTopPadding()

    navRads.forEach((rad) => {
        const label = rad.getAttribute('data-content');

        if (!sections.has(label))
            sections.set(label, document.getElementById(label))
        rad.addEventListener('change', (e) => {
            if (!e.target.checked)
                return;
            sections.get(label).scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
        });

    })
    onresize = updateTopPadding
    startObserving()

    setTimeout(() => {
        toggleIntro()
        intro.onclick = toggleIntro
        const bg = document.getElementById("bg-video")
        bg.playbackRate = .45
        bg.addEventListener("end", () => {
            bg.currentTime = 0;
            bg.play()
        })
    }, 6500)

})
