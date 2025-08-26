BEGIN;
SET search_path TO public;

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ESTUDIANTE', 'PROFESOR', 'ADMIN')),
	status VARCHAR(20) DEFAULT 'ACTIVO',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    teacher_id INT NOT NULL,
    price NUMERIC(10, 2) DEFAULT 0.00,
    image_url VARCHAR(500),
    language VARCHAR(50) DEFAULT 'Español',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_course_teacher FOREIGN KEY (teacher_id) REFERENCES "user"(user_id)
);

CREATE TABLE lesson (
    lesson_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    video_url TEXT,
    course_id INT NOT NULL,
    order_num INT DEFAULT 0,
    CONSTRAINT fk_lesson_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

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

CREATE TABLE exam (
    exam_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL UNIQUE,
    title VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_exam_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE question (
    question_id SERIAL PRIMARY KEY,
    exam_id INT NOT NULL,
    statement TEXT NOT NULL,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer VARCHAR(1) CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    CONSTRAINT fk_question_exam FOREIGN KEY (exam_id) REFERENCES exam(exam_id)
);

CREATE TABLE answer (
    answer_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    student_id INT NOT NULL,
    answer VARCHAR(1),
    is_correct BOOLEAN,
    CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES question(question_id),
    CONSTRAINT fk_answer_student FOREIGN KEY (student_id) REFERENCES "user"(user_id)
);

CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (status IN ('PENDIENTE', 'COMPLETADO', 'RECHAZADO')),
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    payment_method VARCHAR(50) CHECK (payment_method IN ('YAPE', 'TARJETA_CREDITO')),
    CONSTRAINT fk_payment_student FOREIGN KEY (student_id) REFERENCES "user"(user_id),
    CONSTRAINT fk_payment_course FOREIGN KEY (course_id) REFERENCES course(course_id)
);

COMMIT;