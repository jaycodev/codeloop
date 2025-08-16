SET search_path TO public;

BEGIN;

INSERT INTO "user" (name, email, password_hash, role, status) VALUES
('Ana María García', 'ana.garcia@email.com', '$2b$12$hash1', 'ESTUDIANTE', 'ACTIVO'),
('Carlos Eduardo López', 'carlos.lopez@email.com', '$2b$12$hash2', 'ESTUDIANTE', 'ACTIVO'),
('María José Rodríguez', 'maria.rodriguez@email.com', '$2b$12$hash3', 'ESTUDIANTE', 'ACTIVO'),
('Luis Fernando Torres', 'luis.torres@email.com', '$2b$12$hash4', 'ESTUDIANTE', 'ACTIVO'),
('Carmen Elena Silva', 'carmen.silva@email.com', '$2b$12$hash5', 'ESTUDIANTE', 'ACTIVO'),
('José Antonio Ruiz', 'jose.ruiz@email.com', '$2b$12$hash6', 'ESTUDIANTE', 'ACTIVO'),
('Laura Patricia Mendoza', 'laura.mendoza@email.com', '$2b$12$hash7', 'ESTUDIANTE', 'ACTIVO'),
('Diego Alejandro Vega', 'diego.vega@email.com', '$2b$12$hash8', 'ESTUDIANTE', 'ACTIVO'),
('Isabella Sofía Cruz', 'isabella.cruz@email.com', '$2b$12$hash9', 'ESTUDIANTE', 'ACTIVO'),
('Roberto Carlos Herrera', 'roberto.herrera@email.com', '$2b$12$hash10', 'ESTUDIANTE', 'ACTIVO'),
('Valentina Nicole Morales', 'valentina.morales@email.com', '$2b$12$hash11', 'ESTUDIANTE', 'ACTIVO'),
('Sebastián David Castro', 'sebastian.castro@email.com', '$2b$12$hash12', 'ESTUDIANTE', 'ACTIVO'),
('Camila Andrea Jiménez', 'camila.jimenez@email.com', '$2b$12$hash13', 'ESTUDIANTE', 'ACTIVO'),
('Daniel Eduardo Vargas', 'daniel.vargas@email.com', '$2b$12$hash14', 'ESTUDIANTE', 'ACTIVO'),
('Sofía Alejandra Ramos', 'sofia.ramos@email.com', '$2b$12$hash15', 'ESTUDIANTE', 'ACTIVO'),
('Dr. Miguel Ángel Fernández', 'miguel.fernandez@profesor.com', '$2b$12$profhash1', 'PROFESOR', 'ACTIVO'),
('Dra. Elena Victoria Sánchez', 'elena.sanchez@profesor.com', '$2b$12$profhash2', 'PROFESOR', 'ACTIVO'),
('Prof. Ricardo Andrés Gómez', 'ricardo.gomez@profesor.com', '$2b$12$profhash3', 'PROFESOR', 'ACTIVO'),
('Dra. Patricia Isabel Martín', 'patricia.martin@profesor.com', '$2b$12$profhash4', 'PROFESOR', 'ACTIVO'),
('Prof. Alejandro José Díaz', 'alejandro.diaz@profesor.com', '$2b$12$profhash5', 'PROFESOR', 'ACTIVO'),
('Admin Principal', 'admin@sistema.com', '$2b$12$adminhash1', 'ADMIN', 'ACTIVO');

INSERT INTO course (title, description, teacher_id, price) VALUES
('Introducción a la Programación con Python', 'Curso básico para aprender los fundamentos de Python desde cero', 16, 150.00),
('Desarrollo Web con JavaScript', 'Aprende a crear aplicaciones web modernas con JavaScript', 17, 200.00),
('Base de Datos con PostgreSQL', 'Domina el diseño y manejo de bases de datos relacionales', 18, 180.00),
('Marketing Digital Estratégico', 'Estrategias efectivas para el marketing en redes sociales', 19, 120.00),
('Diseño Gráfico con Adobe', 'Curso completo de diseño usando herramientas profesionales', 20, 250.00),
('Excel Avanzado para Empresas', 'Análisis de datos y reportes empresariales con Excel', 16, 100.00),
('Fotografía Digital Profesional', 'Técnicas avanzadas de fotografía y edición', 17, 300.00),
('Gestión de Proyectos Ágiles', 'Metodologías Scrum y Kanban para gestión efectiva', 18, 160.00),
('Inteligencia Artificial Básica', 'Introducción a Machine Learning y Deep Learning', 19, 400.00),
('Contabilidad para No Contadores', 'Fundamentos contables para emprendedores', 20, 90.00),
('Inglés de Negocios Intermedio', 'Inglés especializado para el mundo empresarial', 16, 110.00),
('Cocina Internacional Gourmet', 'Técnicas culinarias de diferentes países', 17, 80.00),
('Yoga y Meditación Mindfulness', 'Bienestar físico y mental a través del yoga', 18, 70.00),
('Emprendimiento Digital', 'Cómo crear y escalar tu negocio online', 19, 220.00),
('Finanzas Personales Inteligentes', 'Manejo efectivo del dinero y inversiones básicas', 20, 130.00);

INSERT INTO lesson (title, content, video_url, course_id, order_num) VALUES
('¿Qué es Python?', 'Introducción al lenguaje Python y sus aplicaciones', 'https://video.com/python1', 1, 1),
('Instalación y configuración', 'Cómo instalar Python en tu computadora', 'https://video.com/python2', 1, 2),
('Variables y tipos de datos', 'Aprende sobre strings, números y booleanos', 'https://video.com/python3', 1, 3),
('Estructuras de control', 'If, else, elif y bucles en Python', 'https://video.com/python4', 1, 4),
('Fundamentos de JavaScript', 'Sintaxis básica y conceptos fundamentales', 'https://video.com/js1', 2, 1),
('DOM y manipulación', 'Cómo interactuar con elementos HTML', 'https://video.com/js2', 2, 2),
('Eventos en JavaScript', 'Manejo de clicks, formularios y más', 'https://video.com/js3', 2, 3),
('AJAX y APIs', 'Comunicación con servidores externos', 'https://video.com/js4', 2, 4),
('Introducción a bases de datos', 'Conceptos básicos de bases relacionales', 'https://video.com/pg1', 3, 1),
('Instalación de PostgreSQL', 'Setup completo del servidor de BD', 'https://video.com/pg2', 3, 2),
('Creación de tablas', 'DDL y estructura de datos', 'https://video.com/pg3', 3, 3),
('Consultas SELECT básicas', 'Obtener información de las tablas', 'https://video.com/pg4', 3, 4),
('Funciones en Python', 'Creación y uso de funciones personalizadas', 'https://video.com/python5', 1, 5),
('Frameworks de JavaScript', 'Introducción a React y Vue.js', 'https://video.com/js5', 2, 5),
('Optimización de consultas', 'Índices y performance en PostgreSQL', 'https://video.com/pg5', 3, 5);

INSERT INTO enrollment (student_id, course_id, progress, status) VALUES
(1, 1, 75.50, 'ACTIVO'),
(2, 1, 45.20, 'ACTIVO'),
(3, 2, 90.10, 'ACTIVO'),
(4, 2, 30.00, 'ACTIVO'),
(5, 3, 60.75, 'ACTIVO'),
(6, 4, 85.30, 'ACTIVO'),
(7, 5, 25.60, 'ACTIVO'),
(8, 1, 95.80, 'ACTIVO'),
(9, 6, 40.15, 'ACTIVO'),
(10, 7, 70.25, 'ACTIVO'),
(11, 8, 55.90, 'ACTIVO'),
(12, 9, 15.40, 'ACTIVO'),
(13, 10, 80.65, 'ACTIVO'),
(14, 11, 35.85, 'ACTIVO'),
(15, 12, 92.15, 'ACTIVO');

INSERT INTO exam (course_id, title) VALUES
(1, 'Examen Final de Python Básico'),
(2, 'Evaluación JavaScript Web'),
(3, 'Examen PostgreSQL Fundamental'),
(4, 'Test Marketing Digital'),
(5, 'Evaluación Diseño Gráfico'),
(6, 'Examen Excel Avanzado'),
(7, 'Test Fotografía Digital'),
(8, 'Evaluación Gestión Ágil'),
(9, 'Examen IA Básica'),
(10, 'Test Contabilidad Básica'),
(11, 'Evaluación Inglés de Negocios'),
(12, 'Examen Cocina Internacional'),
(13, 'Test Yoga y Meditación'),
(14, 'Evaluación Emprendimiento'),
(15, 'Examen Finanzas Personales');

INSERT INTO question (exam_id, statement, option_a, option_b, option_c, option_d, correct_answer) VALUES
(1, '¿Cuál es la forma correcta de declarar una variable en Python?', 'var nombre = "Juan"', 'nombre = "Juan"', 'string nombre = "Juan"', 'declare nombre = "Juan"', 'B'),
(1, '¿Qué tipo de dato es "True" en Python?', 'String', 'Integer', 'Boolean', 'Float', 'C'),
(1, '¿Cuál es la función para mostrar texto en pantalla?', 'echo()', 'print()', 'display()', 'show()', 'B'),
(2, '¿Cómo se declara una función en JavaScript?', 'function nombre() {}', 'def nombre() {}', 'func nombre() {}', 'method nombre() {}', 'A'),
(2, '¿Qué significa DOM?', 'Data Object Model', 'Document Object Model', 'Dynamic Object Model', 'Digital Object Model', 'B'),
(2, '¿Cuál es el operador de igualdad estricta en JS?', '==', '===', '=', '!=', 'B'),
(3, '¿Cuál es el comando para crear una tabla?', 'MAKE TABLE', 'NEW TABLE', 'CREATE TABLE', 'ADD TABLE', 'C'),
(3, '¿Qué tipo de dato usa PostgreSQL para números decimales?', 'FLOAT', 'DECIMAL', 'NUMERIC', 'REAL', 'C'),
(3, '¿Cuál es la cláusula para filtrar registros?', 'FILTER', 'WHERE', 'HAVING', 'SELECT', 'B'),
(4, '¿Qué es el SEO en marketing digital?', 'Social Engine Optimization', 'Search Engine Optimization', 'Secure Email Operation', 'System Error Operation', 'B'),
(5, '¿Cuál es el formato de imagen con transparencia?', 'JPEG', 'BMP', 'PNG', 'GIF', 'C'),
(6, '¿Qué función suma un rango de celdas en Excel?', 'ADD()', 'SUMA()', 'TOTAL()', 'COUNT()', 'B'),
(7, '¿Qué significa ISO en fotografía?', 'Sensibilidad a la luz', 'Velocidad del obturador', 'Apertura del diafragma', 'Formato de imagen', 'A'),
(8, '¿Cuánto dura un sprint típico en Scrum?', '1 semana', '2-4 semanas', '1 mes', '6 semanas', 'B'),
(9, '¿Qué es Machine Learning?', 'Programación manual', 'Aprendizaje automático', 'Base de datos', 'Red social', 'B');

INSERT INTO answer (question_id, student_id, answer, is_correct) VALUES
(1, 1, 'B', true),
(2, 1, 'C', true),
(3, 1, 'B', true),
(1, 2, 'A', false),
(2, 2, 'C', true),
(3, 2, 'A', false),
(4, 3, 'A', true),
(5, 3, 'B', true),
(6, 3, 'A', false),
(7, 4, 'A', true),
(8, 4, 'B', true),
(9, 4, 'C', false),
(10, 5, 'B', true),
(11, 5, 'C', true),
(12, 6, 'B', true);

INSERT INTO payment (student_id, course_id, amount, status, payment_method) VALUES
(1, 1, 150.00, 'COMPLETADO', 'TARJETA_CREDITO'),
(2, 1, 150.00, 'COMPLETADO', 'YAPE'),
(3, 2, 200.00, 'COMPLETADO', 'TARJETA_CREDITO'),
(4, 2, 200.00, 'PENDIENTE', 'YAPE'),
(5, 3, 180.00, 'COMPLETADO', 'TARJETA_CREDITO'),
(6, 4, 120.00, 'COMPLETADO', 'YAPE'),
(7, 5, 250.00, 'RECHAZADO', 'TARJETA_CREDITO'),
(8, 1, 150.00, 'COMPLETADO', 'YAPE'),
(9, 6, 100.00, 'COMPLETADO', 'TARJETA_CREDITO'),
(10, 7, 300.00, 'PENDIENTE', 'TARJETA_CREDITO'),
(11, 8, 160.00, 'COMPLETADO', 'YAPE'),
(12, 9, 400.00, 'COMPLETADO', 'TARJETA_CREDITO'),
(13, 10, 90.00, 'COMPLETADO', 'YAPE'),
(14, 11, 110.00, 'PENDIENTE', 'YAPE'),
(15, 12, 80.00, 'COMPLETADO', 'TARJETA_CREDITO');

COMMIT;