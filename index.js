/*****************************************************************************
 * Objetivo: Api para alimentar o software da lion school
 * Data: 24/03/2023
 * Autor: André e Nicole
 * Versão: 1.0 
 *****************************************************************************/

//Dependencia para criar as requisições da API
const express = require('express')
//Dependencia para gerenciar as permissões da API
const cors = require('cors')
//Dependencia para gerenciar o corpo de requisições da API
const bodyParser = require('body-parser')

const app = express()

//Import do arquivo modulo
const lionSchool = require('./modulo/lionSchool.js')

app.use((request, response, next) => {

    response.header('Acess-Control-Allow-Origin', '*')

    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//EndPoint para listar todos os cursos
app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {
    let statusCode
    let dadosCursos = {}

    let cursos = lionSchool.getCursos()

    //Tratamento para validar o sucesso da requisição
    if (cursos) {
        statusCode = 200
        dadosCursos = cursos
    } else {
        statusCode = 500
    }
    response.status(statusCode)
    response.json(dadosCursos)
})

//EndPoint para listar todos os alunos
app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {
    let statusCode
    let dadosAlunos = {}
    let aluno

    let curso = request.query.curso
    let status = request.query.status

    if (curso) {

        if (curso == '' || curso == undefined || !isNaN(curso)) {
            statusCode = 400
            dadosAlunos.message = 'Não foi possivel processar os valores dos alunos do curso. A sigla pode estar vazio e não pode conter números'
        } else {
            aluno = lionSchool.getAlunosCurso(curso)
        }

    } else if (status) {

        if (status == '' || status == undefined || !isNaN(status)){
            statusCode = 400
            dadosAlunos.message = 'Não foi possivel processar os valores do status do aluno. A sigla pode estar vazia e não pode conter números'
        } else {
            aluno = lionSchool.getAlunosStatus(status)
        }
        
    } else {
        aluno = lionSchool.getAlunos()
    }

    if (aluno) {
        statusCode = 200
        dadosAlunos = aluno
    } else {
        statusCode = 500
    }
    response.status(statusCode)
    response.json(dadosAlunos)
})

//EndPoint para pegar uma aluno específico pela matrícula
app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next) {
    let statusCode
    let dadosMatriculaAluno = {}

    let matricula = request.params.matricula

    if (matricula == '' || matricula == undefined || matricula.length != 11 || isNaN(matricula)) {
        statusCode = 400
        dadosMatriculaAluno.message = "Não foi possivel processar os valores da matricula. O número pode estar vazio, ele pode estar fora do tamanho da matricula ou não é um número"
    } else {
        let informacoesAluno = lionSchool.getAlunoMatricula(matricula)

        if (informacoesAluno) {
            statusCode = 200
            dadosMatriculaAluno = informacoesAluno
        } else {
            statusCode = 404
        }
    }
    response.status(statusCode)
    response.json(dadosMatriculaAluno)
})

//EndPoint para pegar pegar alunos filtrados pelo curso
// app.get('/v1/lion-school/alunes', cors(), async function (request, response, next) {
//     let statusCode 
//     let dadosAlunosCurso = {}

//     let curso = request.query.curso

//     if(curso == '' || curso == undefined || !isNaN(curso)){
//         statusCode = 400
//         dadosAlunosCurso.message = 'Não foi possivel processar os valores dos alunos do curso. A sigla pode estar vazio e não pode conter números'
//     } else {
//         let alunosCurso = lionSchool.getAlunosCurso(curso)

//         if (alunosCurso){
//             statusCode = 200
//             dadosAlunosCurso = alunosCurso
//         } else {
//             statusCode = 404
//         }
//     }
//     response.status(statusCode)
//     response.json(dadosAlunosCurso)
// })

//Roda o serviço para API para ficar guardando as requisições 
app.listen(8080, function () {
    console.log('Servidor aguardando na porta 8080')
})