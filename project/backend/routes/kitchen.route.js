import express from "express";
import { cache } from "../middleware/cache.middle.js";
import Kitchen from "../models/kitchen.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const kitchenRoute = express.Router();

// Get all kitchens (public, cached for 2 minutes)
kitchenRoute.get(
  "/",
  cache(120),
  asyncHandler(async (req, res) => {
    const { city, cuisine, search, page = 1, limit = 10 } = req.query;

    const filter = { isOpen: true };

    if (city) filter["address.city"] = { $regex: city, $options: "i" };
    if (cuisine) filter.cuisine = { $in: [cuisine] };
    if (search) filter.name = { $regex: search, $options: "i" };

    const kitchens = await Kitchen.find(filter)
      .select("-owner")
      .sort({ rating: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Kitchen.countDocuments(filter);

    res.status(200).json({
      kitchens,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  }),
);

// Get single kitchen by ID (public, cached for 2 minutes)
kitchenRoute.get(
  "/:kitchenId",
  cache(120),
  asyncHandler(async (req, res) => {
    const kitchen = await Kitchen.findById(req.params.kitchenId).select(
      "-owner",
    );

    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found" });
    }

    res.status(200).json({ kitchen });
  }),
);

export default kitchenRoute;