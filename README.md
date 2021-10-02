
# Producer

A Node.js Service to stream data from multiple sensors via WebSocket


![Apache License](https://img.shields.io/github/license/cleyxds/nodeproducer)
![Last Commit](https://img.shields.io/github/last-commit/cleyxds/nodeproducer)

## API Reference

- **Producer** runs on port 3333
  - Expecting a request each 2s per *device*
- **SocketIO** runs on port 33334
- A post with JSON Body to create data

### Post data with a customer_id

```http
  POST /power/data/{customer_id}
```

| Parameter     | Type            | Description                |
| :------------ | :-------------- | :------------------------- |
| `customer_id` | `number`        | **Required** customer_id   |

| Body          | Type            | Description                             |
| :------------ | :---------------| :-------------------------------------- |
| `device_id`   | `uuid;string`   | **Required** device id it was sent from |
| `measurement` | `number`        | **Required** value measured             |

## Tech Stack

**Server:** Node, Express.js, Socket.io, WebSocket

## Authors

- [@cleyxds](https://www.github.com/cleyxds)
