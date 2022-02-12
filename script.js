
const image_container = document.getElementById('image-container');
const loader =document.getElementById('loader');
let photosArray= [];
let ready = false;
let loadedImages = 0;
let total = 0;

let countOfImagesToLoad =5;
const apiKey = 'yaDfmMvwslJCYg6Q1ND2ne_rTnPN82nmXDBwyzz8ii0';
const apiUrl =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${countOfImagesToLoad}`;


// setAttributes function
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

function loaded(){
    loadedImages++;
    if(total === loadedImages){
        ready=true;
        loader.hidden=true;
        console.log(loadedImages);
        // after initial load of the 5 images then on next fetch request load 15 images
        countOfImagesToLoad=15;
    }
    console.log(countOfImagesToLoad);
}

// function to display photos
function displayPhotos(){
    loadedImages=0;
    total = photosArray.length;
    // console.log(total);
    photosArray.forEach((photo)=>{
    // first create anchor<a> element to link image to unsplash website
    const item = document.createElement('a');
    // item.setAttribute("href",photo.links.html);
    // item.setAttribute("target",'_blank');
    setAttributes(item,{
        href : photo.links.html,
        target: '_blank',
    });

    // console.log(item);    
    // create image element and set src, alt, title attribute

    const img = document.createElement('img');

    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);

    setAttributes(img,{
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    //after all the photos are loaded 
    img.addEventListener('load',loaded);
    // not put image element into anchor and anchor into the image container
    item.appendChild(img);        
    image_container.appendChild(item);    
    });
}



// fun to getphots
async function getphots(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArray);
    }catch(error){
        console.log(error);
    }
}


window.addEventListener('scroll',()=>{
    if((window.innerHeight + window.scrollY >= document.body.offsetHeight -1000) && ready ){
        ready = false;
        getphots();
    }
})


getphots();