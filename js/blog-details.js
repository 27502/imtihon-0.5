document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        alert("Blog topilmadi!");
        window.location.href = "blogs.html";
        return;
    }

    // Blog ma'lumotlarini localStorage dan olish
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = blogs.find(b => b.id == blogId);

    if (!blog) {
        alert("Blog topilmadi!");
        window.location.href = "blogs.html";
        return;
    }

    // Blogni sahifaga joylash
    document.getElementById("blog-title").textContent = blog.title;
    document.getElementById("blog-content").textContent = blog.description;
    document.getElementById("blog-date").textContent = `Sana: ${blog.date}`;
    document.getElementById("blog-image").src = blog.image;

    // Izohlar bo'limi
    const commentsContainer = document.getElementById("comments-list");
    const commentInput = document.getElementById("comment-text");
    const commentButton = document.getElementById("add-comment-btn");

    const token = localStorage.getItem("access_token");

    // Izohlarni yuklash
    async function loadComments() {
        try {
            const response = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${blogId}`);
            const comments = await response.json();
            commentsContainer.innerHTML = "";

            if (!comments || comments.length === 0) {
                commentsContainer.innerHTML = `<p>Hozircha izohlar yo'q.</p>`;
                return;
            }

            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.className = "comment";
                commentElement.innerHTML = `
                    <strong>${comment.author || "Anonim"}</strong> - ${new Date(comment.created_at).toLocaleString("uz-UZ")}
                    <p>${comment.description}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });
        } catch (error) {
            console.error("Izohlarni yuklashda xatolik:", error);
            alert("Izohlarni yuklashda xatolik yuz berdi");
        }
    }

    // Izoh qo'shish funksiyasi
    async function postComment() {
        const commentText = commentInput.value.trim();
        if (!commentText) {
            alert("Iltimos, izoh matnini kiriting");
            return;
        }

        if (!token) {
            alert("Izoh qoldirish uchun tizimga kiring!");
            return;
        }

        commentButton.disabled = true;
        commentButton.textContent = "Yuborilmoqda...";

        try {
            const response = await fetch("https://asadbek6035.pythonanywhere.com/blog/comment/post/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    blog: blogId,
                    description: commentText
                })
            });

            if (!response.ok) {
                throw new Error("Izoh yuborishda xatolik yuz berdi");
            }

            commentInput.value = "";
            await loadComments();
        } catch (error) {
            console.error("Izoh yuborishda xatolik:", error);
            alert("Izoh yuborishda xatolik yuz berdi");
        } finally {
            commentButton.disabled = false;
            commentButton.textContent = "Izoh qo‘shish";
        }
    }

    commentButton.addEventListener("click", postComment);

    await loadComments();
});
