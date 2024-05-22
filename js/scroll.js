export function handleScrollLeft(e, content){
    content.scrollBy({
        left: -content.clientWidth,
        behavior: 'smooth'
    });
};

export function handleScrollRight(e, content){
    content.scrollBy({
        left: content.clientWidth,
        behavior: 'smooth'
    });
};

export function mouseAndTouchScroll(content){
    let isDown = false;
    let startX;
    let scrollLeft;

    content.addEventListener('mousedown', (e) => {
        isDown = true;
        content.classList.add('active');
        startX = e.pageX - content.offsetLeft;
        scrollLeft = content.scrollLeft;
    });

    content.addEventListener('mouseleave', () => {
        isDown = false;
        content.classList.remove('active');
    });

    content.addEventListener('mouseup', () => {
        isDown = false;
        content.classList.remove('active');
    });

    content.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - content.offsetLeft;
        const walk = (x - startX) * 3 ; //scroll-fast
        content.scrollLeft = scrollLeft - walk;
    });

    content.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - content.offsetLeft;
        scrollLeft = content.scrollLeft;
    });

    content.addEventListener('touchend', () => {
        isDown = false;
    });

    content.addEventListener('touchmove', (e) => {
        if(!isDown) return;
        const x = e.touches[0].pageX - content.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        content.scrollLeft = scrollLeft - walk;
    });
}

export function timeKillerFunction(content, leftClass,rightClass, elementClass){
    document.querySelector(`${leftClass}${elementClass}`)
        .addEventListener('click',(e) =>  handleScrollLeft(e,content));
    document.querySelector(`${rightClass}${elementClass}`)
        .addEventListener('click',(e)=> handleScrollRight(e,content));
    mouseAndTouchScroll(content);
}
