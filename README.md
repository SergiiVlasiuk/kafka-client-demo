```
docker-compose -f docker-compose-build.yml build --no-cache
docker-compose -f docker-compose-build.yml up --build
docker-compose -f docker-compose-build.yml logs kafkajs-consumer

```

- kafkajs
- kafka-node
- node-rdkafka



## [Nest.js microservice approaches](doc/nest.js_microservice.md)
## [Nest.js example](nest-js--kafka-js/README.md)


## [Docker-compose from confluentinc](https://github.com/confluentinc/cp-all-in-one/tree/6.1.1-post/cp-all-in-one)

It contains:
 - `control-center:9021`
 - `schema-registry:8081`
 - `zookeeper:2181`
 - `broker:9092`
 - `broker:9101`
 - others

## Schema registry
To get topic-schemas list:
```
    http://localhost:8081/subjects
```
to get topic schema versions:
```
http://localhost:8081/subjects/demo-topic-key/versions
http://localhost:8081/subjects/demo-topic-value/versions
```
```
http://localhost:8081/subjects/demo-topic-value/versions/1
http://localhost:8081/subjects/demo-topic-value/versions/latest
```


### [Schema registry API](https://docs.confluent.io/3.0.0/schema-registry/docs/api.html)

```
http://localhost:8081/schemas
http://localhost:8081/schemas/ids/:id
http://localhost:8081/subjects
http://localhost:8081/config
http://localhost:8081/
```

