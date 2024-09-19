document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "¿Cuál es el lenguaje de programación más popular en 2024?",
            a: "Python",
            b: "JavaScript",
            c: "Java",
            d: "C++",
            correct: "b"
        },
        {
            question: "¿Quién es el creador de Linux?",
            a: "Linus Torvalds",
            b: "Bill Gates",
            c: "Steve Jobs",
            d: "Mark Zuckerberg",
            correct: "a"
        },
        {
            question: "¿Qué significa HTML?",
            a: "Hyper Text Markup Language",
            b: "Hyperlinks and Text Markup Language",
            c: "Home Tool Markup Language",
            d: "Hyper Text Markdown Language",
            correct: "a"
        },
        {
            question: "¿En qué año se lanzó JavaScript?",
            a: "1996",
            b: "1995",
            c: "1994",
            d: "1993",
            correct: "b"
        }
    ];

    let currentQuiz = 0;
    let score = 0;
    let totalTime = 30; // Tiempo total en segundos
    let timeLeft = totalTime; // Tiempo restante

    const questionEl = document.getElementById('question');
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');
    const submitBtn = document.getElementById('submit');
    const resultEl = document.getElementById('result');
    const scoreEl = document.getElementById('score');
    const progressBar = document.querySelector('.progress-bar');

    function loadQuiz() {
        deselectAnswers();
        const currentQuizData = quizData[currentQuiz];
        questionEl.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
    }

    function deselectAnswers() {
        const answers = document.querySelectorAll('.answer');
        answers.forEach(answer => answer.checked = false);
    }

    function getSelected() {
        const answers = document.querySelectorAll('.answer');
        let answer = undefined;
        answers.forEach(answerEl => {
            if (answerEl.checked) {
                answer = answerEl.id;
            }
        });
        return answer;
    }

    function updateProgressBar() {
        timeLeft--;
        const progressPercentage = (timeLeft / totalTime) * 100;
        progressBar.style.width = progressPercentage + '%';
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }

    function endQuiz() {
        submitBtn.disabled = true; // Deshabilita el botón de confirmar
        resultEl.style.display = 'block'; // Muestra el div de puntuación
        scoreEl.innerText = `El tiempo ha terminado. Tu puntuación es: ${score} de ${quizData.length}`;
    }

    submitBtn.addEventListener('click', () => {
        const answer = getSelected();
        if (answer) {
            if (answer === quizData[currentQuiz].correct) {
                score++;
            }
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                quiz.style.display = 'none';
                resultEl.style.display = 'block';
                scoreEl.innerText = `Tu puntaje es ${score} de ${quizData.length}`;
                clearInterval(timer); // Detener el temporizador si el quiz termina antes
            }
        }
    });

    // Inicia el temporizador
    const timer = setInterval(updateProgressBar, 2000);

    // Cargar la primera pregunta cuando el DOM está completamente cargado
    loadQuiz();
});

document.getElementById('exitButton').addEventListener('click', function() {
    window.location.href = 'pagina-de-inicio.html'; // Redirige a la página de inicio
});