import Knex, {TableBuilder} from 'knex';

function auditing(knex: Knex, table: TableBuilder) {
  table
    .integer('created_by')
    .unsigned()
    .index()
    .notNullable();
  table
    .integer('updated_by')
    .unsigned()
    .index();
  table
    .timestamp('created_at')
    .defaultTo(knex.fn.now())
    .index()
    .notNullable();
  table
    .timestamp('updated_at')
    .nullable()
    .index();
}

function person(table: TableBuilder) {
  table
    .increments()
    .primary()
    .index();
  table.string('name', 50).notNullable();
  table.string('surname', 50).notNullable();
  table.string('dob', 10).notNullable();
  table.string('gender', 1).notNullable();
}
export async function up(knex: Knex) {
  await knex.schema.createTable('role', (table: TableBuilder) => {
    table.increments().primary();
    table
      .string('name', 20)
      .notNullable()
      .index();
    auditing(knex, table);
  });

  await knex.schema.createTable('teacher', (table: TableBuilder) => {
    person(table);
  });

  await knex.schema.createTable('subject', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .index();
    table.string('name', 25).notNullable();
    table
      .integer('teacher_id')
      .references('teacher.id')
      .onDelete('SET NULL');
  });

  await knex.schema.createTable('hod', (table: TableBuilder) => {
    person(table);
    table
      .integer('department_id')
      .references('subject.id')
      .onDelete('SET NULL')
      .unsigned()
      .index();
  });

  await knex.schema.createTable('section', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('subject_id')
      .references('subject.id')
      .onDelete('CASCADE');
    table.string('name', 25).notNullable();
    table
      .float('mark_contribution', 2)
      .notNullable()
      .unsigned();
  });

  await knex.schema.createTable('student', (table: TableBuilder) => {
    person(table);
    table.string('grade', 3).notNullable();
    table
      .integer('class_teacher_id')
      .references('teacher.id')
      .onDelete('SET NULL');
    table.specificType('subjects', 'VARCHAR[]');
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('person');
  await knex.schema.dropTableIfExists('hod');
  await knex.schema.dropTableIfExists('teacher');
  await knex.schema.dropTableIfExists('student');
  await knex.schema.dropTableIfExists('subject');
  await knex.schema.dropTableIfExists('section');
}
