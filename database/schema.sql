BEGIN;
SET search_path TO public;

-- Tabla base de usuarios
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ESTUDIANTE', 'PROFESOR', 'ADMIN')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de cursos
CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    teacher_id INT NOT NULL,
    price NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_course_teacher FOREIGN KEY (teacher_id) REFERENCES "user"(user_id)
);

-- Tabla de lecciones
CREATE TABLE lesson (
    lesson_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    video_url TEXT,
    course_id INT NOT NULL,
    order_num INT DEFAULT 0,
    CONSTRAINT fk_lesson_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Tabla de inscripciones de estudiantes a cursos
CREATE TABLE enrollment (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date TIMESTAMPTZ DEFAULT NOW(),
    progress NUMERIC(5, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'ACTIVO',
    CONSTRAINT uq_enrollment_student_course UNIQUE (student_id, course_id),
    CONSTRAINT fk_enrollment_student FOREIGN KEY (student_id) REFERENCES "user"(user_id),
    CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Tabla de exámenes
CREATE TABLE exam (
    exam_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL UNIQUE,
    title VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_exam_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Tabla de preguntas
CREATE TABLE question (
    question_id SERIAL PRIMARY KEY,
    exam_id INT NOT NULL,
    statement TEXT NOT NULL,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer CHAR(1) CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    CONSTRAINT fk_question_exam FOREIGN KEY (exam_id) REFERENCES exam(exam_id)
);

-- Tabla de respuestas de estudiantes a exámenes
CREATE TABLE answer (
    answer_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    student_id INT NOT NULL,
    answer CHAR(1),
    is_correct BOOLEAN,
    CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES question(question_id),
    CONSTRAINT fk_answer_student FOREIGN KEY (student_id) REFERENCES "user"(user_id)
);

-- Tabla de pagos (simulado o real)
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDIENTE', -- COMPLETADO, RECHAZADO
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    payment_method VARCHAR(50), -- YAPE, STRIPE, MERCADO_PAGO, etc.
    CONSTRAINT fk_payment_student FOREIGN KEY (student_id) REFERENCES "user"(user_id),
    CONSTRAINT fk_payment_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Tabla de archivos de comprobante de pago Yape (opcional)
CREATE TABLE yape_receipt (
    yape_receipt_id SERIAL PRIMARY KEY,
    payment_id INT NOT NULL,
    file_path TEXT NOT NULL,
    operation_code VARCHAR(50),
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_yape_receipt_payment FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
);

COMMIT;