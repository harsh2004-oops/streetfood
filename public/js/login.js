document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    });

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const result = await response.json();

        if (result.success) {
            alert(`Welcome ${username}! Logged in as ${role}.`);
            window.location.href = '/authmode'; // manually go to the HTML page
        } else {
            alert(result.error || 'Login failed.');
        }
    } else {
        // Unexpected: got HTML when expecting JSON
        const text = await response.text();
        console.warn('Expected JSON but got:', text);
        document.body.innerHTML = text; // optionally render it
    }
});
