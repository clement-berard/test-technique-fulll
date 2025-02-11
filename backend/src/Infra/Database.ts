import Database from 'better-sqlite3';

export const db = new Database('./database.sqlite');

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS fleets (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      plateNumber TEXT NOT NULL,
      fleetId TEXT NOT NULL,
      PRIMARY KEY (plateNumber, fleetId),
      FOREIGN KEY (fleetId) REFERENCES fleets(id) ON DELETE CASCADE
        );

    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plateNumber TEXT NOT NULL,
      fleetId TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      altitude REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      
      FOREIGN KEY (plateNumber, fleetId)
      REFERENCES vehicles (plateNumber, fleetId)
      ON DELETE CASCADE
        );
`);
