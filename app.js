const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const pool = require("./database/configuration");
const routesController = require("./server/routesController");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.set("view engine", "ejs");

app.get("/", routesController.renderIndex);

app.get("/board", routesController.redirectBoard);

app.post("/addPost", routesController.addPost);

app.get("/addPost", routesController.getMessages);

//listen
app.listen(port, () => console.log(`I've got ears on port: ${port}`));