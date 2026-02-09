const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// GET all workouts
router.get("/", getWorkouts);

// GET single workout by ID
router.get("/:id", getWorkout);

// CREATE a new workout
router.post("/", createWorkout);

// DELETE a workout by ID
router.delete("/:id", deleteWorkout);

// UPDATE a workout by ID
router.patch("/:id", updateWorkout);

module.exports = router;
