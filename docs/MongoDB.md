### install mongodb

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

### Install MongoDB

    brew tap mongodb/brew
    brew install mongodb-community

### Start MongoDB

    mongod --config /usr/local/etc/mongod.conf

    or

    brew services start mongodb-community@4.0

then

    $ mongo

### select database to use

quick reference https://docs.mongodb.com/manual/reference/mongo-shell/

    > use myNewDB
    switched to db myNewDB

## CRUD Operation

    https://docs.mongodb.com/manual/crud
    https://docs.mongodb.com/manual/tutorial/update-documents/#write-op-update

## Insert document

    db.collection.insertOne({
    { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
    })

## Find document

    db.collection.find( { item: "canvas" } )

## Update document

https://docs.mongodb.com/manual/reference/operator/update/

```js
db.collection.updateOne(
  { item: "mousepad" },
  {
    $set: { "size.uom": "cm", status: "P" },
    $currentDate: { lastModified: true }
  }
);

db.collection.update(
  { sku: "abc123" },
  { $inc: { quantity: -2, "metrics.orders": 1 } }
);
```

The update operation:

uses the $set operator to update the value of the size.uom field to "cm" and the value of the status field to "P",
uses the $currentDate operator to update the value of the lastModified field to the current date. If lastModified field does not exist, $currentDate will create the field. See $currentDate for details.

```js
db.inventory.updateMany(
  { qty: { $lt: 50 } },
  { $set: { "size.uom": "in", status: "P" } }
);
```

## Delete document

```js
db.collection.deleteOne({ status: "A" });
```

## Replace a Document

```js
db.inventory.replaceOne(
  { item: "paper" },
  {
    item: "paper",
    instock: [{ warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 }]
  }
);
```

# Use MongoDB node driver

http://mongodb.github.io/node-mongodb-native/3.2/reference/ecmascriptnext/crud/
https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp
