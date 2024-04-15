const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

/* -------------- mongoose ------------- */
mongoose.connect('mongodb://127.0.0.1:27017/crud_usuarios')
mongoose.connection.on('error', console.log.bind(console, 'Error al conectar con MongoDB:'))
mongoose.connection.once('open', () => {
    console.log('Base de datos conectada correctamente')
})

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

/* -------------- express -------------- */
const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 3232;
app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send()
})

app.post('/registrar', async(req, res) => {
    try{
        const usuario = new Usuario(req.body)
        await usuario.save()
        res.send(usuario)
    } catch (error){
        console.log(error)
    }
})
app.post('/modificar', async(req, res) => {
    try{
        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ email: req.body.email });

        // Si el usuario no existe, enviar un mensaje de error
        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Actualizar los datos del usuario
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.apellido = req.body.apellido || usuario.apellido;
        usuario.telefono = req.body.telefono || usuario.telefono;

        // Guardar los cambios
        await usuario.save();

        // Enviar el usuario modificado
        res.send(usuario);
    } catch (error){
        console.log(error);
        res.status(500).send({ message: 'Error al modificar el usuario' });
    }
});
app.put('/id', async(req, res) => {
    try{
        // Buscar el usuario por id
        const usuario = await Usuario.findOne({ _id: req.body._id });

        // Si el usuario no existe, enviar un mensaje de error
        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Actualizar los datos del usuario
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.apellido = req.body.apellido || usuario.apellido;
        usuario.email = req.body.email || usuario.email;
        usuario.telefono = req.body.telefono || usuario.telefono;

        // Guardar los cambios
        await usuario.save();

        // Enviar el usuario modificado
        res.send(usuario);
    } catch (error){
        console.log(error);
        res.status(500).send({ message: 'Error al modificar el usuario' });
    }
});

app.delete('/eliminar', async (req, res) => {
    const { email } = req.body;
    try {
        const usuario = await Usuario.findOneAndDelete({ email: email });
        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/inicio', async(req, res) => {
    const usuarios = await Usuario.find()
    res.json(usuarios)
})