import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import { AvroSchema, Schema } from "@kafkajs/confluent-schema-registry/dist/@types";

const registry = new SchemaRegistry({ host: 'http://schema-registry:8081/' })
const schemaRegistryId = 3

let schema: AvroSchema | Schema = undefined

export const encode = async (payload) => {
    if (!schema) schema = await registry.getSchema(schemaRegistryId)
    return await registry.encode(schemaRegistryId, payload)
}

console.log('registry service: 14')

const registryService = {
    encode,
    decode: payload => registry.decode(payload)
}

console.log('registry service: ', registryService)

export const RegistryProvider = {
    provide: 'REGISTRY',
    useValue: registryService
}
