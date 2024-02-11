export const signup = async(email, password) => {
    let result = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-type": "application/json"
        }
    });
    let data = await result.json();
    return data;
}

export const signin = async(email, password) => {
    let result = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-type": "application/json"
        }
    });
    let data = await result.json();
    return data;
}