describe("API can handle", () => {
    test("GET /sites", async () => {
        try {
            const res = await fetch("http://localhost:3000/sites")

            if (res.ok) {
                expect(res.status).toBe(200)
            } else {
                expect(res.status).toBe(500)
            }
        } catch(error) {
            throw new Error(error)
        }
    })

    test("POST /sites", async () => {
        try {
            const res = await fetch("http://localhost:3000/sites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    header: "Test record",
                    url: "http://www.example.com"
                })
            })

            const body = await res.json()

            if (res.ok) {
                expect([201]).toContain(res.status)
            } else if (res.status === 400) {
                expect(body).toEqual({ message: "Cannot create a site record without necessary parameters." })
            } else {
                expect(res.status).toBe(500)
            }
        } catch(error) {
            throw new Error(error)
        }
    })

    test("PUT /sites/1", async () => {
        try {
            const res = await fetch("http://localhost:3000/sites/1", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    header: "Test record update",
                    url: "http://www.example.com"
                })
            })

            if (res.ok) {
                expect([200, 204]).toContain(res.status)

                if (res.status === 200) {
                    const body = await res.json()
                    expect(body).toEqual({ message: "No such record exists." })
                }
            } else if (res.status === 400) {
                expect(body).toEqual({ message: "Cannot update a site record without necessary parameters." })
            } else {
                expect(res.status).toBe(500)
            }
        } catch(error) {
            throw new Error(error)
        }
    })

    test("DELETE /sites/1", async () => {
        try {
            const getRes = await fetch("http://localhost:3000/sites")
            const getBody = await getRes.json()
            const deleteRes = await fetch("http://localhost:3000/sites/1", {
                method: "DELETE"
            })

            if (deleteRes.ok) {
                expect([200, 204]).toContain(deleteRes.status)

                if (deleteRes.status === 204) {
                    const doubleCheckRes = await fetch("http://localhost:3000/sites")
                    const doubleCheckBody = await doubleCheckRes.json()

                    if (doubleCheckBody) {
                        expect(doubleCheckBody.length).toBeLessThan(getBody.length)
                    }
                }
            } else {
                expect(res.status).toBe(500)
            }
        } catch(error) {
            throw new Error(error)
        }
    })
})
