document.addEventListener("DOMContentLoaded", function () {
    const blogForm = document.getElementById("blog-form");
    const blogList = document.getElementById("blog-list");

    if (blogForm) {
        blogForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("blog-title") ? document.getElementById("blog-title").value.trim() : '';
            const description = document.getElementById("blog-description") ? document.getElementById("blog-description").value.trim() : '';
            let date = document.getElementById("blog-date") ? document.getElementById("blog-date").value : '';
            const imageInput = document.getElementById("blog-image");

            if (!title || !description || !imageInput || !imageInput.files.length) {
                alert("Iltimos, barcha maydonlarni to‘ldiring!");
                return;
            }

            if (!date) {
                const today = new Date();
                date = today.toISOString().split('T')[0];
            }

            const reader = new FileReader();
            reader.readAsDataURL(imageInput.files[0]);
            reader.onload = function () {
                const imageBase64 = reader.result;

                const newBlog = {
                    id: Date.now(),
                    title,
                    description,
                    date,
                    image: imageBase64
                };

                const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
                blogs.push(newBlog);
                localStorage.setItem("blogs", JSON.stringify(blogs));

                alert("Blog muvaffaqiyatli qo‘shildi!");

                window.location.href = "blogs.html";
            };
        });
    }
});
