const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/HomeController.js");
const createItemController = require("../app/controllers/CreateItemController.js");

router.get("/", homeController.index);
router.get("/admin", homeController.adminDashboard);
router.delete("/admin/:id", homeController.bannerUser);
router.get("/admin/myprofile", homeController.myProfileAdmin);
router.post("/admin/myprofile", homeController.backHome);
router.get("/admin/search", homeController.search);
router.post("/admin/search/result", homeController.resultOfSearchById);
router.get("/history", homeController.transactioHistory);
router.delete("/history/:id", homeController.deleteTransactionHistory);
router.get("/showDetail", homeController.showDetail);
router.get("/myprofile", homeController.myProfile);
router.post("/myprofile", homeController.backHome);
router.get("/:id/edit", homeController.edit);
router.put("/:id", homeController.update);
router.delete("/:id", homeController.deleteShowDetail);
router.get("/logout",homeController.logout);
router.post("/createItem/store", createItemController.store);
router.get("/thongbao",homeController.showNotice);
router.delete("/thongbao/:id", homeController.deleteHistory);
module.exports = router;
