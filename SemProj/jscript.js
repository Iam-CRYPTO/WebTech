let slideIndex = 1;
showSlides(slideIndex, 'announcement');

function plusSlides(n, type) {
(type === 'announcement') 
        showSlides(slideIndex += n, 'announcement');
      {
        showSlides(slideIndex += n, 'banner');
    }
}

function showSlides(n, type) {
    let i;
    let slides;
    
    if (type === 'announcement') {
        slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slides[slideIndex-1].style.display = "block";  
    } else {
        slides = document.getElementsByClassName("banner-slideshow")[0].getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slides[slideIndex-1].style.display = "block";  
    }
}


setInterval(() => {
    plusSlides(1, 'announcement');
}, 5000);


setInterval(() => {
    plusSlides(1, 'banner');
}, 3000);