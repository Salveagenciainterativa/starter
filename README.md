# Nome do projeto 
=======================

Repositório padrão para novos projetos

## Responsáveis:
* Back-end : Alexsandro
* Front-end : Karol
* GP : Maíra

## Analytics
* O atendimento não passou o ID ainda
* Tem eventos para a área de produtos


## Informações importantes
* Versão de Qa no seguinte endereco [salveqa.hospedagemdesites.ws/]
* Esse app tem integração com Myhuggies no momento do cadastro do evento, nas classes Event - MyHuggies;
* Esse App tem uma tarefa cron que executa o arquivo cron-enviar-carta.php uma vez no dia as 04:00
* Esse App tem tageamento no google analitycs onde tudo está no arquivo googleAnalitycs.js
* Hospedado no Media temple [http://mediatemple.net/landing/grid/?gclid=CPuPvP3807wCFY1r7AodAmQA-Q]

## Passos para deploy
* Executar o "grunt bild" dentro do projeto
* Dar push para o servidor de QA
* Dar push para o servidor de produção

## Suporte para mobile
* Existe uma versão para celular na pasta /mobile
* Existe uma verificação no config.php que redireciona para /mobile quando celular

### Integração MyHuggies
* Integração feita no cadastro/editar evento;
* Estou passando o nome, email, semana de gestação, e o id do Facebook, se quem está criando o evento for a mãe caso contrário, não passo o id do Face
* Não estou usando nenhuma informação do Myhuggies, apenas cadastrando se já nao estiver cadastrada;
* Toda integração está nas classes  Event e Myhuggies;
* Toda regra de negocio de Myhuggies foram feitas pelo Jefferson.


