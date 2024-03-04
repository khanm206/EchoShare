const loadPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const posts = (data.posts);
    displayPost(posts);
};



const getSearchText = () => {
const searchBtn = document.getElementById('search');
const searchText = searchBtn.value;
loadBySearch(searchText);
};



const loadBySearch = async (searchText) => {
    loading();
const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
const data = await res.json();
const posts = (data.posts);

displayPost(posts);
};




const displayPost = (posts) => {
    
    const cardContainer = document.getElementById('card-container');
cardContainer.innerHTML = ``;

posts.forEach(post => {
    const div = document.createElement('div');
    div.classList.add('bg-[#79b8fc19]', 'inter', 'p-6', 'rounded-2xl', 'border-[#79b8fc19]', 'border-4')
    let ActiveStatus = `
    <div class="status bg-red-600 w-4 h-4 relative -top-[0.35rem] -left-[0.40rem]"></div>
    `
    
        if(post.isActive){
            ActiveStatus =
            `<div class="status bg-green-600 w-4 h-4 relative -top-[0.35rem] -left-[0.40rem]"></div>`
        }
        
        let a = post.title.replace("'", "");
    
    div.innerHTML=
    `
    <div>
    <img class=" w-16 h-auto rounded-xl" src="${post.image}">
    <div class="status h-5 w-5 bg-white p-2  relative -top-16 left-12">
      ${ActiveStatus}
  </div>
    </div>

    <div class="flex gap-10 text-gray-700 text-sm font-medium">
      <p># <span>${post.category}</span></p>
      <p>Author : <span>${post.author.name}</span></p>
    </div>
    <h1 class="text-black mulish text-xl font-bold mt-2 mb-3">
      ${post.title}
    </h1>
    <p class="text-gray-500 text-base font-normal mb-3">${post.description}</p>
    <hr class="border-gray-400 border-dashed">
    <br>
    <div class="flex justify-between">
      <div class="text-base font-normal text-gray-500 flex gap-6">
<p><i class="fa-regular fa-comment"></i> ${post.comment_count}</p>
<p><i class="fa-regular fa-eye"></i> ${post.view_count}</p>
<p><i class="fa-regular fa-clock"></i> <span>${post.posted_time}</span> min</p>
      </div>
     <button onclick="readMark('${a}', '${post.view_count}',)"> <div class="status h-8 w-8 bg-green-400 flex justify-center items-center">
     <i class="fa-solid fa-envelope-open fa-lg" style="color: #ffffff;"></i>
   </div></button>

    `;

    cardContainer.appendChild(div);

})
}


const LoadLatestNews = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
displayLatestNews(data);
 
}


const displayLatestNews = (data) => {

    const latestNewsContainer = document.getElementById('latest-news-container');


    data.forEach(post => {
        let PublishDate = `<p class="font-normal text-base text-gray-500"> <i class="fa-regular fa-calendar"></i> ${post.author.posted_date}</p>`;
        if(post.author.posted_date === undefined){
            PublishDate = `<p class="font-normal text-base text-gray-500"> <i class="fa-regular fa-calendar"></i> No publish date</p>`;
        }

        let designation = `<p class="text-sm font-normal text-gray-500">${post.author.designation}</p>`;
        if(post.author.designation === undefined){
            designation = `<p class="text-sm font-normal text-gray-500">Unknown</p>`;
        }
        const div = document.createElement('div');
        div.classList.add('border-[#79b8fc49]','shadow-2xl', 'border-4', 'rounded-3xl', 'w-96', 'p-4');
        div.innerHTML = `
        <img class="rounded-3xl w-96 h-auto" src=${post.cover_image}>
          <br>
         ${PublishDate}
         <br>
<h3 class="text-lg font-extrabold mb-2">${post.title}</h3>
<p class="font-normal text-base text-gray-500">${post.description}</p>
<br>
<div class="flex  gap-4 items-center">
  <img class="status w-12" src=${post.profile_image}>
  <div>
    <h4 class="text-base font-bold">${post.author.name}</h4>
  ${designation}
  </div>
</div>

        `

        latestNewsContainer.appendChild(div)
    })
    
// loader(false);

}


const loading = () => {
    const loader = document.getElementById('loader');
loader.classList.add('flex', 'justify-center');
loader.classList.remove('hidden');
const cardContainer = document.getElementById('card-container');
cardContainer.innerHTML = ``;

    setTimeout(function () {

        loader.classList.add('hidden');
    }, 2000);
} 



// const loading = (isLoading) => {
// const loader = document.getElementById('loader');
//     if(isLoading){ 
//         loader.classList.remove('hidden')
// }

// else{loader.classList.add('hidden')

// }}


const readMark = (a,b) => {
    const count = document.getElementById('count');
    const ul = document.getElementById('ul')
    const li = document.createElement('li');
    const c = a.replace("'", "");
    console.log(a,b)
    li.innerHTML = `
    <div class="flex justify-between bg-white p-6 rounded-2xl my-5 w-full">
      <h3 class="text-lg font-semibold">${c}</h3>
      <p class="flex items-center justify-end gap-2 text-gray-600"><i class="fa-regular fa-eye"></i>${b}</p>
    </div>
    `;
    ul.appendChild(li);
    count.innerText = parseInt(count.innerText)+1;
}


loadPost()
LoadLatestNews()