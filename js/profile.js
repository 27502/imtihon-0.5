document.getElementById('edit-profile-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('full_name', document.getElementById('full_name').value);
    formData.append('phone_number', document.getElementById('phone_number').value);
    formData.append('avatar', document.getElementById('avatar').files[0]);
    
    try {
        const response = await fetch('https://asadbek6035.pythonanywhere.com/account/edit-profile/', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Profil muvaffaqiyatli tahrirlandi!');
            window.location.href = 'blogs.html'; 
        } else {
            const errorData = await response.json();
            alert('Xatolik: ' + JSON.stringify(errorData));
        }
    } catch (error) {
        alert('Server bilan bog‘lanishda xatolik yuz berdi!');
    }
});
document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'blogs.html';
});

