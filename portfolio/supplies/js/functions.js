
const bg = document.getElementById("bg-video")
const toggle = (e, show) => { e.style.display = show ? 'block' : ""; }
function linkNailsToTabs() {
    const moreRads = document.querySelectorAll('.radios');
    moreRads.forEach((group) => {
        const rads = group.querySelectorAll("input[type=radio]")
        const contentContainers = rads[0].parentElement.parentElement.querySelectorAll('.tab-content')
        rads[0].checked = true
        toggle(contentContainers[0], true)
        for (let i = 0; i < rads.length; i++) {
            rads[i].addEventListener('change', () => {
                for (let j = 0; j < rads.length; j++)
                    toggle(contentContainers[j], j == i)
            })

        }
    })

}
function createHElement(type, attrs = {}, classList = [], innerHtml = '') {
    const el = document.createElement(type)
    classList.forEach((c) => el.classList.add(c))

    for (let attr in attrs)
        el.setAttribute(attr, attrs[attr])
    el.innerHTML = innerHtml
    return el
}
function replayOnEnd(vid) {
    vid.addEventListener("end", () => {
        vid.currentTime = 0;
        vid.play()
    })
}
let sections = new Map([])
let navRads = document.querySelectorAll('input[name=section-rad]');
const kvRads = new Map(Array.from(navRads).map((e) => [e.getAttribute('data-content'), e]))
const focusClass = 'gained-focus'
const mainWrapper = document.querySelector("#main-wrapper")
function updateTopPadding() {
    document.querySelector(':root').style.setProperty("--headerH", `${document.body.querySelector('header').clientHeight + 10}px `)
}
function checkNavRad(name) {
    if (!mainWrapper.onscroll) {
        kvRads.get(name).checked = true
        return
    }
    kvRads.forEach((rad) => {
        if (rad.getAttribute("data-content") == name) {
            rad.parentElement.style.transform = "scaleX(1.3)";
            rad.checked = true
        }
        else
            rad.parentElement.style.transform = ''
    })

}
function changeHeaderFocus(topicContainer, focus) {

    topicContainer.querySelector(".topic-header").classList.toggle(focusClass, focus);
}

function handleNav() {
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
    if (innerWidth > 925)
        return

    const navList = document.querySelector(".nav-bar ul")
    function toggleNav(expand = false) {
        navList.classList.toggle("burger-expanded", expand)
    }
    mainWrapper.onscroll = e => { toggleNav(false) }
    navList.addEventListener("click", (e) => {
        if (navList.classList.contains("burger-expanded"))
            return
        e.preventDefault()
        toggleNav(true)
    })

}