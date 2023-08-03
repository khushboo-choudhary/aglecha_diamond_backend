const express = require("express");
const debounce = require("lodash/debounce");

const Todos = require("../models/ProductsModal");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const data = await Todos.create(req.body);
    return res.send(data);
  } catch (error) {
    return res.send(500).send({ message: error.message });
  }
});

// find all   http://localhost:2345/product

router.get("", async (req, res) => {
  try {
    const data = await Todos.find().lean().exec();
    console.log("gfgfdtrtdggfesaw5w56576", data);
    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
});

// find by id  http://localhost:2345/product/id/6280f7c90
router.get("/id/:id", async (req, res) => {
  try {
    const data = await Todos.findById(req.params.id).lean().exec();
    if (!data) {
      return res.status(404).send("Product not found.");
    }
    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
});
//http://localhost:2345/product/search
// Backend API endpoint for searching products

// Debounce function to delay API calls when typing
let previousSearchResults = [];
const debouncedSearch = debounce(async (query, res) => {
  try {
    if (query) {
      try {
        // If a search query is provided
        const regex = new RegExp(query, "i"); // Create a case-insensitive regex pattern from the search query
        const data = await Todos.find().lean().exec();
        const filterCtegory = data.filter(
          (e) => e.description.match(regex) || e.tag.match(regex)
        );
        // Clear previous search results before updating with new ones
        previousSearchResults = [];

        // Update the previous search results with the new filtered results
        previousSearchResults.push(...filterCtegory);
        return res.send(filterCtegory);
      } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      // If no search query is provided, return all products
      const data = await Todos.find().lean().exec();
      // Clear previous search results before updating with all products
      previousSearchResults = [];

      // Update the previous search results with all products
      previousSearchResults.push(...data);
      return res.send(data);
      // return res.status(404).send("Not found product");
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error." });
  }
}, 300); // 300ms delay for debouncing

router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (searchQuery) {
      debouncedSearch(searchQuery, res); // Call the debounced function for real-time searching
    } else {
      // If no search query is provided, return all products
      const data = await Todos.find().lean().exec();
      return res.send(data);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

// added filter of category discount rating sorting http://localhost:2345/product/earings?discount=60&rating=3.7
router.get("/:id", async (req, res) => {
  try {
    var mysort = { "price.sp": req.query.sorting || "" };
    const rating = req.query.rating || 0;
    const discount = req.query.discount || 0;

    const user = await Todos.find().sort(mysort).lean().exec();

    const filterCtegory = user.filter((e) => e.tag === req.params.id);

    const filterRating = filterCtegory.filter(
      (e) => e.customer_rating >= rating
    );

    const filterDiscount = filterRating.filter(
      (e) => e.price.discount >= discount
    );

    return res.send(filterDiscount);
  } catch (error) {
    ``;
    return res.send(error);
  }
});

module.exports = router;

// http://localhost:2345/product/earings  category sorting
// http://localhost:2345/product   all products

// http://localhost:2345/product/earings?rating=4  rating filter

// http://localhost:2345/product/earings?rating=4&discount=11  discount
// https://diamond-khushboo.herokuapp.com/
//https://diamond-server-backend.herokuapp.com/
