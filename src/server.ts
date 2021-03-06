import './util/module-alias';

import { Server } from '@overnightjs/core';
import * as express from 'express';
import * as http from 'http';

import logger from './logger';
import * as database from '@src/database';
import { apiErrorValidator } from './middlewares/api-error-validator';

export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private readonly port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();

    await this.databaseSetup();

    // must be the last
    this.setupErrorHandlers();
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  public getApp(): express.Application {
    return this.app;
  }

  public async close(): Promise<void> {
    await database.close();

    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }
}
