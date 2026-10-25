let postsHolder = document.getElementById("postsHolder")

function getposts(){
    axios.get("https://tarmeezacademy.com/api/v1/posts?limit=10")
    .then((response) => {
        let posts = response.data.data;
        let render = ``
        for (post of posts) {
            render += `
        <div class="post">
            <div class="postHead">
                <img src="${post.author.profile_image}" alt="pfp image">
                <span>@${post.author.username}</span>
            </div>
            <img src="${post.image}" alt="post image">
            <h6>${post.created_at}</h6>
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            <hr>
            <a>(${post.comments_count}) comments</a>
        </div>
        `
        }
        postsHolder.innerHTML = render

    })
    .catch(error => alert(error))
}
getposts()