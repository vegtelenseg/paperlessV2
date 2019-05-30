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
    table.string('contact_mobile');
    table
      .integer('grade')
      .notNullable()
      .defaultTo(8);
    table.date('enrolment_date').defaultTo(knex.fn.now());
    table.boolean('active').defaultTo(false);
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
    table.date('employment_date').defaultTo(knex.fn.now());
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
    table
      .integer('subject_id')
      .references('subject.id')
      .notNullable()
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('chapter', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table.string('name', 128).notNullable();
    table.string('description');
    table.decimal('contribution').notNullable();
  });

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
      .notNullable()
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
    table.integer('school_id').references('school.id');
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

  await knex.schema.createTable(
    'student_assessment_chapter',
    (table: TableBuilder) => {
      table
        .increments()
        .unsigned()
        .primary();
      table
        .integer('assessment_id')
        .references('assessment.id')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('chapter_id')
        .references('chapter.id')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('student_id')
        .references('student.id')
        .notNullable()
        .onDelete('CASCADE');
      table.integer('chapter_mark').defaultTo(0);
    }
  );

  await knex.schema.createTable('role', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table.enum('role', ['PRINCIPAL', 'TEACHER', 'ADMIN']);
  });

  await knex.schema.createTable('users', (table: TableBuilder) => {
    table
      .increments()
      .primary()
      .unsigned();
    table.string('password').notNullable();
    table
      .string('id_number')
      .notNullable()
      .unique();
    table.string('contact_mail').notNullable();
    table
      .integer('school_id')
      .references('school.id')
      .onDelete('CASCADE');
    table
      .integer('role_id')
      .references('role.id')
      .onDelete('CASCADE');
  });
}

const tables = [
  'student',
  'teacher',
  'subject',
  'chapter',
  'assessment',
  'student_subject',
  'school',
  'school_teacher',
  'subject_teacher',
  'grade',
  'school_grade',
  'subject_grade',
  'student_assessment_chapter',
  'province',
  'users',
  'role',
];

export async function down(knex: Knex) {
  for (let i = 0; i < tables.length; i++) {
    await knex.raw(`
      DROP TABLE IF EXISTS ${tables[i]} CASCADE
    `);
  }
}
