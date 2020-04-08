// Junta a ligação dos dados clientes com os historico ajustando cpf
const clientsHistorics = (clients, historics) => {

    let clientsHistorics = [];
    let listClientsHistorics = [];
    let clientHistoric = {
        nome: "",
        cpf: "",
        data: "",
        itens: [],
        valorTotal: ""
    };


    // Recupera todos os ClientsHistorics filtrando só pelo seu cpf unico
    for (let i = 0; i < clients.length; i++) {

        let clientCPF = "0" + clients[i].cpf.slice(0, 11) + "." + clients[i].cpf.slice(-2);

        let listclients = historics.filter(h => h.cliente == clientCPF);


        listclients.forEach(c => {

            clientHistoric = {
                nome: clients[i].nome,
                cpf: clients[i].cpf,
                data: c.data,
                itens: c.itens,
                valorTotal: c.valorTotal
            }

            clientsHistorics.push(clientHistoric);

        });

        listClientsHistorics.push(clientsHistorics);
        clientsHistorics=[];


    }

    return listClientsHistorics;

}



// Sorteia um produto do historico de compras e retorna contendo os dados
const productWineFunction = historics => {

    const numberHistorics = Math.floor(Math.random() * historics.length);
    const numberHistoricsItens = Math.floor(Math.random() * historics[numberHistorics].itens.length);
    const productWine = historics[numberHistorics].itens[numberHistoricsItens];

    return productWine;
}

// Ordena as compras de historico a partir do maior valor total
const clientsBiggerValue = listClientsHistorics => {

    listClientsHistorics = listClientsHistorics.flat(2);
    let aux = 0;

    for (let i = 0; i < listClientsHistorics.length; i++) {

        for (let j = 0; j < i; j++) {

            if (listClientsHistorics[i].valorTotal > listClientsHistorics[j].valorTotal) {
                aux = listClientsHistorics[i].valorTotal;
                listClientsHistorics[i].valorTotal = listClientsHistorics[j].valorTotal;
                listClientsHistorics[j].valorTotal = aux;
            }

        }

    }


    return listClientsHistorics;

}

// Verifica o cliente que tem a maior compra do ano 2016 e retorna
const clientBiggerLast = listClientsHistorics => {

    let maior = 0;
    let data = "";
    listClientsHistorics = listClientsHistorics.flat(2);

    for (let i = 0; i < listClientsHistorics.length; i++) {

        data = listClientsHistorics[i].data.slice(-4);

        if (listClientsHistorics[i].valorTotal > maior && data == "2016") {
            maior = listClientsHistorics[i].valorTotal;
        }

    }

    // Retorna o cliente com seu maior valor sendo do ano 2016
    let client = listClientsHistorics.find(c => {
        let data = c.data.slice(-4);

        if (data == "2016" && c.valorTotal == maior) {
            return c;
        }

    });

    return client;
}

//Verifica e retorna os clientes mais fiéis
const clientsFaithful = listClientsHistorics => {

    let listClientsFaithful = [];

    // Limitei clientes com hitorico de 6 pra cima
    const contFieis = 6;

    for (let i = 0; i < listClientsHistorics.length; i++) {

        //console.log(listClientsHistorics[i]);

        if (listClientsHistorics[i].length >= contFieis) {

            let soma = 0;
            listClientsHistorics[i].forEach(c => {

                clientHistoric = {
                    nome: c.nome,
                    cpf: c.cpf,
                    valorTotal: soma += c.valorTotal
                }

            });

            listClientsFaithful.push(clientHistoric);
        }

    }

    
    return listClientsFaithful;

}


module.exports = app => {

    const { clients, historics } = app.database.database;

    const listClientsHistorics = clientsHistorics(clients, historics);


    return {

        productWine: productWineFunction(historics),
        clientsBiggerValue: clientsBiggerValue(listClientsHistorics),
        clientBiggerLast: clientBiggerLast(listClientsHistorics),
        clientsFaithful: clientsFaithful(listClientsHistorics)
    }

}
