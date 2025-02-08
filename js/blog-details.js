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

    // Blog ma'lumotlarini sahifaga joylash
    document.getElementById("blog-title").textContent = blog.title;
    document.getElementById("blog-content").textContent = blog.description;
    document.getElementById("blog-date").textContent = `Sana: ${blog.date}`;
    document.getElementById("blog-image").src = blog.image;

    const commentsContainer = document.getElementById("comments-list");
    const commentInput = document.getElementById("comment-text");
    const commentButton = document.getElementById("add-comment-btn");

    const token = localStorage.getItem("access_token"); // Foydalanuvchi avtorizatsiyadan o'tganligini tekshirish

    // API orqali izohlarni yuklash
    async function loadComments() {
        try {
            const response = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${blogId}`);
            const comments = await response.json();
            commentsContainer.innerHTML = "";

            if (comments.length === 0) {
                commentsContainer.innerHTML = `
                    <div class="no-comments">
                        <i class="fas fa-comments"></i>
                        <p>Hozircha izohlar yo'q. Birinchi bo'lib izoh qoldiring!</p>
                    </div>
                `;
                return;
            }

            comments.forEach(comment => {
                commentsContainer.innerHTML += `
                    <div class="comment">
                        <div class="comment-header">
                            <div class="comment-author">
                                <i class="fas fa-user-circle"></i>
                                <span>${comment.author || "Anonim"}</span>
                            </div>
                            <div class="comment-date">
                                <i class="fas fa-clock"></i>
                                <span>${new Date(comment.created_at).toLocaleDateString("uz-UZ", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}</span>
                            </div>
                        </div>
                        <div class="comment-content">
                            ${comment.description}
                        </div>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Izohlarni yuklashda xatolik:", error);
            alert("Izohlarni yuklashda xatolik yuz berdi");
        }
    }

    // Izoh yuborish
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
        commentButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';

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

            // Izoh muvaffaqiyatli qo‘shilgani haqida bildirish
            const successMessage = document.createElement("div");
            successMessage.className = "alert alert-success";
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Izohingiz muvaffaqiyatli qo‘shildi!';
            document.getElementById("comments-section").insertBefore(successMessage, commentsContainer);

            setTimeout(() => {
                successMessage.remove();
            }, 3000);

            await loadComments(); // Yangi izohni ko‘rsatish uchun izohlarni qayta yuklash
        } catch (error) {
            console.error("Izoh yuborishda xatolik:", error);
            alert("Izoh yuborishda xatolik yuz berdi");
        } finally {
            commentButton.disabled = false;
            commentButton.innerHTML = "Izoh qo‘shish";
        }
    }

    commentButton.addEventListener("click", postComment);

    await loadComments(); 
});
