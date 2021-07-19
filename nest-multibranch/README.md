### Comands:

```
nest new nest-multibranch
cd nest-multibranch

nest g app second-app
nest g app microservice-subscriber

nest g lib shared

nest g in logger -p shared
nest g s sum-client -p shared --flat


nest start --watch
nest start second-app --watch
nest start microservice-subscriber --watch

```

## useful examples:
https://github.com/Xavier-IV/microservice-request-response
https://www.youtube.com/watch?v=V_0lepHuNT4&list=PL7Xrzf8eJQzyyoRgsXyci-oRO6xQ4AHrq&index=12
https://stackoverflow.com/a/62333161/5728095
https://github.com/jmcdo29/ogma/tree/main/integration/src/kafka

