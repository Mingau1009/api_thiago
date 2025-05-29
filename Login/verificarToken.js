function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function verificarToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const payload = parseJwt(token);

    if (!payload || payload.exp < Math.floor(Date.now() / 1000)) {
        localStorage.removeItem('token');
        alert('Sessão expirada. Você será redirecionado para a tela de Login.');
        window.location.href = '../Login';
    }
}

// Executa a verificação ao carregar a página e a cada 5 segundos
window.onload = function () {
    verificarToken();
    setInterval(verificarToken, 5000);
};
