/* tslint:disable max-classes-per-file */
import {default as Knex, Transaction} from 'knex';
import {Constructor, Model, QueryBuilder, QueryContext} from 'objection';
import {Span} from 'opentracing';

import {knex} from '../db';
import tracer from '../tracer';

Model.knex(knex);

const isTest = process.env.NODE_ENV === 'test';

export class BaseModel extends Model {
  public static query<CB extends Model>(
    this: Constructor<CB>,
    trxOrKnex?: Transaction | Knex
  ): QueryBuilder<CB> {
    const query = super.query(trxOrKnex);

    let span: Span | null = null;

    // https://github.com/Vincit/objection.js/issues/807#issuecomment-366734514
    // Tracing Events
    query.onBuildKnex((knexQueryBuilder) => {
      knexQueryBuilder.on('query', (queryData: any) => {
        const {
          // Parent span can be null during migrations or seeds
          span: parentSpan,
          user,
        } = query.context();

        if (parentSpan == null && !isTest) {
          // tslint:disable-next-line no-console
          console.warn(
            `Missing Parent Span in models/base. Query: ${queryData.sql}.`
          );
        }

        if (user == null && !isTest) {
          // tslint:disable-next-line no-console
          console.warn(`Missing User in models/base. Query: ${queryData.sql}.`);
        }

        span = tracer.startSpan('knex query', {
          childOf: parentSpan,
          tags: {
            method: queryData.method,
            sql: queryData.sql,
            user: user ? user.id : null,
          },
        });
      });

      knexQueryBuilder.on('query-error', (error: Error, _obj: any) => {
        if (span != null) {
          span.setTag('error', true);

          span.log({
            event: 'error',
            message: error.message,
            stack: error.stack,
          });

          span.finish();
        }
      });

      knexQueryBuilder.on(
        'query-response',
        (response: any, _obj: any, _builder: any) => {
          if (span != null) {
            span.log({
              event: 'completed',
              data: JSON.stringify(response),
            });
            span.finish();
          }
        }
      );
    });

    // @ts-ignore
    return query;
  }

  /**
   * Default tableName is class name with first character lowercased
   */
  public static get tableName(): string {
    return this.name.slice(0, 1).toLocaleLowerCase() + this.name.slice(1);
  }

  public readonly id!: number;
  public readonly createdAt!: Date;
  public updatedAt!: Date | undefined | null;
  public createdBy!: number | undefined;
  public updatedBy!: number | undefined | null;

  public $beforeInsert(queryContext: QueryContext) {
    // Allow created at to be set by user
    if (!this.createdAt) {
      // @ts-ignore
      this.createdAt = new Date();
    }

    if (!queryContext.user) {
      throw new Error(
        `$beforeInsert: User missing from context ${queryContext}.`
      );
    }

    this.createdBy = queryContext.user.id;
  }

  public $beforeUpdate(_opt: any, queryContext: QueryContext) {
    this.updatedAt = new Date();

    if (!queryContext.user) {
      throw new Error(
        `$beforeUpdate: User missing from context: ${queryContext}.`
      );
    }

    this.updatedBy = queryContext.user.id;
  }
}
