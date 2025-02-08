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

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Xatolik yuz berdi');
        }

        localStorage.setItem('access_token', data.data.token.access);
        localStorage.setItem('refresh_token', data.data.token.refresh);
        localStorage.setItem('user_data', JSON.stringify({
            phone_number: data.data.phone_number,
            full_name: data.data.full_name,
            email: data.data.email
        }));

        alert('Muvaffaqiyatli tizimga kirdingiz!');
        window.location.href = 'blogs.html';
    } catch (error) {
        console.log(error);
        alert(error.message || 'Server bilan bog‘lanishda xatolik yuz berdi');
    }
});
