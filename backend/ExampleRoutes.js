import express from 'express';
import { getDb } from './ExampleConnect.js';
import { ObjectId } from 'mongodb';

let expressRouter = express.Router()

expressRouter.route("/").get(async (request, response) =>{
    try {
        let db = getDb()
        if (!db) {
            return response.status(500).json({ error: "Database connection not established" })
        }
        
        let data = await db.collection("pets").find({}).toArray()
        if (data.length > 0){
            response.json(data)
        }
        else {
            response.json([]) // Return empty array instead of throwing error
        }
    } catch (error) {
        console.error("Error fetching pets:", error)
        response.status(500).json({ error: "Failed to fetch pets data" })
    }
})

expressRouter.route("/:id").get(async (request, response) =>{
    try {
        let db = getDb()
        if (!db) {
            return response.status(500).json({ error: "Database connection not established" })
        }
        
        let data = await db.collection("pets").findOne({_id: new ObjectId(request.params.id)})
        if (data){
            response.json(data)
        }
        else {
            response.status(404).json({ error: "Pet not found" })
        }
    } catch (error) {
        console.error("Error fetching pet:", error)
        response.status(500).json({ error: "Failed to fetch pet data" })
    }
})

expressRouter.route("/").post(async (request, response) => {
    try {
        let db = getDb()
        if (!db) {
            return response.status(500).json({ error: "Database connection not established" })
        }
        
        let mongoObject = {
            name: request.body.name,
            breed: request.body.breed,
            age: request.body.age,
            url: request.body.url,
        }
        let data = await db.collection("pets").insertOne(mongoObject)
        response.json(data)
    } catch (error) {
        console.error("Error creating pet:", error)
        response.status(500).json({ error: "Failed to create pet" })
    }
})

expressRouter.route("/:id").put(async (request, response) => {
    try {
        let db = getDb()
        if (!db) {
            return response.status(500).json({ error: "Database connection not established" })
        }
        
        let mongoObject = {
            $set: {
                name: request.body.name,
                breed: request.body.breed,
                age: request.body.age,
                url: request.body.url,
            }
        }
        let data = await db.collection("pets").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
        response.json(data)
    } catch (error) {
        console.error("Error updating pet:", error)
        response.status(500).json({ error: "Failed to update pet" })
    }
})

expressRouter.route("/:id").delete(async (request, response) => {
    try {
        let db = getDb()
        if (!db) {
            return response.status(500).json({ error: "Database connection not established" })
        }
        
        let data = await db.collection("pets").deleteOne({_id: new ObjectId(request.params.id)})
        response.json(data)
    } catch (error) {
        console.error("Error deleting pet:", error)
        response.status(500).json({ error: "Failed to delete pet" })
    }
})

export default expressRouter;