export async function getAll(token) {
    let result = await fetch("http://localhost:3000/Product", {
        headers: {
            Authorization: "bearer " + token
        }
    })

    let data = await result.json();
    return data;
}