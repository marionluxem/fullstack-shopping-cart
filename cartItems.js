//import express
const express = require("express");
//add router for cart - splits routes into separate modules
const cart = express.Router();


const pg = require("pg");
const pool = new pg.Pool({
  user: "postgres",
  password: "MA08rD07on",
  host: "localhost",
  port: 5432,
  database: "ExpressShopDB",
  ssl: false
});

cart.get("/", (req, res) => {
    pool.query("SELECT * FROM shoppingcart;")
    .then ( (results) => {
        res.send(results.rows);
    })
    .catch ( (err) => {
        res.send(err);
    })
});

cart.post("/", (req, res) => {
    let data = req.body;
    pool.query("INSERT INTO shoppingcart (product, price, count) values($1::text, $2::float, $3::int)",[data.product, data.price, data.count])
    .then( () => {
        res.status(201);
        res.send(data.body);
    })
});

cart.put("/:id", (req, res) => {
    pool.query("UPDATE shoppingcart SET count=$1::int WHERE id=$2::int", [req.body.count, req.body.id])
    .then( () => {
        res.send("Cart Item Updated!");
        console.log(req.body.count);
        console.log(req.body.id);


    })
    .catch( (err) => {
        res.send(err);
    })
});

cart.delete("/:id", (req, res) => {
    pool.query("DELETE FROM shoppingcart WHERE id=$1::int", [req.params.id])
    .then( () => {
        res.status(201);
        res.send("Cart Item Deleted!");
    })
});

module.exports = cart;