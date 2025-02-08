document.addEventListener("DOMContentLoaded", function () {
    const blogForm = document.getElementById("blog-form");

    if (blogForm) {
        blogForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Form ma'lumotlarini olish
            const title = document.getElementById("blog-title")?.value.trim();
            const description = document.getElementById("blog-description")?.value.trim();
            const category = document.getElementById("blog-category")?.value;
            const imageInput = document.getElementById("blog-image");

            // Maydonlarni tekshirish
            if (!title || !description || !category || !imageInput?.files.length) {
                alert("Iltimos, barcha maydonlarni to‘ldiring!");
                return;
            }

            // Sana bo'yicha tekshiruv
            let date = document.getElementById("blog-date")?.value;
            if (!date) {
                const today = new Date();
                date = today.toISOString().split('T')[0];
            }

            // Form ma'lumotlarini FormData obyektiga o‘tkazish
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", parseInt(category, 10));
            formData.append("description", description);
            formData.append("date", date);
            formData.append("image", imageInput.files[0]);

            // Access tokenni tekshirish
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                alert("Foydalanuvchi tizimga kirmagan!");
                return;
            }

            try {
                // Ma'lumotlarni serverga yuborish
                const response = await fetch("https://asadbek6035.pythonanywhere.com/blog/create/", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Blog yaratishda xatolik yuz berdi.");
                }

                // Muvaffaqiyatli javob qaytganda
                alert("Blog muvaffaqiyatli yaratildi!");
                window.location.href = "blogs.html";
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        });
    }
});
