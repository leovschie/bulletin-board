const pool = require("../database/configuration.js");

module.exports = {
    addPost: (req, res) => {
        console.log(req.body);
        pool
            .connect()
            .then(client => {
                return client
                    .query("insert into messages(title, body) values ($1,$2)", [
                        req.body.newTitle,
                        req.body.newBody
                    ])
                    .then(results => {
                        console.log(
                            `successfully added new message to db: ${results.rowCount}`
                        );
                        res.redirect("/addPost");
                    })
                    .catch(err => {
                        console.error(`Couldn't add new message: ${err.stack}`);
                    });
            })
            .catch(error => {
                console.error(`Couldn't connect to database: ${err.stack}`);
            });
    },

    getMessages: (req, res) => {
        pool
            .connect()
            .then(client => {
                return client
                    .query(`select * from messages`)
                    .then(results => {
                        client.release();
                        res.render("board", {
                            returnMessages: results.rows
                        });
                    })
                    .catch(error => {
                        client.release();
                        console.error(
                            `Something went wrong when loading messages: ${error.stack}`
                        );
                    });
            })
            .catch(error => {
                console.error(
                    `Could not connect with the database to load messages: ${error.stack}`
                );
            });
    },
    renderIndex: (req, res) => {
        res.render("index");
    },

    redirectBoard: (req, res) => {
        res.redirect("/addPost");
    },
}