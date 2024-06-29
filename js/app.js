gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let width = window.innerWidth;
let smootherInstance;
let triggers = [];

function initGSAP() {
    smootherInstance = ScrollSmoother.create({
        wrapper: ".wrapper",
        content: ".content",
        smooth: 1.5,
        effects: true,
    });

    triggers.push(
        gsap.fromTo(".hero-section", { opacity: 1 }, {
            opacity: 0,
            scrollTrigger: {
                trigger: ".hero-section",
                start: "center",
                end: '720',
                scrub: true,
            }
        })
    );

    triggers.push(
        gsap.fromTo(".contact-data-hero", { opacity: 0, display: "none" }, {
            opacity: 1,
            display: "block",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "start",
                end: '20',
                scrub: true,
            }
        })
    );

    let itemsL = gsap.utils.toArray('.gallery-left .gallery__item');
    itemsL.forEach(item => {
        triggers.push(
            gsap.fromTo(item, { opacity: 0, x: -60 }, {
                opacity: 1, x: 10,
                scrollTrigger: {
                    trigger: item,
                    start: '-850',
                    end: '-100',
                    scrub: true,
                }
            })
        );
    });

    let itemsR = gsap.utils.toArray('.gallery-right .gallery__item');
    itemsR.forEach(item => {
        triggers.push(
            gsap.fromTo(item, { opacity: 0, x: 30 }, {
                opacity: 1, x: 10,
                scrollTrigger: {
                    trigger: item,
                    start: '-850',
                    end: '-100',
                    scrub: true,
                }
            })
        );
    });
}

function killGSAP() {
    if (smootherInstance) {
        smootherInstance.kill();
        smootherInstance = null;
    }

    triggers.forEach(trigger => trigger.scrollTrigger.kill());
    triggers = [];
}

function updateSizeInfo() {
    width = window.innerWidth;

    if (width < 1024) {
        if (smootherInstance) {
            killGSAP();
            window.location.reload();
        }
    } else if (width >= 1024) {
        if (!smootherInstance) {
            initGSAP();
        }
    }
}

window.addEventListener('resize', updateSizeInfo);

if (width >= 1024 && ScrollTrigger.isTouch !== 1) {
    initGSAP();
}




if(document.querySelector("footer")){
    const today = new Date();
    const year = today.getFullYear();
    document.querySelector("footer p").innerHTML = `${year}`; 
}

if(document.querySelector(".modal-background")){
         
    const modalBkg = document.querySelector(".modal-background");
    const modal = document.querySelector(".modal-block");
    const body = document.querySelector("body");
    const modalWidget = document.querySelector(".modal-info-widget"); 
    
    const openModalHnalder = (i) =>{ 
        body.style.overflowY = "hidden";
        modalBkg.classList.remove("none");
        modal.classList.remove("none");
        modalBkg.addEventListener("click", closeModalHandler);
        modal.querySelector(".modal-content > h2").innerHTML = projects[i].title; 
        modal.querySelector(".modal-content > div").innerHTML = projects[i].img.map((img, index)=>(
            `
            <div>
                <img src=${img} alt="">
                <p>${projects[i].descrip[index]}</p>
            </div>
            `
        )).join("");

        modal.querySelectorAll(".modal-links a")[0].href = projects[i].links.online; 
        modal.querySelectorAll(".modal-links a")[0].innerHTML = projects[i].links.online;   
        modal.querySelectorAll(".modal-links a")[1].href = projects[i].links.github; 
        modal.querySelectorAll(".modal-links a")[1].innerHTML = projects[i].links.github; 

        modal.querySelectorAll(".modal-links a").forEach((a) => {
            console.log(a.innerHTML.length);
            if(a.innerHTML.length < 4){   
                a.style.pointerEvents = 'none';
                a.style.textDecoration = 'none';
            }else{
                a.style.pointerEvents = 'all';
                a.style.textDecoration = 'underline';
            }
        })
    }

    document.querySelectorAll(".gallery .projects-block").forEach((p, i)=>{
        p.addEventListener("click", () => openModalHnalder(i));
    });
    document.querySelectorAll(".gallery-mobile .projects-block").forEach((p, i)=>{
        p.addEventListener("click", () => openModalHnalder(i));
    });
    const closeModalHandler = () => {
        modalBkg.removeEventListener("click", closeModalHandler);
        body.style.overflowY = "auto";
        modalBkg.classList.add("none");
        modal.classList.length === 1  && modal.classList.add("none");
        modalWidget.classList.length === 1  && modalWidget.classList.add("none");
        
    }
    document.querySelector(".modal-block > img").addEventListener("click", closeModalHandler);

    const openInfoHanlder = () => {
        body.style.overflowY = "hidden";
        modalBkg.classList.remove("none");
        modalBkg.addEventListener("click", closeModalHandler);
        modalWidget.classList.remove("none");
    }
    document.querySelector(".info-widget").addEventListener("click", openInfoHanlder);
    document.querySelector(".modal-info-widget > div > img").addEventListener("click", closeModalHandler);
}

