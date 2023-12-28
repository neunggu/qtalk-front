
export function grabScroll (elementId, styles){
    const slider = document.querySelector(elementId);
    let isDown = false;
    let startX;
    let scrollLeft;
  
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add(styles.active);
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove(styles.active);
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove(styles.active);
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    })
}


export function openPopup(url){
  const width = 450;
  const height = 850;
  const popupX = (document.body.offsetWidth  / 1.5);
  const popupY= (window.screen.height / 3) - (height / 3);
  window.open(url,'popup',`width=${width},height=${height},left=${popupX},top=${popupY}`);
  return false;
}

export function userImageUrl(imageUrl){
  return `${process.env.USER_IMAGE_BASE_URL}/${imageUrl}`;
}
