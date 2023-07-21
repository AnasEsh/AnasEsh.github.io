const radGroupName = "moreRads";
let pCount = 0;
const template =
    '<div class="details"><section><h3 data-helper="type"><span data-helper="name"></span> </h3><p class="light techs" data-helper="techs"></p></section><video autoplay loop muted playsinline></video><section class="radios"></section></div>';
function composeSlide(e) {
    let t = createHElement(
            "div",
            null,
            ["swiper-slide"],
            '<div class="details"><section><h3 data-helper="type"><span data-helper="name"></span> </h3><p class="light techs" data-helper="techs"></p></section><video autoplay loop muted></video><section class="radios"></section></div>'.toString()
        ),
        n = t.querySelector(".details"),
        l = n.querySelector(".radios");
    for (let o in e.more) {
        let i = e.more[o],
            a = o + pCount.toString(),
            s = createHElement("input", { type: "radio", name: `${radGroupName}${pCount}`, id: a }),
            r = createHElement("label", { for: a }, [], `<p class="tab-nail">${o}</p>`),
            d = createHElement("section", null, ["tab-content"]);
        if ((l.appendChild(s), l.appendChild(r), n.appendChild(d), Array.isArray(i))) {
            let p = document.createElement("ul");
            i.forEach((e) => {
                p.appendChild(createHElement("li", null, [], e));
            }),
                d.appendChild(p);
        } else d.innerHTML = i;
    }
    let c = t.querySelector("video");
    for (let u in (c.setAttribute("src", e.vid), replayOnEnd(c), (c.onclick = () => c.requestFullscreen()), delete e.more, delete e.vid, e)) {
        let h = t.querySelector(`[data-helper=${u}]`);
        h && (h.innerHTML += e[u]);
    }
    return (
        e.cont && (l.nextElementSibling.innerHTML = `<center><div class="contri"><h5>My Contribution:</h5><span>back-end: ${e.cont.b}</span><span>front-end: ${e.cont.f}</span></div></center>` + l.nextElementSibling.innerHTML), pCount++, t
    );
}
async function getProjects() {
    let e = await fetch("https://dl.dropboxusercontent.com/scl/fi/2mt9kmreczph9uuccsx9n/portfolio.json?rlkey=q1s63fg6dn15u9rl5dec6rvhs&dl=0");
    e = (await e.json()).projects;
    let t = e.map((e) => composeSlide(e));
    mySwiper.appendSlide(t),
        linkNailsToTabs(),
        setTimeout(() => {
            mySwiper.slideTo(1);
        }, 1500);
}
window.addEventListener("load",()=>setTimeout(getProjects,2500) )


