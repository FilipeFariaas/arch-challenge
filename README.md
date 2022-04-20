## ARQUITETURA DE SALDO

- Salvar em um banco NoSQL e em Cache
- Duas APIs, uma para registro de transação e outra para consulta de saldo

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a0f34603-049b-4429-9702-7a55f2b30308/Untitled.png)

## REGISTRO DE TRANSAÇÃO

- Registrar uma transação, sendo crédito (+) ou débito (-)
- Gravar na base de dados

### ESTRUTURA DO DADO

- ID da conta
- Valor da transação
- Data da transação
- Tipo (crédito ou débito)

### LAYERS

- RETRY
    
    Tentar conexão com as bases de dados
    
- MOTOR DE ESTADOS
    
    Registra na base NoSQL, em caso de sucesso, atualiza o saldo (cache)
    
- SALDO-RECARGA-TOTAL
    
    Reprocessa todo o dado da base NoSQL para o cache (limpa o cache e grava os dados da base NoSQL novamente). É executado sempre que uma transação ocorre
    

## CONSULTA DE SALDO

- Consome os dados fornecidos através da API de registro de transação
- Recebe apenas o ID da conta
- Cache expira entre 5~10 minutos

### LAYERS

- FACADE
    
    Erros e rotas
    
- SALDO-CACHE
    
    Dado em memória (cache). Caso o dado não exista na base cache, carrega o dado pela base NoSQL através da layer SALDO-RECARGA-UNITARIA
    
- SALDO-RECARGA-UNITARIA
    
    Recarrega o saldo da conta especifica e grava em cache
    

### REQUISITOS FUNCIONAIS

- Node.JS
- MongoDB
- Redis
