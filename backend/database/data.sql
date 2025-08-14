BEGIN;
SET search_path TO public;

INSERT INTO "user"(name, email, password_hash, role, status)
VALUES
  ('Teacher Test', 'teacher@test.com', '{noop}pass', 'PROFESOR', 'ACTIVO'),
  ('Alice Student', 'alice@test.com', '{noop}pass', 'ESTUDIANTE', 'ACTIVO'),
  ('Bob Student',   'bob@test.com',   '{noop}pass', 'ESTUDIANTE', 'ACTIVO')
ON CONFLICT (email) DO NOTHING;

INSERT INTO course(title, description, teacher_id, price)
VALUES (
  'Test Course',
  'Temporary course for QA',
  (SELECT user_id FROM "user" WHERE email = 'teacher@test.com'),
  0.00
)
ON CONFLICT DO NOTHING;

INSERT INTO exam(course_id, title)
VALUES (
  (SELECT course_id FROM course WHERE title = 'Test Course'),
  'Sample Exam'
)
ON CONFLICT DO NOTHING;

INSERT INTO question(exam_id, statement, option_a, option_b, option_c, option_d, correct_answer)
VALUES
  (
    (SELECT exam_id FROM exam WHERE title = 'Sample Exam'),
    'What is 2 + 2?',
    '3', '4', '5', '6', 'B'
  ),
  (
    (SELECT exam_id FROM exam WHERE title = 'Sample Exam'),
    'Capital of France?',
    'Berlin', 'Madrid', 'Paris', 'Rome', 'C'
  );

COMMIT;