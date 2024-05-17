// Create web server
const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send('Comment added');
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});