/**
 * A type class that allows the user to perform collection related operations like finding, writing and deleting documents.
 */
class MongoDBCollection {
  collectionName: string;
  documents: Object[];

  constructor(collectionName: string, documents: Object[]) {
    this.collectionName = collectionName;
    this.documents = documents;
  }
}

export default MongoDBCollection;
