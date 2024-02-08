const login = async (email, password) => {
    let result = await fetch("http://localhost:3000/auth/login", {
        headers: {
            Authorization : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9pbmVnZDYwNDIwQGdtYWlsLmNvbSIsImlkIjoiNjVjMzYyZWExNTNkZTI3ZGJhMGYxZjM0IiwiaWF0IjoxNzA3MzI1OTcyfQ.rXTMmhO8HC90gBk0xFOP8lFg1f-f3ZUlePgEiqE2KJ0"
        }
    })
}