var express = require("express");
var app = express();

const VERSION = '3.1';

app.disable('etag');

app.listen(8181, () => {
    console.log("Server running on port 8080");
});

app.get("/products", async (req, res, next) => {

    let products = [];
    for (let i = 0; i < 25; i++) {
        var productId = i;
        var productName = `Product ${productId}`;

        products.push({
            'id': productId,
            'name': productName
        })
    }

    if(req.query.sleep) {
        await sleep(req.query.sleep);
    }

    res.status(200);
    res.json(
        {
            'version': VERSION,
            'products': products
        });
});

app.get("/products/:productId", async (req, res, next) => {
    var productId = req.params.productId;
    var productName = `Product ${productId}`;

    res.status(200);
    res.send(
        {
            'version': VERSION,
            'product': {
                'id': productId,
                'name': productName
            }
        }
    );
});

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}