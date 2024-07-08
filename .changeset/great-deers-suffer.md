---
"@rage-js/tools": minor
---

- Feature: Schemas' formats as changed, new options like `type`, `required`, `default` are added. Example of the new schema format:
  ```json
  {
    "requiredArg": { "type": "string", "required": true },
    "optionalArg": {
      "type": "string",
      "required": false,
      "default": "It's optional!"
    },
    "multiTypeArg": {
      "type": ["string", "number"],
      "required": true
    }
  }
  ```
- Feature: Redefined the return type of `getSchema` function from `MongoDBSchmea` class.
- Feature: `createDocument` from `MongoDBCollection` class is updated with the new schema format.
