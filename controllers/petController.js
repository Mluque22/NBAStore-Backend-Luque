import Pet from "../models/Pet.js";

export const getPets = async (_req, res, next) => {
  try {
    const pets = await Pet.find().lean();
    res.json(pets);
  } catch (e) { next(e); }
};

export const getPetById = async (req, res, next) => {
  try {
    const p = await Pet.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ error: "Mascota no encontrada" });
    res.json(p);
  } catch (e) { next(e); }
};
