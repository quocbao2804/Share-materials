const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const { mongooseToObject } = require("../../ulti/mongoose");
const product = require("../Model/Product");
const user = require("../Model/Users");
const history =require("../Model/History");

class BuyItemController {
  index(req, res, next) {
    // if(req.session.user){
      const pageOptions = {
        page: parseInt(req.query.page), //bien(se query db va nhan chi so tai page hien tai,no thay doi theo page 1,2,3,4,5... tuy so du lieu query len
        limit: 6, //bien (so luong bai viet tren 1 page)
      };
      product
        .find()
        .skip(pageOptions.page * pageOptions.limit) //bo qua kết quả của phép tính trong ngoặc bài viết trong db;vd:12->lấy từ bài viết 13 limit 5 bài qua trang
        .limit(pageOptions.limit)
        .exec(function (err, products) {
          if (err) {
            res.status(500).json(err);
            return;
          }
          // res.status(200).json(News);
          res.render("buyItem", { Product: mutipleMongooseToObject(products) });
        }); 
    //  }
    //  else{
    //   res.redirect("/login");
    //  }
  }
     showDetailProduct(req,res,next){
      product.findOne({slug: req.params.slug}).exec(function (err, products) {  
        res.render("productDetail", { Product: mongooseToObject(products) });
      })
      // .then((product) =>res.render("productDetail", { Product: mongooseToObject(product) }))
      // .catch(next);
  // }
     }

    showDetailPersonBuyItem(req, res, next) {
      product.findOne({slug: req.params.slug}).exec(function (err, products) {  
        user.findById({_id: products.idUserCreated}).exec(function(err,users){
               res.render("informationOfPersonBuyItem", { User: mongooseToObject(users),Product: mongooseToObject(products) });
        })
    
      })
  }

  backHome(req,res){
   res.send("cc")
  }
  formOrder(req,res){
    // res.send()
    user.findOne({_id:req.session.user._id}).exec(function (err, users) { 
      product.findOne({slug: req.params.slug}).exec(function (err, products) {
          const newHistory = history.create({
            idUserBuyItem: req.session.user._id,
            name: products.name,
            idUserCreated: products.idUserCreated,
            idItem: products._id, 
          })
          products.deleteOne();
          res.redirect("/home")
        })
      })
     
   
  }

}

module.exports = new BuyItemController();