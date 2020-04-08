const app = require("./server/server");
const port = process.env.port || 3000;

app.get("/", (req, res) => {

    const { productWine  } = app.functions.functions;

    res.render("index", {productWine});

});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}.`);
});