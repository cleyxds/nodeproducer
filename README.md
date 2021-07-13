
# Producer

A Node.js Kafka Producer to serve data for a Kafka topic


![Apache License](https://img.shields.io/github/license/cleyxds/nodeproducer)
![Last Commit](https://img.shields.io/github/last-commit/cleyxds/nodeproducer)

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`KAFKA_BROKERS` *bootstrap-server*

`KAFKA_CLIENT_ID` *service accounts id*

`KAFKA_CLIENT_SECRET` *service accounts secret*

  
## API Reference

- Runs on port 3333
- A post with JSON Body creates data => *expecting {"measurement": *number*}*


#### Post data with a customer_id

```http
  POST /power/data/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `customer_id` | `string` | **Required** customer_id |

#### Last data of all customers

```http
  GET /power/data
```

## Tech Stack

**Server:** Node, Express.js, Kafka.js

## Authors

- [@cleyxds](https://www.github.com/cleyxds)
