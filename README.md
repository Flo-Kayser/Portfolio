# FloKayser

project: .project-container {
    display: flex;
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.project-box {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 500px;
    /* min-height: 350px; */
    aspect-ratio: 9/16;
    background: var(--hover-accent-color);
    border-radius: 2rem;
    overflow: hidden;
    
    height: auto;


    justify-content: center;
    align-items: center;
    
}

.project-box::before {
    content: '';
    position: absolute;
    top: var(--y);
    left: var(--x);
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--valid-color);
    transition: .5s, top .2s, left 0.2s;
}

.project-box:hover::before{
    width: 1500px;
    height: 1500px;
    z-index: 1;
}

.project-box-content{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 80%;
    /* background: red; */
    z-index: 2;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 1rem;
    
}

.project-box-content .pro-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%; /* Bild nimmt gesamte Breite ein */
    height: auto;
    z-index: 1;}

.project-box-content img{
    width: 100%;
    height: auto;
    object-fit: cover; /* Bild proportional */
    border-radius: 2rem;
    transition: transform 0.4s ease, border-radius 0.5s;
    transform-origin: top center; /* Skalierung von oben */

}

.project-box:hover img{
    transform: translate(-50%, 10%) scale(1.3);
    box-shadow: 0 0 0 ;
    border-radius: 0;
}
    
    

.project-box-content p{
    color: var(--default-color);
}

js
// ========== Projects ==========
let projectBox = document.querySelectorAll('.project-box');
projectBox.forEach(projectBox =>{
  projectBox.onmousemove = function(e){
    let x =e.pageX -projectBox.offsetLeft;
    let y =e.pageY -projectBox.offsetTop;

    projectBox.style.setProperty('--x', x+'px');
    projectBox.style.setProperty('--y', y+'px');
  }
})