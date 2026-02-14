const Setting = require('../models/Setting');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public (some might need to be private, but for scripts we need them public or fetched by server and injected)
// Actually, for security, maybe only expose specific keys publicly.
// For now, let's keep it simple: Public can read, Admin can write.
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find({});
    // Convert array to object for easier frontend usage
    const settingsObj = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {});
    
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update or Create setting
// @route   PUT /api/settings
// @access  Private/Admin
const updateSetting = async (req, res) => {
  const { key, value, description } = req.body;

  try {
    let setting = await Setting.findOne({ key });

    if (setting) {
      setting.value = value;
      if (description) setting.description = description;
      await setting.save();
    } else {
      setting = await Setting.create({ key, value, description });
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSetting
};
