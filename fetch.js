fetch('http://localhost:3000/api/login', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: "alice.johnson@example.com",
        password: "password123",
        name: "Alice Johnson",
        age: 30
    })
})
.then(res => res.json())
.then(data => console.log(data))