import Knex, {TableBuilder} from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('student', (table: TableBuilder) => {
    table.increments().primary();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.date('birth_date').notNullable();
    table.string('contact_phone', 13);
    table.string('contact_mobile', 13);
    table.string('contact_mail', 13);
  });

  await knex.schema.createTable('instructor', (table: TableBuilder) => {
    table.increments().primary();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.string('title', 10);
    table.date('birth_date').notNullable();
    table.string('contact_phone', 13);
    table.string('contact_mobile', 13);
    table.string('contact_mail', 13);
  });

  await knex.schema.createTable('course', (table: TableBuilder) => {
    table.increments().primary();
    table.string('name', 128).notNullable();
    table.string('commitment', 128);
    table.string('description');
    table.decimal('min_grade', 2).notNullable();
  });

  await knex.schema.createTable('chapter', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('course_id')
      .references('course.id')
      .onDelete('CASCADE');
    table.string('name', 128).notNullable();
    table.string('description');
  });

  await knex.schema.createTable('assessment_type', (table: TableBuilder) => {
    table.increments().primary();
    table.string('name', 128).notNullable();
  });

  await knex.schema.createTable('assessment', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('chapter_id')
      .references('chapter.id')
      .onDelete('CASCADE');
    table
      .integer('assessment_type_id')
      .references('assessment_type.id')
      .onDelete('CASCADE');
    table.integer('max_points').notNullable();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('on_course', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('instructor_id')
      .references('instructor.id')
      .onDelete('SET NULL');
    table
      .integer('course_id')
      .references('course.id')
      .onDelete('SET NULL');
  });

  await knex.schema.createTable('course_session', (table: TableBuilder) => {
    table.increments().primary();
    table.date('start_date');
    table.date('end_date');
  });

  await knex.schema.createTable('status', (table: TableBuilder) => {
    table.increments().primary();
    table.string('type');
  });

  await knex.schema.createTable('enrolled_course', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('student_id')
      .references('student.id')
      .onDelete('CASCADE');
    table
      .integer('course_session_id')
      .references('course_session.id')
      .onDelete('CASCADE');
    table
      .date('enrollment_date')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.integer('status_id').references('status.id');
    table.string('status_date', 128);
    table.decimal('final_grade', 2);
  });

  await knex.schema.createTable('student_results', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('student_id')
      .references('student.id')
      .onDelete('CASCADE');
    table
      .integer('course_id')
      .references('course.id')
      .onDelete('CASCADE');
    table.decimal('score', 2).notNullable();
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('student');
  await knex.schema.dropTableIfExists('instructor');
  await knex.schema.dropTableIfExists('course');
  await knex.schema.dropTableIfExists('chapter');
  await knex.schema.dropTableIfExists('assessment_type');
  await knex.schema.dropTableIfExists('assessment');
  await knex.schema.dropTableIfExists('on_course');
  await knex.schema.dropTableIfExists('course_session');
  await knex.schema.dropTableIfExists('status');
  await knex.schema.dropTableIfExists('enrolled_course');
  await knex.schema.dropTableIfExists('student_results');
}
