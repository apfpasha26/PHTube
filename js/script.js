
// loading categories 

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for(let button of buttons){
        button.classList.remove('active')
    }
}

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass()

            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))

}

const loadDetails = async(videoID) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`

    const res =await fetch(uri)
    const data =await res.json()
    
    displayDetails(data.video)
    
}

const displayDetails = (details) => {
    console.log(details);
    
    const detailsContentContainer = document.getElementById('modal-content')

    document.getElementById("showModal").click()

    detailsContentContainer.innerHTML =
    `
     <img src=${details.thumbnail}/>
    `

}




// load videos 
// const demoVideo = {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//       {
//         "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//         "profile_name": "Noah Walker",
//         "verified": false
//       }
//     ],
//     "others": {
//       "views": "543K",
//       "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
//   }

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}


const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container')
    videosContainer.innerHTML = ""

    if(videos.length == 0){
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = 
        `
        <div class="min-h-[250px] flex flex-col justify-center items-center">
            <img src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold text-center mt-5">Oops!! Sorry, There is no <br> content here</h2>
        </div>
        `
        return;
    }
    else{
        videosContainer.classList.add('grid')
    }

    videos.forEach((video) => {
        const card = document.createElement('div')
        card.classList = 'card card-compact'
        // console.log(video)
        card.innerHTML =
            `
            <figure class="h-[200px] rounded-xl">
                <img src="${video.thumbnail}" class="h-full w-full object-cover"/>
            </figure>
            <div class="flex gap-2 py-5 ">
                <div>
                    <img src="${video.authors[0].profile_picture}" class="h-8 w-8 rounded-full object-cover" alt="">
                </div>
                <div class="">
                    <h2 class="card-title">${video.title}</h2>
                    <span>${video.authors[0].profile_name} </span>
                    ${video.authors[0].verified === true ? `<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="" class="inline-block h-5 w-5">` : ""}
                    <p>${video.others.views} views</p>
                    <button onclick="loadDetails('${video.video_id}')" class="btn border-2 border-green-300 bg-white py-1 ">Details</button>
                </div>
            </div>
        `
        videosContainer.append(card)
    })
}



const displayCategories = (category) => {
    const categoryContainer = document.getElementById('category-container')

    category.forEach((item) => {
        // console.log(item);

        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = 
        `
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `
        categoryContainer.append(buttonContainer)

    })

}

loadCategories()
loadVideos()