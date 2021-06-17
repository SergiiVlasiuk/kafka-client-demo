import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { RawAvroSchema, SchemaType } from '@kafkajs/confluent-schema-registry/dist/@types'

const registry = new SchemaRegistry({ host: 'http://schema-registry:8081/' })
let schemaRegistryId = undefined
// let schemaRegistryId = 2

export const schema: RawAvroSchema = {
    type: "record",
    name: "MySchema",
    namespace: "demo",
    fields: [
        {
            name: "firstLevelField",
            type: {
                type: "record",
                name: "firstLevelField",
                fields: [
                    { type: "string", name: "name" },
                    { type: "string", name: "description" },
                ]
            }
        }
    ]
}

export const encode = async (payload) => {
    if (!schemaRegistryId) {
        schemaRegistryId = (await registry.register({
            type: SchemaType.AVRO,
            schema: JSON.stringify(schema),
        })).id
    }
    return await registry.encode(schemaRegistryId, payload)
}

const registryService = {
    registry,
    encode,
    decode: registry.decode
}

export const RegistryProvider = {
    provide: 'REGISTRY',
    useValue: registryService
}
