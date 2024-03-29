import Knex, {TableBuilder} from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('student', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table.string('id_number').notNullable();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.date('birth_date').notNullable();
    table.string('gender', 1).notNullable();
    table.string('contact_phone');
    table.string('contact_mail');
    table.string('contact_mobile');
    table
      .integer('grade')
      .notNullable()
      .defaultTo(8);
    table.date('enrolment_date').defaultTo(knex.fn.now());
    table.boolean('active').defaultTo(false);
  });

  await knex.schema.createTable('subject', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table.string('name', 128).notNullable();
    table.string('commitment');
    table.string('description');
  });

  await knex.schema.createTable('teacher', (table: TableBuilder) => {
    // id === idNumber of a teacher.
    // We do it this way because ojection
    //returns back id field upon pushing data into DB
    table
      .increments()
      .unsigned()
      .primary();
    table.string('id_number').notNullable();
    table.string('first_name', 128).notNullable();
    table.string('last_name', 128).notNullable();
    table.string('title', 10);
    table.date('birth_date').notNullable();
    table.string('gender', 1).notNullable();
    table.string('contact_phone');
    table.string('contact_mobile');
    table.date('employment_date').defaultTo(knex.fn.now());
    table.boolean('active').defaultTo(false);
  });

  await knex.schema.createTable('subject_teacher', (table) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('subject_id')
      .references('subject.id')
      .onDelete('CASCADE');
    table
      .integer('teacher_id')
      .references('teacher.id')
      .onDelete('CASCADE');
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
    table.integer('max_score');
  });

  await knex.schema.createTable('assessment', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table
      .integer('total_marks')
      .unsigned()
      .notNullable();
    table.string('kind').notNullable();
    table.date('start_date').defaultTo(knex.fn.now());
    table.date('end_date');
  });

  await knex.schema.createTable('assessment_chapter', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('assessment_id')
      .unsigned()
      .references('assessment.id')
      .onDelete('CASCADE');
    table
      .integer('chapter_id')
      .references('chapter.id')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('student_result', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('assessment_chapter_id')
      .unsigned()
      .references('assessment_chapter.id')
      .onDelete('CASCADE');
    table.integer('student_id').references('student.id');
    table.integer('score').defaultTo(0);
  });

  await knex.schema.createTable('subject_assessment', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('subject_id')
      .unsigned()
      .references('subject.id')
      .onDelete('CASCADE');
    table
      .integer('assessment_id')
      .references('assessment.id')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('student_subject', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table
      .integer('student_id')
      .references('student.id')
      .onDelete('CASCADE');
    table
      .integer('subject_id')
      .references('subject.id')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('province', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .primary();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('school', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .notNullable();
    table
      .integer('province_id')
      .references('province.id')
      .onDelete('CASCADE');
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
    table
      .integer('school_id')
      .references('school.id')
      .onDelete('CASCADE');
    table
      .integer('teacher_id')
      .references('teacher.id')
      .onDelete('CASCADE');
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
      .integer('school_id')
      .references('school.id')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('grade_id')
      .references('grade.id')
      .onDelete('CASCADE')
      .notNullable();
  });

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

  await knex.schema.createTable('teacher_assessment', (table) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('teacher_id')
      .references('teacher.id')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('assessment_id')
      .references('assessment.id')
      .onDelete('CASCADE')
      .notNullable();
  });

  await knex.schema.createTable('teacher_grade', (table) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('teacher_id')
      .references('teacher.id')
      .onDelete('CASCADE');
    table
      .integer('grade_id')
      .references('grade.id')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('student_grade', (table) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('student_id')
      .references('student.id')
      .onDelete('CASCADE');
    table
      .integer('grade_id')
      .references('grade.id')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('school_student', (table) => {
    table
      .increments()
      .unsigned()
      .primary();
    table
      .integer('student_id')
      .references('student.id')
      .onDelete('CASCADE');
    table
      .integer('school_id')
      .references('school.id')
      .onDelete('CASCADE');
    table.boolean('is_active').defaultTo(false);
  });
}

const tables = [
  'student',
  'teacher',
  'subject',
  'chapter',
  'assessment',
  'assessment_chapter',
  'student_subject',
  'student_result',
  'subject_teacher',
  'school',
  'school_teacher',
  'subject_assessment',
  'teacher_assessment',
  'student_result',
  'grade',
  'school_grade',
  'subject_grade',
  'province',
  'teacher_grade',
  'student_grade',
  'school_student',
];

export async function down(knex: Knex) {
  for (let i = 0; i < tables.length; i++) {
    await knex.raw(`
      DROP TABLE IF EXISTS ${tables[i]} CASCADE
    `);
  }
}
