interface configurationType {
  method: "PAI";
  methodSpecificSettings: {
    interval?: number;
  };
  databaseType: "MongoDB";
  databaseSpecificSettings: {
    secretKey?: string;
    dbs?: string[];
    excludeCollections?: string[];
  };
  outDir: string;
}

interface SchemaConfigurationType {
  [key: string]: {
    type: string[];
    required?: boolean = false;
    default?: any;
  };
}

export { configurationType, SchemaConfigurationType };
