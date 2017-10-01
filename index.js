const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));
app.set("port", PORT);

// app.get("/", (req, res) => {
//     res.send("Hello world!");
// });

app.listen(app.get("port"), () => {
    console.log(
        "Express started on http://localhost:" +
        app.get("port") +
        " press Ctrl-C to terminate"
    );
});
