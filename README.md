
# Producer

A Node.js Kafka Producer to serve data for a Kafka topic


![Apache License](https://img.shields.io/github/license/cleyxds/nodeproducer)
![Last Commit](https://img.shields.io/github/last-commit/cleyxds/nodeproducer)

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT` *usually **3333***

`KAFKA_BROKERS` *points to a kafka broker **host:port***

  
## API Reference

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
