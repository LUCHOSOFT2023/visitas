const {response} = require('express')


//Importación de los modelos
const Visita = require('../models/visitas')

//Método GET de la API
const visitaGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {documento_paciente} = req.body;
    //Consultar todos los usuarios
    try {
        let visita;

        if (documento_paciente) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            visita = await Visita.find({ documento_paciente:documento_paciente });
        } else {
            visita = await Visita.find();
        }

        res.json({ visita });
    } catch (error) {
        console.error('Error al buscar las visitas:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const visitaPost = async(req, res) => {
    let mensaje = "Inserción exitosa"
    const body = req.body
    try {
        const visita= new Visita(body)
        await visita.save() //Inserta en la colección
    }catch (error) {
        mensaje = "Se presentaron problemas en la inserción"
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const visitaPut = async(req, res) => {

    const {documento_paciente, nombre_paciente, fecha_visita, hora_visita, nombre_medico,  diagnostico} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Visita.updateMany({documento_paciente:documento_paciente}, {$set: {
            nombre_paciente: nombre_paciente,
            fecha_visita: fecha_visita,
            hora_visita:  hora_visita,
            nombre_medico: nombre_medico,
            diagnostico: diagnostico
        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}

const visitaDelete = async (req, res) => {
    const {documento_paciente} = req.body
    let mensaje = ''

    try{
        const visita = await Robo.deleteOne({documento_paciente:documento_paciente})
        mensaje = 'La eliminación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    visitaGet,
    visitaPost,
    visitaPut,
    visitaDelete
}