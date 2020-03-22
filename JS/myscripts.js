/*This javascript was obtained from https://www.w3schools.com/howto/howto_js_slideshow.asp as part of slideshow, commented by myself*/
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
	/*Gets the element by class name*/
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
	/*For loop to show each image*/
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
	/*Increment*/
    slideIndex++;
	/*Cycle through dots at bottom of slideshow*/
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Changes the image every 2 seconds
}

