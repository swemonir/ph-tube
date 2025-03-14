
function loadCategories(){
 // 1- fetch data
 fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

  // 1- promise convert to json
 .then((res)=> res.json())

  // 1- sent data displayCategories
 .then((data) => displayCategories(data.categories))
}

function displayCategories(categories){
    //get the container
    const categoryContainer= document.getElementById("category-container")


    //loop the operation array of object
    for(let cat of categories){
     console.log(cat);   

    //Create elements
    const categoryDiv= document.createElement("div");
    categoryDiv.innerHTML=`
    <button class="btn btn-sm">${cat.category}</button>
    `;

    //append the elements
    categoryContainer.append(categoryDiv);
}
}

loadCategories();