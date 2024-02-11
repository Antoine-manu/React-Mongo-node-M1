export async function purchase(products, token) {
    console.log(cart, token)
    let result = await fetch("http://localhost:3000/list", {
        method: "POST",
        body: JSON.stringify({ products }),
        headers: {
            Authorization: "bearer " + token
        }
    })

    let data = await result.json();
    return data;
}