# Embedding Faraday in another website

This program shows how to embed Faraday into another application.

## Generating keys

You can generate a public/private key pair as follows:

```sh
ssh-keygen -t rsa -b 4096 -m PEM -f acme-demo.key
openssl rsa -in acme-demo.key -pubout -outform PEM -out acme-demo.key.pub
```

You will then need to send your `*.key.pub` file to Faraday so that we can verify your signatures.
