import fs from 'fs';
import express from "express"
import cors from "cors";


const PORT = 5000;

const app = express()

app.use(cors())

app.listen(PORT, () => {console.log("Server is running on port " + PORT)})

//
const subjects = JSON.parse(fs.readFileSync("./backend/subjects.json", 'utf8'));
console.log(subjects)
//

//
const notesLists = JSON.parse(fs.readFileSync("./backend/notesLists.json", 'utf8'));
console.log(notesLists)
//

// app.post("/post", (req, res) => {
//     res.status(200).json({
//         subjects,
//         notesLists
//     })
// })

app.get("/get", (req, res) => {
    res.status(200).json({
        subjects,
        notesLists
    })
})

// app.put("/put", (req, res) => {
//     res.status(200).json({
//         subjects,
//         notesLists
//     })
// })
//
// app.delete("/delete", (req, res) => {
//     res.status(200).json({
//         subjects,
//         notesLists
//     })
// })


