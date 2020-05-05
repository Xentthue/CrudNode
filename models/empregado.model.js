const mongoose = require('mongoose');

var empregadosSchema = new mongoose.Schema({
    nomeCompleto: {
        type: String,
        required: 'Espaco Obrigatorio.'
    },
	
    cpf: {
        type: String
    },
    telefone: {
        type: String
    },
	email: {
        type: String
	},
    estado: {
        type: String
    },
    cidade: {
        type: String
	},
	cep: {
        type: String
    },
	endereco: {
		type: String
    },
	complemento: {
        type: String
    },
	observacoes: {
        type: String
    }
});

// validacao email
empregadosSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'e-mail invalido.');

mongoose.model('Empregado', empregadosSchema);