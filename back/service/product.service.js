const Product = require("../model/product.model");

exports.validateProducts = async (productList) => {
    for (const item of productList) {
        const existingProduct = await Product.findById(item.product);
        if (!existingProduct) {
            return false; 
        }
    }
    return true;
}