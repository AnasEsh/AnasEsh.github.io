
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