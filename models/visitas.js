const {Schema, model} = require('mongoose')

const VisitaSchema = Schema({

    documento_paciente:{
        type: Number,
        unique: true,
        required: [true, 'El documento del paciente es necesario']
     },
 
     nombre_paciente:{
         type : String,
         required: [true, 'El nombre del paciente es necesario']
     },
 
     fecha_visita:{
         type:String,
         required: [true, 'La fecha de visita es necesaria']
     },
 
     hora_visita:{
         type: String,
         required: [true, 'La hora de la visita es necesaria']
     },
 
 
     nombre_medico:{
         type: String,
         required: [true, 'El nombre del médico es necesario']
      },
 
      diagnostico:{
         type: String,
         required: [true, 'El diagnóstico médico es necesario']
      }
 
 
 })

//Exportar la función UsuarioSchema
module.exports = model('visitas',VisitaSchema)