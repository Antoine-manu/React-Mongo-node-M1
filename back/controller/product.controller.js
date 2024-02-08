const Product = require("../model/product.model");
const fs = require("fs");

exports.getAll = (req, res, next) => {
    Product
      .find(req.params.id)
      .then((products) => {
          res.status(200).json(products);
      })
}

exports.create = async(req, res, next) => {
    const product = JSON.parse(req.body.product);
    await Product.create({
        ...product,
        picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        userid: req.token.id
    });
    res.status(201).json({ message: "Produit créé" });
}

exports.getById = (req, res, next) => {
    Product
      .findById(req.params.id)
      .then((product) => {
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: "Produit non trouvé" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Erreur serveur", error: error });
      });
  };

  exports.delete = async(req, res) => {
    const dataProduct = await Product.findOne({ _id: req.params.id });
    if (dataProduct) {
        const dataUser = await User.findOne({ _id: dataProduct.userid });
        if (dataUser.email === req.token.email) {
            const image = dataProduct.picture.split("/");
            fs.unlinkSync('images/' + image);
            await Product.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Produit supprimé" });
        } else {
            res.status(403).json({ message: "Vous n'avez pas les droits pour modifier ce produit" });
        }
    } else {
        res.status(404).json({ message: "Produit non trouvé" });
    }
}

exports.update = async(req, res, next) => {
    const product = JSON.parse(req.body.product);
    const dataProduct = await Product.findOne({ _id: req.params.id });
    const dataUser = await User.findOne({ _id: dataProduct.userid });
    if (dataUser.email === req.token.email) {
        if (req.file) {
            const image = dataProduct.picture.split("/");
            fs.unlinkSync('images/' + image);
            dataProduct.picture = req.file.filename;
            dataProduct.save();
        }
        await Product.updateOne({ _id: dataProduct._id }, {
            ...product,
            user: dataProduct.user
        });
        res.status(201).json({ message: "Produit mis à jour" });
    } else {
        res.status(403).json({ message: "Vous n'avez pas les droits pour modifier ce produit" });
    }
}