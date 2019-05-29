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

  await knex.schema.createTable('teacher', (table: TableBuilder) => {
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

  await knex.schema.createTable(
    'student_assessment_result',
    (table: TableBuilder) => {
      table
        .increments()
        .unsigned()
        .primary();
      table
        .string('student_id_number')
        .references('student.id_number')
        .onDelete('CASCADE');
      table
        .integer('assessment_id')
        .references('assessment.id')
        .onDelete('CASCADE');
      table.integer('result');
    }
  );

  await knex.schema.createTable('subject_teacher', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .string('teacher_id_number')
      .unsigned()
      .references('teacher.id_number')
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
      .increments()
      .primary()
      .notNullable();
    table.string('name').notNullable();
    table.boolean('active').defaultTo(false);
    table.date('registered_date').defaultTo(knex.fn.now());
  });

  // Should be composite key
  await knex.schema.createTable('school_teacher', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table.increments('school_id').references('school.id');
    table.string('teacher_id_number').references('teacher.id_number');
    table.boolean('active').defaultTo(false);
  });

  // Grade should belong to a school
  await knex.schema.createTable('grade', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .string('name')
      .defaultTo('8')
      .unsigned();
  });

  await knex.schema.createTable('school_grade', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .increments('school_id')
      .references('school.id')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('grade_id')
      .references('grade.id')
      .onDelete('CASCADE')
      .notNullable();
  });

  // TODO: Rethink this table and later add objection model and seeds for it
  await knex.schema.createTable('subject_grade', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('subject_id')
      .references('subject.id')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('grade_id')
      .references('grade.id')
      .onDelete('CASCADE')
      .notNullable();
  });
}

const tables = [
  'student',
  'teacher',
  'subject',
  'chapter',
  'assessment',
  'assessment_chapter',
  'student_assessment_result',
  'student_subject',
  'school',
  'school_teacher',
  'subject_teacher',
  'grade',
  'school_grade',
  'subject_grade',
];

export async function down(knex: Knex) {
  for (let i = 0; i < tables.length; i++) {
    await knex.raw(`
      DROP TABLE IF EXISTS ${tables[i]} CASCADE
    `);
  }
}
