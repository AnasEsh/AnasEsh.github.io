const radGroupName = 'moreRads'
let pCount = 0
const template = '<div class="details"><section><h3 data-helper="type"><span data-helper="name"></span> </h3><p class="light techs" data-helper="techs"></p></section><video autoplay loop muted></video><section class="radios"></section></div>'


function composeSlide(json) {
    const slide = createHElement('div', null, ['swiper-slide'], template.toString())

    const details = slide.querySelector(".details")
    const rads = details.querySelector(".radios")

    for (let tab in json['more']) {
        const tabContent = json['more'][tab]
        const radId = tab + pCount.toString();
        const rad = createHElement("input", { "type": 'radio', "name": `${radGroupName}${pCount}`, "id": radId })
        const label = createHElement("label", { "for": radId }, [], `<p class="tab-nail">${tab}</p>`)
        const tabContainer = createHElement("section", null, ['tab-content'])
        rads.appendChild(rad)
        rads.appendChild(label)
        details.appendChild(tabContainer)
        if (Array.isArray(tabContent)) {
            const ul = document.createElement("ul")
            tabContent.forEach((point) => { ul.appendChild(createHElement('li', null, [], point)) })
            tabContainer.appendChild(ul)
        } else {
            tabContainer.innerHTML = tabContent
        }

    }
    const vid = slide.querySelector("video")
    vid.setAttribute("src", json.vid)
    replayOnEnd(vid)
    vid.onclick = () => vid.requestFullscreen()
    delete json.more;
    delete json.vid
    for (const k in json) {
        const el = slide.querySelector(`[data-helper=${k}]`)
        if (!el)
            continue
        el.innerHTML += json[k]
    }
    if(json.cont)
        rads.nextElementSibling.innerHTML=`<center><div class="contri"><h5>My Contribution:</h5><span>back-end: ${json.cont.b}</span><span>front-end: ${json.cont.f}</span></div></center>`+rads.nextElementSibling.innerHTML;

    pCount++
    return slide
}
async function getProjects() {

    let projects = await fetch("https://dl.dropboxusercontent.com/scl/fi/2mt9kmreczph9uuccsx9n/portfolio.json?rlkey=q1s63fg6dn15u9rl5dec6rvhs&dl=0")

    projects = (await projects.json())['projects']
    const slides = projects.map((projectJson) => composeSlide(projectJson))

    mySwiper.appendSlide(slides)
    linkNailsToTabs()
    setTimeout(() => {
        mySwiper.slideTo(1)
    }, 1500)

}

getProjects()