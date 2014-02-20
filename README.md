# Nome do projeto 
=======================

Reposit�rio padr�o para novos projetos

## Respons�veis:
* Back-end : Alexsandro
* Front-end : Karol
* GP : Ma�ra

## Analytics
* O atendimento n�o passou o ID ainda
* Tem eventos para a �rea de produtos


## Informa��es importantes
* Vers�o de Qa no seguinte endereco [salveqa.hospedagemdesites.ws/]
* Esse app tem integra��o com Myhuggies no momento do cadastro do evento, nas classes Event - MyHuggies;
* Esse App tem uma tarefa cron que executa o arquivo cron-enviar-carta.php uma vez no dia as 04:00
* Esse App tem tageamento no google analitycs onde tudo est� no arquivo googleAnalitycs.js
* Hospedado no Media temple [http://mediatemple.net/landing/grid/?gclid=CPuPvP3807wCFY1r7AodAmQA-Q]

## Passos para deploy
* Executar o "grunt bild" dentro do projeto
* Dar push para o servidor de QA
* Dar push para o servidor de produ��o

## Suporte para mobile
* Existe uma vers�o para celular na pasta /mobile
* Existe uma verifica��o no config.php que redireciona para /mobile quando celular

### Integra��o MyHuggies
* Integra��o feita no cadastro/editar evento;
* Estou passando o nome, email, semana de gesta��o, e o id do Facebook, se quem est� criando o evento for a m�e caso contr�rio, n�o passo o id do Face
* N�o estou usando nenhuma informa��o do Myhuggies, apenas cadastrando se j� nao estiver cadastrada;
* Toda integra��o est� nas classes  Event e Myhuggies;
* Toda regra de negocio de Myhuggies foram feitas pelo Jefferson.


