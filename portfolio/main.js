var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 110, grabCursor: true,
    effect: 'coverflow',
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, coverflowEffect: {
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

const toggle = (e, show) => { e.style.display = show ? 'block' : "none"; }

document.querySelectorAll('.radios')
    .forEach((rc) => {
        const rads = rc.querySelectorAll('input[type=radio]');
        const contents = rc.parentElement.querySelectorAll('.tab-content')
        toggle(contents[0], true);
        for (let i = 0; i < rads.length; i++) {
            rc.addEventListener('change', () => {
                toggle(contents[i], rads[i].checked)
            })
        }
    })
window.addEventListener("load", () => {
    setTimeout(() => {
        mySwiper.slideTo(1)
    }, 1500)
})
