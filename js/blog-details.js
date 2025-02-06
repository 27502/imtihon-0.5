document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    
   
    const blogs = JSON.parse(localStorage.getItem('blogs'));  
    const token = localStorage.getItem('token');
    
    if (!blogId) {
        alert('Blog topilmadi!');
        window.location.href = 'blogs.html';
        return;
    }
    
    if (!token) {
        alert('Iltimos, tizimga kiring!');
        window.location.href = 'login.html';
        return;
    }
    
 
    const blog = blogs.find(b => b.id == blogId);
    
    if (blog) {
        document.getElementById('blog-title').textContent = blog.title;
        document.getElementById('blog-content').textContent = blog.description;
    } else {
        alert('Blog topilmadi!');
        window.location.href = 'blogs.html';
    }
});
