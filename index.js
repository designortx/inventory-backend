const express = require("express");

const port = 3000;


const app = express()

app.get("/", (req, res)=> {
    res.send({"message": "Server home."});
});

// 

app.listen(port, ()=> {
    console.log("Successfully started and running server on port 3000");
});
