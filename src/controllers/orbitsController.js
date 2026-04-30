const orbitsService = require('../services/orbitsService');

const getAllOrbits = (req, res) => {
    const orbits = orbitsService.findAll(req.query);
    res.status(200).json(orbits);
};

const getOrbitById = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: 'Некорректный id'
        });
    }

    const orbit = orbitsService.findOne(id);

    if (!orbit) {
        return res.status(404).json({
            error: 'Запись не найдена'
        });
    }

    res.status(200).json(orbit);
};

const createOrbit = (req, res) => {
    const {
        src,
        title,
        text,
        type,
        details,
        speed
    } = req.body;

    if (!src || !title || !text || !type || !details || !speed) {
        return res.status(400).json({
            error: 'Не все обязательные поля заполнены'
        });
    }

    const newOrbit = orbitsService.create({
        src,
        title,
        text,
        type,
        details,
        speed
    });

    res.status(201).json(newOrbit);
};

const updateOrbit = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: 'Некорректный id'
        });
    }

    const updatedOrbit = orbitsService.update(id, req.body);

    if (!updatedOrbit) {
        return res.status(404).json({
            error: 'Запись не найдена'
        });
    }

    res.status(200).json(updatedOrbit);
};

const deleteOrbit = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: 'Некорректный id'
        });
    }

    const success = orbitsService.remove(id);

    if (!success) {
        return res.status(404).json({
            error: 'Запись не найдена'
        });
    }

    res.status(204).send();
};

module.exports = {
    getAllOrbits,
    getOrbitById,
    createOrbit,
    updateOrbit,
    deleteOrbit
};