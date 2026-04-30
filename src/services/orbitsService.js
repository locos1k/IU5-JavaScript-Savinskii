const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (query) => {
    const orbits = fileService.readData(dataFilePath);

    const { title, type, text } = query;

    return orbits.filter((orbit) => {
        const titleMatches = title
            ? orbit.title.toLowerCase().includes(title.toLowerCase())
            : true;

        const typeMatches = type
            ? orbit.type.toLowerCase().includes(type.toLowerCase())
            : true;

        const textMatches = text
            ? orbit.text.toLowerCase().includes(text.toLowerCase())
            : true;

        return titleMatches && typeMatches && textMatches;
    });
};

const findOne = (id) => {
    const orbits = fileService.readData(dataFilePath);
    return orbits.find((orbit) => orbit.id === id);
};

const create = (orbitData) => {
    const orbits = fileService.readData(dataFilePath);

    const newId = orbits.length > 0
        ? Math.max(...orbits.map((orbit) => orbit.id)) + 1
        : 1;

    const newOrbit = {
        id: newId,
        ...orbitData
    };

    orbits.push(newOrbit);
    fileService.writeData(dataFilePath, orbits);

    return newOrbit;
};

const update = (id, orbitData) => {
    const orbits = fileService.readData(dataFilePath);

    const index = orbits.findIndex((orbit) => orbit.id === id);

    if (index === -1) {
        return null;
    }

    orbits[index] = {
        ...orbits[index],
        ...orbitData
    };

    fileService.writeData(dataFilePath, orbits);

    return orbits[index];
};

const remove = (id) => {
    const orbits = fileService.readData(dataFilePath);

    const filteredOrbits = orbits.filter((orbit) => orbit.id !== id);

    if (filteredOrbits.length === orbits.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredOrbits);

    return true;
};

module.exports = {
    init,
    findAll,
    findOne,
    create,
    update,
    remove
};