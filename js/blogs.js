const blogs = [
    {
        "id": 80,
        "title": "Barcelonada jarohat 1",
        "category": 2,
        "image": "https://asadbek6035.pythonanywhere.com/media/blog/i.webp",
        "description": "Barcelonadan Martines 3 haftaga jarohat oldi",
        "date_created": "2025-02-03",
        "owner": null
    },
    {
        "id": 81,
        "title": "Barcelona haqida",
        "category": 2,
        "image": "https://asadbek6035.pythonanywhere.com/media/blog/slide4.jpg",
        "description": "Barcelonadan irodali g'alaba",
        "date_created": "2025-02-03",
        "owner": null
    },
    {
        "id": 82,
        "title": "Barcelona haqida",
        "category": 2,
        "image": "https://asadbek6035.pythonanywhere.com/media/blog/i_5iGMzUX.webp",
        "description": "Yamaldan golli uzatma",
        "date_created": "2025-02-03",
        "owner": null
    },
];

document.addEventListener('DOMContentLoaded', function() {
    const blogsList = document.getElementById('blogs-list');

    blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.description}</p>
            <img src="${blog.image}" alt="${blog.title}" />
            <button onclick="viewBlog(${blog.id})">Batafsil</button>
        `;
        blogsList.appendChild(blogItem);
    });
});

function viewBlog(id) {
    window.location.href = `blog-details.html?id=${id}`;
}
