const List = require("../model/list.model");
const productService = require("../service/product.service")

exports.create = async(req, res, next) => {
    try {
        const productList = req.body.products; 
        
        //Check si les produits existent
        const productsExist = await productService.validateProducts(productList);
        if (!productsExist) {
            return res.status(400).json({ message: "Certains produits n'existent pas" });
        }

        const newList = new List({ products: productList, userid: req.token.id });
        const savedList = await newList.save();

        res.status(201).json(savedList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la liste de produits" });
    }
}