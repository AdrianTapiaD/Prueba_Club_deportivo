const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');
app.use(express.static('public'));
app.use(express.json());

app.get('/agregar', async (req, res) => {
    const {nombre, precio} = req.query;
    const nuevoDeporte = {nombre, precio};
    try {
        let jsonData = {Deportes: []};
        if (fs.existsSync('deportes.json')) {
            const fileData = fs.readFileSync('deportes.json');
            jsonData = JSON.parse(fileData);
        }
        jsonData.Deportes.push(nuevoDeporte);
        fs.writeFileSync('deportes.json', JSON.stringify(jsonData));
        
        res.send('Se ha agregado el deporte.');
} catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ocurrió un error al agregar el deporte.');
}
});


app.get('/editar', async (req, res) => {
    const {nombre, precio, nuevoNombre, nuevoPrecio} = req.query;
    try {
        let jsonData = {Deportes: []};
        if (fs.existsSync('deportes.json')) {
            const fileData = fs.readFileSync('deportes.json');
            jsonData = JSON.parse(fileData);
        }
        const index = jsonData.Deportes.findIndex(d => d.nombre === nombre && d.precio === precio);
        if (index !== -1) {
            jsonData.Deportes[index].nombre = nuevoNombre;
            jsonData.Deportes[index].precio = nuevoPrecio;
            fs.writeFileSync('deportes.json', JSON.stringify(jsonData));
            res.send('Se ha editado el deporte.');
        } else {
            res.status(404).send('No se encuentra el deporte.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ha ocurrido un error al editar.');
    }
});

app.get('/eliminar', async (req, res) => {
    const {nombre, precio} = req.query;
    try {
        let jsonData = {Deportes: []};
        if (fs.existsSync('deportes.json')) {
            const fileData = fs.readFileSync('deportes.json');
            jsonData = JSON.parse(fileData);
}
        const index = jsonData.Deportes.findIndex(d => d.nombre === nombre && d.precio === precio);
        if (index !== -1) {
            jsonData.Deportes.splice(index, 1);
            fs.writeFileSync('deportes.json', JSON.stringify(jsonData));
            res.send('Se ha eliminado el deporte.');
} else {
            res.status(404).send('No se encuentra este deporte.');
}
} catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ha ocurrido un error al eleiminar el deporte.');
}
});

app.get('/deportes', (req, res) => {
    try {
        let jsonData = {Deportes: []};
        if (fs.existsSync('deportes.json')) {
            const fileData = fs.readFileSync('deportes.json');
            jsonData = JSON.parse(fileData);
        }
        res.json(jsonData.Deportes);
} catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ha ocurrido un error al recibir los datos.');
}
});

app.listen(3000, () => {
    console.log('Servidor inicializado en el puerto 3000');
});