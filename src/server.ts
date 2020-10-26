import './util/module-alias';

import { Server } from '@overnightjs/core';
import * as express from 'express';
import * as http from 'http';

import logger from './logger';

export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private readonly port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  public getApp(): express.Application {
    return this.app;
  }

  public async close(): Promise<void> {
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