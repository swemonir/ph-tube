
function removeActiveClass(){
    const activeButtons= document.getElementsByClassName("active")
    console.log(activeButtons)
    for (let btn of activeButtons){
        btn.classList.remove("active")
    }
}


function loadCategories(){
 // 1- fetch data
 fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

  // 1- promise convert to json
 .then((res)=> res.json())

  // 1- sent data displayCategories
 .then((data) => displayCategories(data.categories))
}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")

    // 1- promise convert to json
   .then((response)=> response.json()) 
   .then((data) => {
    removeActiveClass();
    document.getElementById("btn-all").classList.add("active")
    displayVideos(data.videos)
   });
}

const loadVideoDetails=(videoId)=>{
    console.log(videoId);
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideoDetails(data.video));

}
const displayVideoDetails=(video)=>{
console.log(video);
document.getElementById("video_details").showModal()
const detailsContainer= document.getElementById("details-container")
detailsContainer.innerHTML=
`
<div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
    
    </div>
  </div>
</div>

`
}

const loadCategoryVideos=(id) =>{
const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
console.log(url);

fetch(url)

    // 1- promise convert to json
   .then((response)=> response.json()) 
   .then((data) => {
    removeActiveClass();
    const clickedButton= document.getElementById(`btn-${id}`)
    clickedButton.classList.add("active")
    displayVideos(data.category)

   });
};


function displayCategories(categories){
    //get the container
    const categoryContainer= document.getElementById("category-container")


    //loop the operation array of object
    for(let cat of categories){
     
    //Create elements
    const categoryDiv= document.createElement("div");
    categoryDiv.innerHTML=`
    <button id="btn-${cat.category_id}" onClick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white"">${cat.category}</button>
    `;

    //append the elements
    categoryContainer.append(categoryDiv);
}
};


const displayVideos=(videos) => {

const videoContainer = document.getElementById("video-container");
videoContainer.innerHTML="";
if(videos.length==0){
    videoContainer.innerHTML=`
    <div class="col-span-full text-center flex flex-col justify-center items-center py-20">

        
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no <br> content here</h2>
    </div>
    `
    return;
}

videos.forEach((video) =>{

const videoCard = document.createElement("div");
videoCard.innerHTML=`
<div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white text-sm rounded px-2 bg-black">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 py-5">
              
                <div class="profile">
                    <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 gap-0 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                      

                    </div>
                  </div>
                </div>
                <div class="intro">
                    <h2 class="text-base font-bold flex gap-1">${video.title}</h2>
                    <p class="text-sm text-gray-400 py-2 flex">
                    ${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ?  `<img class="w-5 h-5 ml-1" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`: ``}
                    </p>

                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
          </div>

`
    videoContainer.append(videoCard);
});

};





loadCategories();
// loadVideos();