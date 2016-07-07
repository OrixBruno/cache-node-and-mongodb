//O mongodb é um banco de dados de alta performance e orientado a documentos = programamos em JS onde 
//Inserimos documentros e regisros no formato JSON
//Categoria NOSQL 
//Rapido = Não tem relacionamentos, não tem normalização os dados ficam todos os junos no mesmo registro
//Isso deixa rapido

//As 3 principais plataformas de desenvolvimento do world são 
//JAVA, .NET, NODE
//NODE.JS é um servidor e plataforma de desenvolvimento em javascipt

//COm o node conseguimos rodar JS nno servidor BACKEND tudo que faziamos com C# vamos começar a fazer em JS utilizando o nODE o JS no backend funciona GRAÇAS ao google
//ENGINE V8(Mecanismo)
//SERVIDOR = Nos fazemos aplicaçao pra rodar dentro dele
//ISS, APACHE, TOMCAT, JBOSS, WAMP, XAMP, LAMP

//STACK
//.NET
//IIS, C#, ASP.NET WEB API, SQL SERVER, ENTITY FRAMEWORK

//STACK
//MEAN = Mongo, Express, Angular, Node
//Node, JS, EXPRESS, MONGODB, MONGOOSE, ANGULAR

//Temos que criar um serviço pra ser chamado la do angular

//A biblitoeca de contrução de serviço se chama 
//EXPRESS.JS = ASP.NET WEB API
//Por ela abriremos o http e criaremmos os comanods do web service

var express = require("express");
//Agora temos que configurar o servidor web
//Subimos pra memória o pacote body parser ele serve pra pegar o conteudo do HTTP
//Pra pegar tudo que vem no CABEÇALHO = QUERYSTRING
//CORPO = BODY
//O EXPRESS é pra abrir o HTTP
//O BP é pra ler o conteudo que veio dentro do HTTP
var bodyParser = require("body-parser");

//Subimos pra memória o mongooses ele é toipo o Entity Framework é um framework de mapeamento de banco dados
//var mongoose = require("mongoose");

//O protocoloo HTT por padrão bloqueia chamadas AJAX CROSS DOMAIN
var cors = require("cors");






var servidor = express();



//Depois incializar o servidor colocamos o pacote body parser pra rodar dentro do HTTP
//Setamos 2 configuracoes dentro do EXPRESS
//1 - Pra ler o cabecalho do HTTP
//2 - Pra ler o conteudo do CORPO do HTTP (JSON)
//Quando baixamos o body parser ele ja veio com um leitor de query string (CABEÇALHO) que é o pacote qs
//Ou usamos o qs ou montamos o nosso próprio leitor
servidor.use(bodyParser.urlencoded({ extended : true }));
servidor.use(bodyParser.json());

//Liberamos o CORS compartilhamento dentro do EXPRESS
servidor.use(cors());


//Abrimos a conexao com o mongodb via MONGOOSE framework de acesso a dados do MONGODB (EF do MONGO)
//O mongo DB tem seu próprio protocolo
//mongoose.connect("mongodb://localhost/SISAMIGOS");

//Após conectar temos que mapear a tabela (COLLECTION)
//E todos os campsod entro dela
//1 - Nome da collection no mongo
//2 - Campos e tipos de dados
//3 - Nome interno pro mongoose
//var collectionAmigo = mongoose.model("AMIGO", {
    var collectionAmigo = {
    "nome" : "String",
    "email": "String",
    "telefone": "String",
    "data": "Date"
};

////Criamos um web service contemplando todos os comandos do crud (Listar cadastrar editar e deletar)
////A Aplicacao web angular vai acionar o serviço
////INSERT = POST = GRAVACAO = CORPO
////SELECT = GET = LEITURA = CABECALHO
////UPDATE = PUT = ATUALIZACAO = CORPO + CABECALHO
////DELETE = DELETE = EXCLUSAO = CABECALHO

////PEDIDO = REQUEST
//RESPOSTA = RESPONSE
servidor.get("/api/v1/amigo", function (pedido, resposta) {
//    //Temos que dar um select e trazer todos os registros que estao dentro da collection, select
//    //01  WHERE =  Filtro sem filtros é so por {}
//    //02 Campos sem virgula
    //03 Tratamento de sucesso ou erro
    console.log(collectionAmigo);
    resposta.send(collectionAmigo);
    /*return [{
        "nome":"bruno",
        "nascimento":"10/01/1997"
    }];*/

    /*collectionAmigo.find({}, "nome email telefone data", function (erro, dados) {
        if (erro)
            console.error(erro);
        else
            resposta.send(dados);
    });*/
});

////Precisamos criar o comando para selecionar um registro fazendo uma sobrecarga do get
servidor.get("/api/v1/amigo/:id",function (pedido, resposta) {
    var amigo = collectionAmigo.findById(pedido.params.id, function (erro, sucesso) {
        if (erro) {
            console.error(erro);
        }else {
            resposta.send(sucesso);
        }
        
        
    });
});

servidor.post("/api/v1/amigo", function (pedido, resposta) {
    //Temos que pegar os dados que vieram da tela e inserir na collection do banco
    //Os dados vem no formato JSON
    var novoAmigo = new collectionAmigo(pedido.body);
    //Salvamos o registro quando mandamos salvar se der erro esscrevemos o erro na tela do NODE (GERENCIAL ADMINISTRAIVA)
    //SE deu sucesso enviamos uma mensagem de sucesso
    novoAmigo.save(function (erro, sucesso) {
        if (erro)
            console.error(erro);
        else
            resposta.send("Amigo cadastrado com sucesso.");
    });
});

////Put e pra fazer o upate e considerado exotico ninguem usa
////Quando usamos o put mandamos os dados pelo cabeçalho e corpo do HTTP
////Adaptamos a URL pra receber o ID do registro que vamos atualizar (ID = OBJECTID = _ID)
////pedido.params = cabecalho
////pedido.body = corpo
servidor.put("/api/v1/amigo/:id", function (pedido, resposta) {
    collectionAmigo.findById(pedido.params.id, function (erro, amigo) {
        if (erro) {
            console.error(erro);
        } else {
            amigo.nome = pedido.body.nome;
            amigo.email = pedido.body.email;
            amigo.data = pedido.body.data;
            amigo.telefone = pedido.body.telefone;

            amigo.save();
            resposta.send("Amigo atualizado com sucesso.");
        }
    });
    
});

////Programos o DELETE pra remover o registro 
////Precisamos do ID
servidor.delete("/api/v1/amigo/:id", function (pedido, resposta) {
    collectionAmigo.remove({ _id : pedido.params.id }, function (erro, sucesso) {
        if (erro) {
            console.error(erro);
        } else { 
           resposta.send("Amigo excluido com sucesso.");
     }
    
   });
});

servidor.listen(12345,function (error,sucesso) {
        if (error) {
            console.log(error);
        }else{
            console.log("Servidor iniciado com sucesso.");
        }
    }
);