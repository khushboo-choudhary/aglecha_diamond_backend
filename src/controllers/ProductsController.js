const express = require("express");
const { debounce } = require("lodash");
const Todos = require("../models/ProductsModal");
const e = require("express");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    console.log(req.body);
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
    // console.log("description", data);
    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
});
//http://localhost:2345/product/search
// Backend API endpoint for searching products

// Debounce function to delay API calls when typing
const debouncedSearch = debounce(async (query, res) => {
  try {
    console.log("hhuihiuhiu", query);

    if (query) {
      try {
        // If a search query is provided
        const regex = new RegExp(query, "i"); // Create a case-insensitive regex pattern from the search query
        console.log("h=====================", regex);
        const data = await Todos.find().lean().exec();
        const filterCtegory = data.filter(
          (e) =>
            // console.log("djwkjw", e.description, "ndndnwjdnwjdw", searchQuery)
            e.description === query ? e.description === query : e.tag === query,
          e.tag === query
        );
        console.log("cheking resgwxsjkj", filterCtegory);
        return res.send(filterCtegory);
      } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
      }
    } else {
      return res.status(404).send("Not found product");
    }
    // } else {
    //   // If no search query is provided, return all products
    //   // data = await Todos.find().lean().exec();
    //   return res.status(404).send("Not found product");
    // }
    // console.log("data", data);
    // return res.send(data);

    // if (query) {
    //   //       // If a search query is provided
    //   const regex = new RegExp(query, "i"); // Create a case-insensitive regex pattern from the search query
    //   console.log("h=====================", regex);
    //   const data = await Todos.find().lean().exec();
    //   console.log("data", data);
    //   const filterCtegory = data.filter(
    //     (e) => console.log("djwkjw", e.description, "ndndnwjdnwjdw", regex),
    //     e.description === regex
    //   );
    //   console.log("cheking resgwxsjkj", filterCtegory);
    // } else {
    //   // If no search query is provided, return all products
    //   // data = await Todos.find().lean().exec();
    //   return res.status(404).send("Not found product");
    // }
    // // console.log("data", data);
    // return res.send(filterCtegory);
    // const filterCtegory = datas.filter(
    //   (e) =>
    //     // console.log("djwkjw", e.description, "ndndnwjdnwjdw", searchQuery)
    //     e.description === regex,
    //   e.tag === regex
    // );
    // console.log("cheking resgwxsjkj", filterCtegory);
    // return res.send(data);
    // return res.send(data);
  } catch (error) {
    return res.status(500).send({ error: "Internal server error." });
  }
}, 300); // 300ms delay for debouncing

router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (searchQuery) {
      debouncedSearch(searchQuery, res);
      // console.log("debounce", searchQuery, res); // Call the debounced function for real-time searching
    } else {
      // If no search query is provided, return all products
      const data = await Todos.find().lean().exec();
      return res.send(data);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

// router.get("/search", async (req, res) => {
//   try {
//     console.log("searching query", req.query);
//     const searchQuery = req.query.q; // Get the search query from the request query parameters

//     if (searchQuery) {
//       // If a search query is provided
//       const regex = new RegExp(searchQuery, "i"); // Create a case-insensitive regex pattern from the search query
//       console.log("h=====================", regex);
//       const data = await Todos.find().lean().exec();
//       const filterCtegory = data.filter(
//         (e) =>
//           // console.log("djwkjw", e.description, "ndndnwjdnwjdw", searchQuery)
//           e.description === searchQuery
//       );
//       console.log("cheking resgwxsjkj", filterCtegory);
//     } else {
//       // If no search query is provided, return all products
//       // data = await Todos.find().lean().exec();
//       return res.status(404).send("Not found product");
//     }
//     console.log("data", data);
//     return res.send(data);
//   } catch (error) {
//     return res.status(500).send({ error: "Internal server error." });
//   }
// });

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
