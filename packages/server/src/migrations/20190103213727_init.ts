import Knex, {TableBuilder} from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('student', (table: TableBuilder) => {
    table
      .string('id_number')
      .primary()
      .notNullable();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.date('birth_date').notNullable();
    table.string('gender', 1).notNullable();
    table.string('contact_phone');
    table.string('contact_mobile');
    table.string('contact_mail');
    table
      .integer('grade')
      .notNullable()
      .defaultTo(8);
    table.date('enrolment_date').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('instructor', (table: TableBuilder) => {
    table
      .string('id_number')
      .primary()
      .notNullable();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.string('title', 10);
    table.date('birth_date').notNullable();
    table.string('gender', 1).notNullable();
    table.string('contact_phone');
    table.string('contact_mobile');
    table.string('contact_mail');
    table.date('employment_date').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('subject', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table.string('name', 128).notNullable();
    table.string('commitment');
    table.string('description');
    // table.integer('total_marks').notNullable();
  });

  await knex.schema.createTable('chapter', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table
      .integer('subject_id')
      .references('subject.id')
      .onDelete('CASCADE');
    table.string('name', 128).notNullable();
    table.string('description');
    table.decimal('total_marks').notNullable();
  });

  await knex.schema.createTable('assessment', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table.integer('total_marks').notNullable();
    table.string('kind').notNullable();
    table.date('start_date').defaultTo(knex.fn.now());
    table.date('end_date');
  });

  await knex.schema.createTable('assessment_chapter', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table
      .integer('assessment_id')
      .references('assessment.id')
      .onDelete('CASCADE');
    table
      .integer('chapter_id')
      .references('chapter.id')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('assessment_result', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table.integer('assessment_id').references('assessment.id');
    table
      .decimal('results')
      .notNullable()
      .defaultTo(0);
    table
      .decimal('percentage')
      .notNullable()
      .defaultTo(0);
  });

  await knex.schema.createTable('student_assessment_result', (table: TableBuilder) => {
    table.increments().primary();
    table.string('student_id_number').references('student.id_number').onDelete('CASCADE');
    table.integer('assessment_result_id').references('assessment_result.id').onDelete('CASCADE');
  });

  await knex.schema.createTable('subject_instructor', (table: TableBuilder) => {
    table.increments().primary();
    table
      .string('instructor_id_number')
      .unsigned()
      .references('instructor.id_number')
      .onDelete('SET NULL');
    table
      .integer('subject_id')
      .references('subject.id')
      .onDelete('SET NULL');
  });

  await knex.schema.createTable('student_subject', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table
      .string('student_id_number')
      .references('student.id_number')
      .onDelete('CASCADE');
    table
      .integer('subject_id')
      .references('subject.id')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('school', (table: TableBuilder) => {
    table
      .uuid('suuid')
      .primary()
      .notNullable();
    table.string('name').notNullable();
    table.boolean('active').defaultTo(false);
    table.date('registered_date').defaultTo(knex.fn.now());
  });

  // Should be composite key
  await knex.schema.createTable('school_instructor', (table: TableBuilder) => {
    table.uuid('school_id').references('school.suuid');
    table.string('instructorIdNumber').references('instructor.id_number');
    table.boolean('active').defaultTo(false);
  });
}

const tables = [
  'student',
  'instructor',
  'subject',
  'chapter',
  'assessment',
  'subject_instructor',
  'student_subject',
];

export async function down(knex: Knex) {
  tables.map(async function(table: string) {
    await knex.schema.dropTableIfExists(table);
  });
}
