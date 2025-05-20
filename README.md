# flora_energia_tech_test

Este projeto é uma aplicação para gerenciar palavras em inglês, utilizando a [Free Dictionary API](https://dictionaryapi.dev/) como base. A aplicação permite que os usuários visualizem palavras, salvem palavras favoritas, consultem o histórico de palavras visualizadas e realizem login. Além disso, a API implementa caching para otimizar as respostas e utiliza boas práticas de desenvolvimento.

## Tecnologias Utilizadas

- **Node.js**: Linguagem principal para o desenvolvimento do back-end.
- **Express**: Framework para criação de APIs RESTful.
- **Zod**: Para validação de schemas nas rotas REST.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência.
- **TypeORM**: ORM para interação com o banco de dados.
- **Redis**: Utilizado para caching das respostas da API.
- **Docker**: Para containerização da aplicação.
- **Docker Compose**: Para orquestração dos containers.
- **Jest**: Framework de testes para unit tests.

## Instalação e Execução Local

1. **Clone o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd flora_energia_tech_test
   ```

2. **Instale as dependências**:
   ```bash
   yarn
   ```

3. **Crie uma cópia do .env_dev**
   - no mesmo nível do arquivo `.env_dev`, crie uma cópia dele como `.env`
   - Preencha o JWT_SECRET (qualquer valor é válido)

4. **Configure o banco de dados**:
   - Crie um banco de dados PostgreSQL chamado `english_dict`.
   - Configure as credenciais no arquivo `.env`:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=english_dict
    ```

5. **Configure o redis (via docker)**:
    ```
    docker run --name redis-dev -p 6379:6379 -d redis
    ```
    - Configure as credenciais no arquivo `.env`:
    ```
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

6. **Inicie o servidor local**:
   ```bash
   yarn dev
   ```
   - A inicialização pode levar alguns segundos, devido a seed de dados inicial.
  
7.  **Acesse a aplicação**:
   - Navegue até `http://localhost:3000` em seu navegador.

## Instalação e Execução via Docker

1. **Preparativos**
    - Garanta que possua o docker e docker-compose instador e configurado e executando
    - 
2. **Inicie os containers Docker**:
   ```bash
   docker-compose up -d
   ```
   - A inicialização pode levar alguns segundos, devido a seed de dados inicial.
  
3.  **Acesse a aplicação**:
   - Navegue até `http://localhost:3000` em seu navegador.
   - Para acessar a documentação OpenAPI 3.0 utilize a rota `http://localhost:3000/api-docs`

## Testes

Para executar os testes, utilize o comando:

```bash
yarn test
```

## Considerações Finais

- Certifique-se de ter o Docker e o Docker Compose instalados.
- O Redis deve estar em execução para o caching funcionar.
- As variáveis de ambiente devem ser configuradas corretamente no arquivo `.env`.
- Recomenda-se utilizar o build via docker-compose para testes, já que esse consta com toda a infraestrutura para funcionar.