import * as releaseService from "../services/releaseService.js";

export const getAllReleases = async (req, res) => {
  try {
    const releases = await releaseService.getAllReleases();
    res.json(releases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRelease = async (req, res) => {
  try {
    const { name, date, additionalInfo } = req.body;
    if (!name || !date) {
      return res.status(400).json({ error: "Name and date are required" });
    }
    const release = await releaseService.createRelease({ name, date, additionalInfo });
    res.status(201).json(release);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReleaseInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { additionalInfo } = req.body;
    const release = await releaseService.updateReleaseInfo(id, additionalInfo);
    res.json(release);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReleaseSteps = async (req, res) => {
  try {
    const { id } = req.params;
    const { steps } = req.body;
    if (!Array.isArray(steps)) {
      return res.status(400).json({ error: "Steps must be an array" });
    }
    const release = await releaseService.updateReleaseSteps(id, steps);
    res.json(release);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
