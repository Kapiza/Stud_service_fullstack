import fs from 'fs/promises';
import express from "express"
import cors from "cors";


const PORT = 5000;

const app = express()

app.use(cors({
    origin: "http://localhost:3000", // Разрешаем только этот источник
    methods: ["GET", "POST", "PUT", "DELETE"], // Разрешаем только нужные методы
    allowedHeaders: ["Content-Type"] // Разрешаем заголовки
}))
app.use(express.json())


app.listen(PORT, () => {console.log("Server is running on port " + PORT)})


app.post("/post", async (req, res) => {

        const data = req.body;
        const postObj = {
            id: data.id,
            title: data.title,
            subTitle: data.subTitle,
            notes: data.notes,
        };

        console.log("Запрос отправлен");

        // Читаем существующие данные
        const subjects = JSON.parse(await fs.readFile("./backend/subjects.json", 'utf8'));
        subjects.push(postObj);
        //
        // // Записываем новые данные
        await fs.writeFile("./backend/subjects.json", JSON.stringify(subjects, null, 2));

        res.status(200).json({ message: "Запись добавлена" });

});

app.get("/get", async (req, res) => {
    const subjects = JSON.parse(await fs.readFile("./backend/subjects.json", 'utf8'));

    res.status(200).json({
        subjects
    })
})

app.put("/update", async (req, res) => {
    const {SSI, note, add} = req.body;

    console.log("Запрос отправлен");

    // Читаем существующие данные
    const subjects = JSON.parse(await fs.readFile("./backend/subjects.json", 'utf8'));
    let updatedSubjects = [...subjects];
    if(add){
       updatedSubjects[SSI].notes.push(note);
    } else {
        updatedSubjects[SSI] = {
            ...updatedSubjects[SSI],
            notes: subjects[SSI].notes.filter(n => n.id !== note.id)
        }
    }

    // Записываем новые данные
    await fs.writeFile("./backend/subjects.json", JSON.stringify(updatedSubjects, null, 2));

    res.status(200).json({ message: "Запись добавлена" });
})

app.delete("/delete", async (req, res) => {
    console.log("ай")
    const {SSI, subject} = req.body;
    console.log(SSI + " " + subject);

    // Читаем существующие данные
    const subjects = JSON.parse(await fs.readFile("./backend/subjects.json", 'utf8'));
    subjects.splice(SSI, 1);
    //
    // // Записываем новые данные
    await fs.writeFile("./backend/subjects.json", JSON.stringify(subjects, null, 2));

    res.status(200).json({ message: "Запись добавлена" });
})



