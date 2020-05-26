COUCHDB INFORMATION

    TYPE: Document Database

        - CouchDB is a powerful B-tree storage engine. A B-tree is a sorted data structure that allows for searches,  insertions, and deletions in logarithmic time.

    STYLE: All or nothing saving to Db

    PROPERTIES: ACID (Atomic Consistent Isolated Durable)

        - Never overwrites committed data or associated structures, database file is always in a consistent state

COUCHBASE INFO:

    STARTER KIT INSTALLS:

            - https://docs.couchbase.com/server/6.5/getting-started/starter-kits.html

    DOCKER INSTALL LINK:

            - https://docs.couchbase.com/server/6.5/getting-started/do-a-quick-install.html

    COUCHBASE NODE.js CLIENT:

            - https://docs.couchbase.com/sdk-api/couchbase-node-client/

    COUCHBASE DOCS:

            - https://docs.couchbase.com/nodejs-sdk/3.0/hello-world/start-using-sdk.html

    SAMPLE SERVER:

            - https://github.com/couchbaselabs/try-cb-nodejs/blob/6.5/index.js

    GETTING STARTED:

            1) npm install couchbase
                1.1) npm install couchbase --save
            2)

        CREATE INDEX.JS FILE:

                1) const couchbase = require('couchbase')
                    const cluster = new couchbase.Cluster(
                    'couchbase://localhost',
                    { username: 'Administrator', password: 'password' }
                    )

                2) // get a reference to our bucket
                    const bucket = cluster.bucket('bucketName')

                3) // get a reference to the default collection
                    const collection = bucket.defaultCollection()

                4) const airline = {
                    type: 'airline',
                    id: 8091,
                    callsign: 'CBS',
                    iata: null,
                    icao: null,
                    name: 'Couchbase Airways'
                    }

                5) const upsertDocument = async (doc) => {

                    // For KV operations (get, insert, upsert, delete, etc), you would work against the collection.
                    // For queries, you use the cluster.
                    // So, your query should read:

                    HELPFUL LINK:

                        - https://forums.couchbase.com/t/cb130n-lab04-bucket-query-is-not-a-function/25207

                    try {
                        // key will equal: "airline_8091"
                        const key = `${doc.type}_${doc.id}`
                        const result = await collection.upsert(key, doc)
                        console.log('Upsert Result: ')
                        console.log(result)
                    } catch (error) {
                        console.error(error)
                    }
                    }

                6) // get document function
                    const getAirlineByKey = async(key) => {
                    try {
                        const result = await collection.get(key)
                        console.log('Get Result: ')
                        console.log(result)
                    } catch (error) {
                        console.error(error)
                    }
                    }

                7) // call get document function
                    getAirlineByKey("airline_8091")

                8) // To run code
                    npm rebuild && node index.js
