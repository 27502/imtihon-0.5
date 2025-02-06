document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('full_name', document.getElementById('full_name').value);
    formData.append('phone_number', document.getElementById('phone_number').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('password2', document.getElementById('password2').value);
    formData.append('avatar', document.getElementById('avatar').files[0]);
    
    try {
        const response = await fetch('https://asadbek6035.pythonanywhere.com/account/register/', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Muvaffaqiyatli royxatdan otdingiz!');
            window.location.href = 'login.html'
        } else {
            const errorData = await response.json();
            alert('Xatolik: ' + JSON.stringify(errorData));
        }
    } catch (error) {
        alert('Server bilan boglanishda xatolik yuz berdi!');
    }
});
