import { Router } from "express";
import { isMutant } from "../controllers/mutant";

const router: Router = Router();

router.post('/', isMutant)

export default router;