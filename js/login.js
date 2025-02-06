document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const loginData = {
        phone_number: document.getElementById('phone_number').value,
        password: document.getElementById('password').value
    };
    
    try {
        const response = await fetch('https://asadbek6035.pythonanywhere.com/account/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert('Muvaffaqiyatli tizimga kirdingiz!');
            window.location.href = 'blogs.html';
        } else {
            const errorData = await response.json();
            alert('Xatolik: ' + JSON.stringify(errorData));
        }
    } catch (error) {
        alert('Server bilan boglanishda xatolik yuz berdi!');
    }
});
