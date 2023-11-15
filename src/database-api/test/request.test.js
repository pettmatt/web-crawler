describe("API can handle", () => {
    test("GET /sites", async () => {
        try {
            const res = await fetch("http://localhost:3000/sites")

            if (res) {
                expect(res.status).toBe(200)
            }
        } catch(error) {
            console.log(error)
        }
    })

    test("POST /sites", async () => {
        try {
            const res = await fetch("http://localhost:3000/sites", {
                method: "POST",
                body: JSON.stringify({
                    header: "Test record",
                    url: "http://www.example.com"
                })
            })

            if (res) {
                expect(res.status).toBe(201)
            }
        } catch(error) {
            console.log(error)
        }
    })

    test("PUT /sites/1", async () => {
        try {
            const res = await fetch("http://localhost:3000/sites/1", {
                method: "PUT",
                body: JSON.stringify({
                    header: "Test record update",
                    url: "http://www.example.com"
                })
            })

            if (res) {
                expect(res.status).toBe(204 || 200)

                if (res.status === 200) {
                    const body = await res.json()
                    expect(body).toBe({ "message": "No such record exists." })
                }
            }
        } catch(error) {
            console.log(error)
        }
    })

    test("DELETE /sites/1", async () => {
        try {
            const getRes = await fetch("http://localhost:3000/sites")
            const getBody = await getRes.json()
            const deleteRes = await fetch("http://localhost:3000/sites", {
                method: "PUT",
                body: JSON.stringify({
                    header: "Test record update",
                    url: "http://www.example.com"
                })
            })

            if (res) {
                expect(deleteRes.status).toBe(204 || 200)

                if (res.status === 204) {
                    const doubleCheckRes = await fetch("http://localhost:3000/sites")
                    const doubleCheckBody = await doubleCheckRes.json()

                    if (doubleCheckBody) {
                        expect(doubleCheckBody.length).toBeLessThan(getBody.length)
                    }
                }
            }
        } catch(error) {
            console.log(error)
        }
    })
})
