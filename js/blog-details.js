document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        alert("Blog topilmadi!");
        window.location.href = "blog_system.html";
        return;
    }

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = blogs.find(b => b.id == blogId);

    if (!blog) {
        alert("Blog topilmadi!");
        window.location.href = "blog_system.html";
        return;
    }

    document.getElementById("blog-title").textContent = blog.title;
    document.getElementById("blog-content").textContent = blog.description;
    document.getElementById("blog-date").textContent = `Sana: ${blog.date}`;
    document.getElementById("blog-image").src = blog.image;

    // **COMMENTLARNI YUKLASH FUNKSIYASI**
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem(`comments-${blogId}`)) || [];
        const commentsList = document.getElementById("comments-list");
        commentsList.innerHTML = ""; // Eski commentlarni tozalash

        comments.forEach(comment => {
            const li = document.createElement("li");
            li.textContent = comment;
            commentsList.appendChild(li);
        });
    }

    // **COMMENT QO‘SHISH FUNKSIYASI**
    document.getElementById("add-comment-btn").addEventListener("click", function () {
        const commentText = document.getElementById("comment-text").value.trim();
        if (commentText === "") {
            alert("Iltimos, izoh yozing!");
            return;
        }

        let comments = JSON.parse(localStorage.getItem(`comments-${blogId}`)) || [];
        comments.push(commentText);
        localStorage.setItem(`comments-${blogId}`, JSON.stringify(comments));

        document.getElementById("comment-text").value = ""; // Inputni tozalash
        loadComments(); // Yangi commentlarni chiqarish
    });

    loadComments(); // Sahifa yuklanganda commentlarni chiqarish
});
