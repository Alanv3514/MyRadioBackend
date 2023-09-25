/**
 * Controller for managing programs.
 * @module programController
 */

const Program = require('../Model/program.js');

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: API for managing programs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Program:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - schedule
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the program
 *         description:
 *           type: string
 *           description: A brief description of the program
 *         schedule:
 *           type: string
 *           description: schedule of the program
 *         imageLink:
 *           type: String
 *           description: Image link of the program
 *         category:
 *           type: string
 *           description: category of the program
 *       example:
 *         name: A radio program name
 *         description: Music for all days
 *         schedule: 00:00 - 24:00
 *         category: variety
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Returns all programs
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       400:
 *         description: Error message
 */
exports.getAll = async (req, res) => {
    try {
        const programs = await Program.find();
        res.json(programs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     summary: Returns a program by ID
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the program to get
 *     responses:
 *       200:
 *         description: A program object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Error message
 *       404:
 *         description: Program not found
 */
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

/**
 * @swagger
 * /api/programs:
 *   post:
 *     summary: Creates a new program
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       201:
 *         description: A program object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Error message
 */
exports.create = async (req, res) => {
    try {
        const program = new Program(req.body);
        await program.save();
        res.status(201).json(program);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /api/programs/{id}:
 *   put:
 *     summary: Updates a program by ID
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the program to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       200:
 *         description: A program object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Error message
 *       404:
 *         description: Program not found
 */
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

/**
 * @swagger
 * /api/programs/{id}:
 *   delete:
 *     summary: Deletes a program by ID
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the program to delete
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Program deleted
 *       400:
 *         description: Error message
 *       404:
 *         description: Program not found
 */
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
