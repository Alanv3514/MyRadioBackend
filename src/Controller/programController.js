const Program = require('../Model/program.js');

exports.getAll = async (req, res) => {
    try {
        const programs = await Program.find();
        res.json(programs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }
        res.json(program);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const program = new Program(req.body);
        await program.save();
        res.status(201).json(program);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }
        res.json(program);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const program = await Program.findByIdAndDelete(req.params.id);
        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }
        res.json({ message: 'Program deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
