# anti.fish-reports

A discord bot for reporting phishing urls

#### Prerequisists

-   Install [NodeJS](https://nodejs.org/en/download/) (only for development)
-   Install [Docker](https://docs.docker.com/get-docker/) (only for production)
-   Create a copy of `.env.example` called `.env` and fill in the blanks

#### Development

**Install dependencies**

```sh
npm i
```

**Run**

```sh
node .
```

#### Docker

**Build image**

```sh
docker build -t anti.fish-reports .
```

**Run image**

```sh
docker run -d -it --restart always --name anti.fish-reports anti.fish-reports:latest
```
