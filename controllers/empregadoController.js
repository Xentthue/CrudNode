const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Empregado = mongoose.model('Empregado');

router.get('/', (req, res) => {
    res.render("empregado/addOrEdit", {
        viewTitle: "Insira Empregado"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var empregado = new Empregado();
    empregado.nomecompleto = req.body.nomecompleto;
	empregado.cpf = req.body.cpf;
	empregado.telefone = req.body.telefone;
    empregado.email = req.body.email;
	empregado.estado = req.body.estado;
    empregado.cidade = req.body.cidade;
	empregado.cep = req.body.cep;
	empregado.endereco = req.body.endereco;
	empregado.complemento = req.body.complemento;
	empregado.observacoes = req.body.observacoes;
    empregado.save((err, doc) => {
        if (!err)
            res.redirect('empregado/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("empregado/addOrEdit", {
                    viewTitle: "Insira Empregado",
                    empregado: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Empregado.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('empregado/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("empregado/addOrEdit", {
                    viewTitle: 'Update Empregado',
                    empregado: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Empregado.find((err, docs) => {
        if (!err) {
            res.render("empregado/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving empregado list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nomecompleto':
                body['nomecompletoError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Empregado.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("empregado/addOrEdit", {
                viewTitle: "Update Empregado",
                empregado: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Empregado.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/empregado/list');
        }
        else { console.log('Error in empregado delete :' + err); }
    });
});

module.exports = router;