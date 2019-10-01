const router = require("express").Router(),
  IdsController = require("../../controllers/IdsController");

router.route("/:count((\\d+){1,2})").get(IdsController.getIDs);
module.exports = router;
