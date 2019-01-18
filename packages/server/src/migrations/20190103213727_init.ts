import Knex, {TableBuilder} from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('student', (table: TableBuilder) => {
    table.increments().primary();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.date('birth_date').notNullable();
    table.string('gender', 1).notNullable();
    table.string('contact_phone');
    table.string('contact_mobile');
    table.string('contact_mail');
  });

  await knex.schema.createTable('instructor', (table: TableBuilder) => {
    table.increments().primary();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.string('title', 10);
    table.date('birth_date').notNullable();
    table.string('gender', 1).notNullable();
    table.string('contact_phone');
    table.string('contact_mobile');
    table.string('contact_mail');
  });

  await knex.schema.createTable('course', (table: TableBuilder) => {
    table.increments().primary();
    table.string('name', 128).notNullable();
    table.string('commitment');
    table.string('description');
    table.integer('total_points').notNullable();
  });

  await knex.schema.createTable('chapter', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('course_id')
      .references('course.id')
      .onDelete('CASCADE');
    table.string('name', 128).notNullable();
    table.string('description');
    table.decimal('total_points').notNullable();
  });


  await knex.schema.createTable('assessment', (table: TableBuilder) => {
    table.increments().primary();
    table.integer('total_points').notNullable();
    table.string('kind').notNullable();
  });

  await knex.schema.createTable('assessment_chapter', (table: TableBuilder) => {
    table.increments().primary();
    table.integer('assessment_id').references('assessment.id').onDelete('CASCADE');
    table.integer('chapter_id').references('chapter.id').onDelete('CASCADE');
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
    table
      .integer('course_id')
      .references('course.id')
      .onDelete('CASCADE');
    table.date('start_date');
    table.date('end_date');
  });

  await knex.schema.createTable('status', (table: TableBuilder) => {
    table.increments().primary();
    table.string('name');
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
      .date('enrolment_date')
      .notNullable()
    table.integer('status_id').references('status.id');
    table.date('status_date');
    table.decimal('final_grade');
  });

  await knex.schema.createTable('student_result', (table: TableBuilder) => {
    table.increments().primary();
    table
      .integer('student_id')
      .references('student.id')
      .onDelete('CASCADE');
    table
      .integer('course_id')
      .references('course.id')
      .onDelete('CASCADE');
    table.decimal('total_points').notNullable();
  });
}

const tables = [
  'student',
  'instructor',
  'course',
  'chapter',
  'assessment',
  'on_course',
  'course_session',
  'status',
  'enrolled_course',
  'student_results',
];

export async function down(knex: Knex) {
  tables.map(async function(table: string) {
    await knex.schema.dropTableIfExists(table);
  });
}
