
import { parseAsFloat, createLoader, parseAsBoolean, parseAsString } from 'nuqs/server'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const filterSearchParams = {
    //latitude: parseAsFloat.withDefault(0),
    //longitude: parseAsFloat.withDefault(0)
    type : parseAsString.withDefault("all"),
    queueType : parseAsString.withDefault("all"),
    page : parseAsString.withDefault("1"),
    limit : parseAsString.withDefault("10"),
}

export const loadSearchParams = createLoader(filterSearchParams)