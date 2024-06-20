import express from "express";
import csvController from "./csv.controller";
import fileUploadUtils from "../../utils/fileUploadUtils";

const router = express.Router();

// ,
router.post("/upload", fileUploadUtils.singleFile("file"), csvController.uploadCSV);

router.post("/download", csvController.downloadCSV);

export default router;
