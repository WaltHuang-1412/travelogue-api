export interface ISql {
  [index: string]: {
    database?: string;
    username?: string;
    password?: string;
    host?: string;
    port?: string;
    dialect?: string;
  };
}
