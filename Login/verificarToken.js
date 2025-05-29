fetch('login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: 'exemplo@email.com', senha: '123' })
})
.then(res => res.json())
.then(data => {
    if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = 'Funcionario/index.php'; // redireciona após login
    } else {
        alert('Login falhou');
    }
});
