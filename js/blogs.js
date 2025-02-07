document.addEventListener('DOMContentLoaded', async function() {
    // Tokenni tekshirish
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Iltimos, avval tizimga kiring!');
        window.location.href = 'login.html';
        return;
    }

    // Bloglarni yuklash
    try {
        const response = await fetch('https://asadbek6035.pythonanywhere.com/blog/list/');
        if (response.ok) {
            const blogs = await response.json();
            localStorage.setItem('blogs', JSON.stringify(blogs));

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
        } else {
            alert('Bloglarni yuklashda xatolik yuz berdi!');
        }
    } catch (error) {
        alert('Server bilan bog‘lanishda xatolik yuz berdi!');
    }

    
    const addBlogBtn = document.getElementById("add-blog-btn");
    if (addBlogBtn) {
        addBlogBtn.addEventListener("click", function () {
            window.location.href = "/pages/blog_system.html"; // To‘g‘ri yo‘lni tekshiring!
        });
    }
});
function viewBlog(id) {
    if (!id || id === 'null' || id === 'undefined') {
        alert("Blog ID noto‘g‘ri!");
        return;
    }
    window.location.href = `blog-details.html?id=${id}`;
}


function viewBlog(id) {
    window.location.href = `blog-details.html?id=${id}`;
}
document.getElementById('edit-profile-btn').addEventListener('click', function() {
    window.location.href = 'profile.html'; 
});


