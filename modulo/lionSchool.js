/*****************************************************************************
 * Objetivo: Retornar valores para a API do LionSchool
 * Data: 10/03/2023
 * Autor: André e Nicole
 * Versão: 1.0 
 *****************************************************************************/

//Variável que pega o JSON de Cursos
var listaDeCursos = require('./recursos/cursos.js')

//Variável que pega o JSON de alunos
var listaDeAlunos = require('./recursos/alunos.js')


//Função para listar todos os cursos e informações
const getCursos = function () {
    let jsonListaDeCursos = {}
    let status = false
    let arrayCursos = []

    listaDeCursos.cursos.forEach(function (curso) {
        let jsonInfosCurso = {}
        jsonInfosCurso.nome = curso.nome
        jsonInfosCurso.sigla = curso.sigla
        jsonInfosCurso.icone = curso.icone
        jsonInfosCurso.carga = curso.carga

        arrayCursos.push(jsonInfosCurso)
        status = true
    })

    jsonListaDeCursos.curso = arrayCursos

    if (status) {
        return jsonListaDeCursos
    } else {
        return status
    }
}

//Função para retornar os alunos e suas informações
const getAlunos = function () {
    let jsonListaDeAlunos = {}
    let status = false
    let arrayDeAlunos = []

    listaDeAlunos.alunos.forEach(function (aluno) {
        let jsonAluno = {}
        jsonAluno.foto = aluno.foto
        jsonAluno.nome = aluno.nome
        jsonAluno.matricula = aluno.matricula
        jsonAluno.sexo = aluno.sexo
        aluno.curso.forEach(function (curso) {
            jsonAluno.curso = curso.nome
            jsonAluno.sigla = curso.sigla
        })

        arrayDeAlunos.push(jsonAluno)
        status = true
    })

    jsonListaDeAlunos.alunos = arrayDeAlunos

    if (status) {
        return jsonListaDeAlunos
    } else {
        return status
    }
}

//Função para retornar os alunos e suas informações filtrado pela sigla
const getAlunoMatricula = function (numeroDaMatricula) {
    let jsonListaAluno = {}
    let status = false
    let arrayDeAluno = []
    let arrayDeDisciplina = []
    let matricula = numeroDaMatricula

    listaDeAlunos.alunos.forEach(function (aluno) {
        if (aluno.matricula == matricula) {
            let jsonAluno = {}
            jsonAluno.foto = aluno.foto
            jsonAluno.nome = aluno.nome
            jsonAluno.sexo = aluno.sexo
            aluno.curso.forEach(function (curso) {
                jsonAluno.curso = curso.nome
                jsonAluno.sigla = curso.sigla
                curso.disciplinas.forEach(function (disciplina) {
                    let jsonDisciplina = {}
                    jsonDisciplina.nome = disciplina.nome
                    jsonDisciplina.carga = disciplina.carga
                    jsonDisciplina.media = disciplina.media
                    jsonDisciplina.status = disciplina.status

                    arrayDeDisciplina.push(jsonDisciplina)
                })
                jsonAluno.disciplinas = arrayDeDisciplina
                jsonAluno.status = aluno.status
                jsonAluno.matricula = aluno.matricula
            })

            arrayDeAluno.push(jsonAluno)
            status = true
        }
    })

    jsonListaAluno.aluno = arrayDeAluno

    if (status) {
        return jsonListaAluno
    } else {
        return status
    }
}

//Função para retornar os alunos filtrado pela sigla do curso
const getAlunosCurso = function (siglaCurso) {
    let jsonListaDeAlunos = {}
    let status = false
    let arrayAlunos = []
    let cursoSigla = siglaCurso.toUpperCase()

    listaDeAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso) {
            if (curso.sigla == cursoSigla) {
                let jsonAluno = {}
                jsonAluno.nome = aluno.nome
                jsonAluno.foto = aluno.foto
                jsonAluno.matricula = aluno.matricula
                jsonAluno.sexo = aluno.sexo
                jsonAluno.curso = curso.nome
                jsonAluno.sigla = curso.sigla
                jsonAluno.status = aluno.status

                arrayAlunos.push(jsonAluno)
                status = true
            }
        })
    })
    jsonListaDeAlunos.alunos = arrayAlunos

    if (status) {
        return jsonListaDeAlunos
    } else {
        return status
    }
}

const getAlunosStatus = function (statusCurso) {

    const statusDoCurso = statusCurso.toUpperCase()
    let jsonStatus = {}
    let alunosStatusArray = []
    let status = false


    listaDeAlunos.alunos.forEach(function (aluno) {
        if (aluno.status.toUpperCase() == statusDoCurso) {
            let alunosStatus = {}
            alunosStatus.nome = aluno.nome
            alunosStatus.foto = aluno.foto
            alunosStatus.matricula = aluno.matricula
            alunosStatus.sexo = aluno.sexo
            alunosStatus.status = aluno.status
            aluno.curso.forEach((curso) => {
                alunosStatus.sigla = curso.sigla
                alunosStatus.curso = curso.nome
                alunosStatus.disciplina = curso.disciplinas
            })
            if (aluno.status == 'Cursando') {
                alunosStatus.cor = '#3347B0'
                status = true
            } else if (aluno.status == 'Finalizado') {
                alunosStatus.cor = '#E5B657'
                status = true
            } else {
                return status
            }

            alunosStatusArray.push(alunosStatus)

            //console.log(alunosStatusArray)
        }
    })
    jsonStatus.alunos = alunosStatusArray

    if (status) {
        return jsonStatus
    } else {
        return status
    }
}

const getAlunosAno = function (ano, sigla) {
    let cursoSigla = sigla
    let anoCurso = ano
    let status = false
    let jsonAlunos = {}
    let arrayDeAlunos = []

    listaDeAlunos.alunos.forEach(function (aluno) {

        aluno.curso.forEach(function (curso) {

            if (anoCurso == curso.conclusao && cursoSigla == curso.sigla) {

                if (cursoSigla = curso.sigla) {
                    let jsonAluno = {}
                    jsonAluno.nome = aluno.nome
                    jsonAluno.foto = aluno.foto
                    jsonAluno.conclusao = curso.conclusao
                    jsonAluno.status = aluno.status
                    jsonAluno.curso = curso.sigla
                    jsonAluno.matricula = aluno.matricula
                    arrayDeAlunos.push(jsonAluno)
                    status = true
                }

            }
        })
    })
    jsonAlunos.alunos = arrayDeAlunos

    if (status) {
        return jsonAlunos
    } else {
        return status
    }
}

module.exports = {
    getCursos,
    getAlunos,
    getAlunoMatricula,
    getAlunosCurso,
    getAlunosStatus,
    getAlunosAno
}

console.log(getAlunosAno('2023', 'DS'))
