# Web crawler

**Readme file will be finished when the project hits the "1.0.0" mark.**

Web crawler that uses microservice architecture to pass data between services. At the moment the project has functional backend without the functionality to show what's happening with a frontend application.

## Installation and running

It's recommended to run the crawler under docker, but if necessary the project can be run manually utilizing JavaScript tools, such as Node.js to run the code and npm to manage the libraries. More information can be found in `package.json` files.

### Running under docker

```terminal
sudo docker compose up

# or when developing
sudo docker compose up --build --renew-anon-volumes
```

## Testing and linting

The project uses Jest as the testing library and ESLint as the linter. Below there is basic instructions how these tools can be used.

### Testing

```bash
jest
```

### Linting

```bash
eslint .
```

## Todo

- [ ] Update libraries
  - [ ] database-api
  - [ ] fetch-bot
  - [ ] persister
  - [ ] validator