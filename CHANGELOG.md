# @rage-js/tools

## 0.1.0

### Minor Changes

- 6aa42bd:
  - Bug fix: formatLog function's warning log message flag is changed from **(CONFIG)** to **(WARNING)**.
  - Feature: New function in MongoDBToolKit class called `createCollection`, which is used to create collections locally and then expects the core module to turn that into real mongodb collection later while pushing.
  - Feature: New function in MongoDBToolKit class called `findCollection`, which is used to find collections that are located locally and then return it in a custom class type `MongoDBCollection`.
  - Feature: New custom class type `MongoDBCollection`, a custom type built specifically to manage locally created MongoDB collections by the core module. The class may include functions like `findDocument`, `createDocument`.
  - Feature: Users can now create "schemas" for their MongoDB collections. A Schema is like an expected structure of every document inside the collection.

## 0.0.5

### Patch Changes

- Added images and updated README.md

## 0.0.4

### Patch Changes

- Modified TooKit - MongoDBToolKit

## 0.0.3

### Patch Changes

- Modified logger, turning emojis into flags (e.g. (CONFIG), (ERROR), etc).

## 0.0.2

### Patch Changes

- Created basic files
