import { Router } from "express";
import {
  getFavorite,
  getFavorites,
  getFile,
  getFilms,
  postFavorites,
} from "../controllers/controller";

const router = Router();

router.get("/films", getFilms);

router.post("/favorites", postFavorites);

router.get("/favorites", getFavorites);

router.get("/favorite/:id", getFavorite);

router.get("/favorite/:id/file", getFile);

export default router;
