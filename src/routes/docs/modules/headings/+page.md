
## Headers in Vixeny

In Vixeny, headers are pivotal in defining a petition's characteristics. They offer flexibility by allowing initialization with custom values or predefined MIME types. The following sections delve into the nuances of using and defining headers in Vixeny.

### Initializing Headers

Use the `headers` property within the `PetitionHeader` type to initialize headers. This enables the assignment of either a default MIME type or specific custom headers. The following examples demonstrate the similarity between both assignments:

```ts
{
    path: "/path",
    headings: {
        headers: ".json"
    },
    f: ctx => '{"hello":"world"}'
}
    
{
    path: "/path",
    headings: {
        headers: {"content-type":'application/json' }
    },
    f: ctx => '{"hello":"world"}'
}
```

In the snippets above, the `headers` attribute can adopt either a `HeadersInit` instance or a predefined `defaultMime`. Notably, there are 74 predefined `content-type` values available.

### Setting Status Text

To articulate a customized status text for your petition, utilize the `statusText` attribute:

```ts
{
    path: "/path",
    headings: {
        status: 404,
        statusText: "Resource Not Found",
    },
    f: ctx => null
}
```

This feature facilitates the conveyance of a comprehensible message accompanying the petition's status.

### Defining Status Number

Every petition resonates with a distinct status number that epitomizes its outcome. This value can be assigned using the `status` attribute:

```ts
{
    path: "/path",
    headings: {
        status: 404
    },
    f: ctx => 'Not_Found'
}
```

In this context, the numeric value stands as a testament to the HTTP status code attached to the petition.

