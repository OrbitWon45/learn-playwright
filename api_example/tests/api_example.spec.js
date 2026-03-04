import { test, expect } from "@playwright/test"
import users from "../test-data/usersResponse.json"
import { request } from "node:http"

test.describe ("API verification examples", () => {
    
    // 1. test to verify users endpoint is returning expected users
    
    test ('Verify mutiple records returned against stored static response', async ({ request }) => {
        // save raw response into a variable
        const response = await request.get('https://reqres.in/api/users?=1', {
            headers: {
                'x-api-key': process.env.API_KEY
            }
        })

        // parse the response body into a js object with access to the actual data within the response body
        const responseBody = await response.json()

        // see whats inside
        // console.log(responseBody)

        // verify status code
        expect(response.status()).toBe(200)
        expect(responseBody).toEqual(users)
    })

    // 2. Test response for a single user, line by line
    test ("Verify response for a single user, line by line ", async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/1', {
            headers: {
                'x-api-key': process.env.API_KEY
            }
        })
        const responseBody = await response.json()
        // console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.email).toBe('george.bluth@reqres.in')
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.avatar).toBe('https://reqres.in/img/faces/1-image.jpg')
    })

    // 3. test for Post request

    test ("Verify POST request", async ({ request }) => {

        const newUser = {
            name: "Sam",
            job: "QA Engineer"
        } 

        // Create request and save response

         const response = await request.post('https://reqres.in/api/users/', {
            headers: {
                'x-api-key': process.env.API_KEY  
            }, data: newUser            
        })
        const responseBody = await response.json()
        // console.log(responseBody)
        // Verify response
        expect(response.status()).toBe(201)
        expect(responseBody.name).toBe(newUser.name)        
        expect(responseBody.job).toBe(newUser.job)        
    })

    // 4. Verify PUT request

    test ("Verify PUT request", async ({ request }) => {

        const updatedUser = {
            name: "Mr. Bananna",
            job: "USA President" 
        }
        const response = await request.put('https://reqres.in/api/users/1', {
            headers: {
                'x-api-key': process.env.API_KEY  
            }, data: updatedUser        
        })
        const responseBody = await response.json()
        // console.log(responseBody)

        // Verify the response
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(updatedUser.name)
        expect(responseBody.job).toBe(updatedUser.job)
    })

    // 5. Verify DELETE request

    test ("Verify user is DELETED", async ({request }) => {        
        const response = await request.delete('https://reqres.in/api/users/1', {
            headers: {
                'x-api-key': process.env.API_KEY  
            }                                
        })
        expect(response.status()).toBe(204)
    })
})