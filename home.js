let postsHolder = document.getElementById("postsHolder")

function getposts(){
    axios.get("https://tarmeezacademy.com/api/v1/posts?limit=10")
    .then((response) => {
        let posts = response.data.data;
        let render = ``
        for (post of posts) {

            // check if the post does have an img , if don't it will use a placeholder img
            let pimg = ""
            if (post.image != null && typeof post.image == 'string'){
                pimg = post.image
            }
            else{
                pimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvW2jXorDcuGUNTFpAegqf0X6FfCi7FLF4WpZ4oyrwqA&s=10'
            }
             // ##### check if the post does have an img , if don't it will use a placeholder img
            
            // check if the user have a pfp img, if not it will use a placeholder
            let pfpimg = ""
            if(post.author.profile_image != null && typeof post.author.profile_image == 'string'){
                pfpimg = post.author.profile_image
            }
            else{
                pfpimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Av_gvQrAP-pF0SYzLIAD9Rvud-8YYB4mBp93k6SS1Q&s=10'
            }

            // ###### check if the user have a pfp img, if not it will use a placeholder

            render += `
        <div class="post">
            <div class="postHead">
                <img src="${pfpimg}" alt="pfp image">
                <span>@${post.author.username}</span>
            </div>
            <img src="${pimg}" alt="post image">
            <h6>${post.created_at}</h6>
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            <hr>

            <a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-text" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8m0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
            </svg>
            ( ${post.comments_count} ) comments</a>
        </div>
        `
        }
        postsHolder.innerHTML = render

    })
    .catch(error => alert(error.response.data.message))
}
getposts()