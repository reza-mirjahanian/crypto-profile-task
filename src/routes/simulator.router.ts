import express from "express";
import Simulator from "../repository/Simulator";
import validateGetParams from '../middlewares/simulator/profile-id.validator';
import validateCreateParams from '../middlewares/simulator/create.validator';
import _ from "lodash";

export const router = express.Router();

router.get("/api/simulators", async (req, res) => {
  const simulator = await Simulator.getAll();
  res.json({
    simulator
  });
});

router.get("/api/simulators/:profile_id", validateGetParams, async (req, res) => {
  const {
    profile_id
  } = req.params;
  const data = await Simulator.find({
    profile_id
  });
  res.json(data);
});

router.post("/api/simulators/:profile_id", validateCreateParams, async (req, res) => {
  const {
    profile_id
  } = req.params;

  const newItem = _.pick(req.body, ['name', 'start_date', 'check_date', 'cryptocurrency', 'divisa', 'Crypto_price_start', 'Crypto_price_check', 'dateRecorded', 'euros', 'price']);
  const simulator = await Simulator.create({
    profile_id,
    ...newItem
  });
  res.json(simulator);
});
