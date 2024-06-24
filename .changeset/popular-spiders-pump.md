---
"@rage-js/tools": minor
---

- Bug fix: formatLog function's warning log message flag is changed from **(CONFIG)** to **(WARNING)**.
- Feature: New function in MongoDBToolKit class called `createCollection`, which is used to create collections locally and then expects the core module to turn that into real mongodb collection later while pushing.
- Feature: New function in MongoDBToolKit class called `findCollection`, which is used to find collections that are located locally and then return it in a custom class type `MongoDBCollection`.
- Feature: New custom class type `MongoDBCollection`, a custom type built specifically to manage locally created MongoDB collections by the core module. It is expected to have functions like `find`, `findOne`, `create`, `delete`, `deleteMany`.
