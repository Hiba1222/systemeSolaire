const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

const firebaseConfig = {
    apiKey: "AIzaSyCkoK4tviy_vHuuiUrCpwpB-YooSWUpHys",
    authDomain: "hibaso-cd54f.firebaseapp.com",
    projectId: "hibaso-cd54f",
    storageBucket: "hibaso-cd54f.firebasestorage.app",
    messagingSenderId: "188497689734",
    appId: "1:188497689734:web:f5a0fef8860666f725e507",
    measurementId: "G-3P2RRVDV62"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const solarCollection = collection(db, "planets");

app.get("/", async (req, res) => {
    try {
        const snapshot = await getDocs(solarCollection);

        if (snapshot.empty) {
            return res.status(404).json({ message: "No solar documents found." });
        }

        const solarData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(solarData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
