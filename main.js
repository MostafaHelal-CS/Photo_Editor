// Select Element
// The Image
let image=document.getElementById("theImage");
// The image box
let theImageBox=document.querySelector(".image");
// The Filters
let upload=document.getElementById("upload");
let saturate=document.getElementById("saturate");
let brightness=document.getElementById("brightness");
let contrast=document.getElementById("contrast");
let sepia=document.getElementById("sepia");
let grayscale=document.getElementById("grayscale");
let blur=document.getElementById("blur");
let hauRotate=document.getElementById("hauRotate");
let invert=document.getElementById("invert");
let opacity=document.getElementById("opacity");
// Reset & download Element
let reset=document.getElementById("reset");
let download=document.getElementById("download");
let option=document.querySelector(".option");
// Canvas Elemet
let theCanvas=document.getElementById("canvas");
// الاطار بتاع الكانفز(used to draw the image)
let canvazContext=theCanvas.getContext('2d');

console.log(canvazContext);
console.log(image);
window.onload=function () {
    option.style.display="none";
    theImageBox.style.display='none';
};

//Function For Uplaoding image 
upload.onchange=function () {
    option.style.display="flex";
    theImageBox.style.display='block';

    // Class for read image url from file input
    let choosenFile=new FileReader();
    // files is any array of all file input data
    choosenFile.readAsDataURL(upload.files[0]);
    // excute the load of file when the file is loaded
    choosenFile.onload=function () {
        image.src=choosenFile.result;
    };

    image.onload=function () {
        // Get the image width from image
        theCanvas.width=image.width;
        // Get the image height from image
        // x & y equal to zero to draw the image in all area of canvas
        theCanvas.height=image.height;
        canvazContext.drawImage(image, 0, 0, theCanvas.width, theCanvas.height);// image src  ,  x  ,  y  ,  width  ,  height
        image.style.display='none';

    };

    // Calling the reset function
    resetOptions();
};

// Select all input filter
let allFilters=document.querySelectorAll("ul li input");

// Make for loop on all filters
allFilters.forEach(filter => {
    filter.addEventListener("input", function () {
        canvazContext.filter=`
            saturate(${saturate.value}%)
            brightness(${brightness.value}%)
            contrast(${contrast.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hauRotate.value}deg)
            invert(${invert.value})
            opacity(${opacity.value})
            
        `;
        canvazContext.drawImage(image, 0, 0, theCanvas.width, theCanvas.height);// image src  ,  x  ,  y  ,  width  ,  height
    });
});

// Resert all options
function resetOptions () {
    saturate.value=100;
    brightness.value=100;
    contrast.value=100;
    sepia.value=0;
    grayscale.value=0;
    blur.value=0;
    hauRotate.value=0;
    invert.value=0;
    opacity.value=1;
    canvazContext.filter='none';
    canvazContext.drawImage(image, 0, 0, theCanvas.width, theCanvas.height);// image src  ,  x  ,  y  ,  width  ,  height
}

// Clear filters option from image by clicking on reset button
reset.addEventListener('click', resetOptions);


download.onclick=function () {
    download.href=theCanvas.toDataURL();
};


// Stling heading
let theHeading=document.querySelector('h2');

theHeading.innerHTML=theHeading.innerText.split('').map((ele, index) =>
    `<span style="transition-delay:${index*40}ms; filter: hue-rotate(${index*30}deg);">${ele}</span>`).join("");
