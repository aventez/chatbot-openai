# OpenAI chat assistant

## Requirements

- Node 16
- npm 8
- OpenAI API Key

## Installlation

```bash
cp .env.example .env

npm i
```

## Flowchart

![Flowchart](https://i.imgur.com/AejzvKq.png)

## Running

### Locally

1. Use default .env configuration.
2. Start the suite

```bash
npm run start:dev
```

3. App should be available on [http://localhost:8000](http://localhost:8000)

### Production

Build and use app:

- standalone

```bash
npm run build
npm run start:prod
```
