const express = require("express");
const Workout = require("../models/workoutModel");

const router = express.Router();

/*
 *Route: /api/workouts/
 *Method: GET
 *Desc: Get all workouts
 *Access: Public
 *parameters: none
 */

// GET all workouts

router.get("/", (req, res) => {
  res.json({ msg: "Get all workouts" });
});

/*
 *Route: /api/workouts/id
 *Method: GET
 *Desc: Get a single workout by id
 *Access: Public
 *parameters: id
 */

// for singe workout by its id
router.get("/:id", (req, res) => {
  res.json({ msg: `Get a single workout with id` });
});

/*
 *Route: /api/workouts/
 *Method: post
 *Desc: Get all workouts
 *Access: Public
 *parameters: none
 */
// GET all workouts

router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/*
 *Route: /api/workouts/:id
 *Method: POST
 *Desc: post a workout by id
 *Access: Public
 *parameters: id
 */
router.post("/:id", (req, res) => {
  res.json({ msg: `POST a single workout with id` });
});

/**
 * Route: /api/workouts
 * Method: DELETE
 * Desc: Delete all workout
 * access: Public
 * parameters: none
 */
router.delete("/", (req, res) => {
  res.json({ msg: "DELETE all workouts" });
});

/*
 * Route: /api/workouts/:id
 * Method: DELETE
 * Desc: Delete a workout by id
 * access: Public
 * parameters: id
 */
router.delete("/:id", (req, res) => {
  res.json({ msg: `DELETE a single workout with id ` });
});

/*
 *Route: /api/workouts/:id
 *Method: Patch
 *Desc: Update a workout by id
 *Access: Public
 *parameters: id
 */
router.patch("/:id", (req, res) => {
  res.json({ msg: `PATCH a single workout with id` });
});

module.exports = router;
