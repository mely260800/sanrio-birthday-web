function entrarAFiesta() {

    document.querySelector(
        ".quiz-section"
    ).style.display = "block";

    document.querySelector(
        ".letter-section"
    ).style.display = "block";

    document.querySelector(
        ".gifts-section"
    ).style.display = "block";

    const select =
        document.getElementById(
            "guestSelect"
    );

    const nombre =
        select.value;

    if (!nombre) {

        alert(
            "🌸 Elige tu nombre primero 💕"
        );

        return;

    }

    localStorage.setItem(
        "sanrioGuest",
        nombre
    );

    const welcomeTitle =
    document.querySelector(
        ".welcome h1"
    );

    welcomeTitle.innerHTML = `
        💖 ¡Hola ${capitalizar(nombre)}! 💖
    `;

    const quizSection =
        document.querySelector(
            ".quiz-section"
        );

    quizSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ==========================================
   QUIZ COLLAPSIBLE
========================================== */

const quizToggle = document.getElementById("quizToggle");
const quizContent = document.getElementById("quizContent");

quizToggle.addEventListener("click", () => {

    quizContent.classList.toggle("open");
    quizToggle.classList.toggle("active");

});

/* ==========================================
   SLIDER DEL QUIZ
========================================== */

const questions =
    document.querySelectorAll(".question");

const prevButton =
    document.getElementById("prevQuestion");

const nextButton =
    document.getElementById("nextQuestion");

const counter =
    document.getElementById("questionCounter");

const progressBar =
    document.getElementById("progressBar");

const resultButton =
    document.getElementById("resultButton");


let currentQuestion = 0;


/* Mostrar primera pregunta */

mostrarPregunta();


function mostrarPregunta() {

    questions.forEach((question, index) => {

        question.classList.toggle(
            "active",
            index === currentQuestion
        );

    });


    /* Contador */

    counter.textContent =
        `${currentQuestion + 1} de ${questions.length}`;


    /* Barra de progreso */

    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    /* Botón anterior */

    prevButton.disabled =
        currentQuestion === 0;


    /* Última pregunta */

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.style.display = "none";

        resultButton.style.display = "block";

    } else {

        nextButton.style.display = "block";

        resultButton.style.display = "none";

    }

}


/* ==========================================
   SIGUIENTE
========================================== */

nextButton.addEventListener(
    "click",
    () => {

        const current =
            questions[currentQuestion];

        const answer =
            current.querySelector(
                'input[type="radio"]:checked'
            );


        if (!answer) {

            current.classList.add(
                "shake-question"
            );


            setTimeout(() => {

                current.classList.remove(
                    "shake-question"
                );

            }, 500);


            return;

        }


        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            mostrarPregunta();

        }

    }
);


/* ==========================================
   ANTERIOR
========================================== */

prevButton.addEventListener(
    "click",
    () => {

        if (currentQuestion > 0) {

            currentQuestion--;

            mostrarPregunta();

        }

    }
);

function guardarResultadoQuiz(personaje) {

    const nombre =
        localStorage.getItem(
            "sanrioGuest"
        );


    /*
     * Si todavía no sabemos quién es,
     * solo guardamos el personaje
     * temporalmente.
     */

    if (!nombre) {

        return;

    }


    let resultados =
        JSON.parse(
            localStorage.getItem(
                "sanrioQuizResults"
            )
        ) || {};


    resultados[nombre] =
        personaje;


    localStorage.setItem(
        "sanrioQuizResults",
        JSON.stringify(resultados)
    );

}


/* ==========================================
   MOSTRAR RESULTADO
========================================== */

function mostrarResultado() {

    const respuestas = document.querySelectorAll(
        'input[type="radio"]:checked'
    );


    /* Verificar que respondió todo */

    if (respuestas.length < 8) {

        alert(
            "💕 ¡Faltan algunas preguntitas! Responde todas para descubrir tu personaje."
        );

        return;

    }


    /* ======================================
       PUNTAJES
    ====================================== */

    let puntajes = {

        kitty: 0,
        mymelody: 0,
        kuromi: 0,
        cinnamoroll: 0,
        piano: 0,
        pompompurin: 0,
        pochacco: 0,
        chococat: 0

    };


    respuestas.forEach(respuesta => {

        puntajes[respuesta.value]++;

    });


    /* ======================================
       BUSCAR GANADOR
    ====================================== */

    const maximo =
        Math.max(
            ...Object.values(puntajes)
        );


    const empatados =
        Object.keys(puntajes)
            .filter(
                personaje =>
                    puntajes[personaje] === maximo
            );


    const personaje =
        empatados[
            Math.floor(
                Math.random() *
                empatados.length
            )
        ];


    /* ======================================
       INFORMACIÓN DE PERSONAJES
    ====================================== */

    const datos = {

        kitty: {

            nombre: "Hello Kitty",

            imagen: "img/hello-kitty.png",

            texto:
                "Eres una persona amable, alegre y cariñosa. Te encanta compartir momentos especiales con las personas que quieres. 💕"

        },


        mymelody: {

            nombre: "My Melody",

            imagen: "img/my-melody.png",

            texto:
                "Eres dulce, tierna y tienes un corazón enorme. Te encanta hacer sentir especiales a las personas que están a tu alrededor. 🌸"

        },


        kuromi: {

            nombre: "Kuromi",

            imagen: "img/kuromi.png",

            texto:
                "Tienes una personalidad divertida, aventurera y un poquito traviesa. Siempre haces que las cosas sean más interesantes. 🖤"

        },


        cinnamoroll: {

            nombre: "Cinnamoroll",

            imagen: "img/cinnamoroll.png",

            texto:
                "Eres tranquilo, soñador y muy cariñoso. Disfrutas de los pequeños momentos y tienes una energía muy dulce. ☁️"

        },


        piano: {

            nombre: "My Sweet Piano",

            imagen: "img/my-sweet-piano.png",

            texto:
                "Eres sensible, dulce y muy tierna. Te gusta la tranquilidad y tienes una forma muy especial de demostrar cariño. 🎀"

        },


        pompompurin: {

            nombre: "Pompompurin",

            imagen: "img/pompompurin.png",

            texto:
                "Eres alegre, relajado y sabes disfrutar de las cosas buenas de la vida. ¡Probablemente nunca rechazarías un postrecito! 🍮"

        },


        pochacco: {

            nombre: "Pochacco",

            imagen: "img/pochacco.png",

            texto:
                "Eres energético, alegre y siempre estás listo para hacer algo divertido. ¡Contigo es imposible aburrirse! 🐶"

        },


        chococat: {

            nombre: "Chococat",

            imagen: "img/chococat.png",

            texto:
                "Eres curioso, inteligente y creativo. Siempre quieres descubrir cosas nuevas y probablemente tienes muchas ideas interesantes. 🐱"

        }

    };

    guardarResultadoQuiz(personaje);

    const resultado = document.getElementById("resultado");


    /* ======================================
       EFECTO DRAMÁTICO
    ====================================== */

    lanzarEfectos();


    /*
       Esperamos un poquito para que
       primero aparezcan los efectos.
    */

    setTimeout(() => {

        resultado.innerHTML = `

            <div class="result-card">

                <div class="quiz-sparkles">
                    ✨ ✨ ✨
                </div>

                <h2>
                    💕 ¡Tu personaje es...! 💕
                </h2>

                <img
                    src="${datos[personaje].imagen}"
                    alt="${datos[personaje].nombre}"
                    onerror="this.style.display='none'"
                >

                <h2 class="character-name ${personaje}">
                    ${datos[personaje].nombre}
                </h2>

                <p>
                    ${datos[personaje].texto}
                </p>

                <div class="welcome-hearts">
                    ♡ 💗 ♡ 💗 ♡
                </div>

                <button
                    type="button"
                    class="retry-button"
                    onclick="reiniciarQuiz()"
                >
                    🎀 Volver a intentarlo
                </button>

            </div>

        `;


        /* Llevar al resultado */

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


    }, 900);

}


/* ==========================================
   EFECTOS MÁGICOS
========================================== */

function lanzarEfectos() {

    const effects =
        document.getElementById("magic-effects");


    /* Flash */

    const flash =
        document.createElement("div");

    flash.className = "magic-flash";

    effects.appendChild(flash);


    setTimeout(() => {

        flash.remove();

    }, 800);



    /* Partículas */

    const particles = [

        "✨",
        "💖",
        "💕",
        "🌸",
        "⭐",
        "🎀",
        "💗",
        "🌷"

    ];


    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("span");


        particle.className =
            "magic-particle";


        particle.textContent =
            particles[
                Math.floor(
                    Math.random() *
                    particles.length
                )
            ];


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.top =
            60 + Math.random() * 40 + "%";


        particle.style.animationDelay =
            Math.random() * 0.8 + "s";


        particle.style.fontSize =
            15 + Math.random() * 25 + "px";


        effects.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 3500);

    }

}

function reiniciarQuiz() {

    const formulario =
        document.getElementById("quizForm");

    const resultado =
        document.getElementById("resultado");

    // Limpiar todas las respuestas
    formulario.reset();

    // Limpiar resultado
    resultado.innerHTML = "";

    // Volver a la primera pregunta
    currentQuestion = 0;

    // Actualizar slider, contador y barra
    mostrarPregunta();

    // Volver suavemente al inicio del quiz
    formulario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

/* ==========================================
   REGALITOS
========================================== */

/* ==========================================
   INVITADOS
========================================== */

const invitados = [
    "denisse",
    "luis",
    "diego",
    "erick",
    "jairo",
    "maria",
    "natalia",
    "ximena",
    "alessandra"
];

const giftMessages = {

    1:
        "🍬 ¡Te ganaste un dulce adicional! Acércate para recogerlo. 💕",

    2:
        "🎤 ¡Tú eliges la próxima canción a cantar! ¡Prepárate para brillar! ✨",

    3:
        "🎤 ¡Dúo sorpresa!<br><br>" +
        "Elige a alguien para cantar contigo la próxima canción. 💕<br><br>" +
        "⚠️ Al elegir este premio, ambas personas deberán aceptar el desafío.<br>" +
        "No hay escapatoria. 😂🎤"
};


function abrirRegalo(numero) {

    /*
     * Obtener el nombre del invitado
     */

    const nombre =
        localStorage.getItem("sanrioGuest");


    /*
     * Si todavía no ha ingresado su nombre,
     * no permitir escoger regalo.
     */

    if (!nombre) {

        const message =
            document.getElementById(
                "gift-message"
            );

        message.innerHTML =
        giftMessages[numero];

        return;

    }


    /*
     * Recuperar regalos elegidos
     */

    let regalosElegidos =
        JSON.parse(
            localStorage.getItem(
                "sanrioGifts"
            )
        ) || {};


    /*
     * Comprobar si ESTE invitado
     * ya eligió un regalo.
     */

    if (regalosElegidos[nombre]) {

        mostrarRegaloYaElegido(
            regalosElegidos[nombre]
        );

        return;

    }


    /*
     * Guardar elección
     */

    regalosElegidos[nombre] = numero;


    localStorage.setItem(
        "sanrioGifts",
        JSON.stringify(regalosElegidos)
    );


    /*
     * Obtener cajas
     */

    const boxes =
        document.querySelectorAll(
            ".gift-box"
        );


    const box =
        boxes[numero - 1];


    const message =
        document.getElementById(
            "gift-message"
        );


    /*
     * Abrir regalo elegido
     */

    box.classList.add("opened");


    /*
     * Bloquear las demás cajas
     */

    boxes.forEach((gift, index) => {

        if (index !== numero - 1) {

            gift.classList.add("locked");

        }

    });


    /*
     * Mostrar mensaje
     */

    setTimeout(() => {

        message.innerHTML = `

            ✨ ${giftMessages[numero]}

            <br><br>

            <small>
                🎀 Este es tu único regalito.
                ¡Disfrútalo mucho!
            </small>

        `;


        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 500);


    /*
     * Efectos especiales
     */

    lanzarEfectos();

}

function restaurarRegalo() {

    const nombre =
        localStorage.getItem("sanrioGuest");


    /*
     * Si todavía no sabemos quién es,
     * no hacemos nada.
     */

    if (!nombre) {

        return;

    }


    /*
     * Recuperar elecciones
     */

    const regalosElegidos =
        JSON.parse(
            localStorage.getItem(
                "sanrioGifts"
            )
        ) || {};


    /*
     * Buscar regalo de este invitado
     */

    const regaloElegido =
        regalosElegidos[nombre];


    /*
     * Si todavía no eligió,
     * las cajas siguen disponibles.
     */

    if (!regaloElegido) {

        return;

    }


    /*
     * Obtener cajas
     */

    const boxes =
        document.querySelectorAll(
            ".gift-box"
        );


    /*
     * Restaurar estado
     */

    boxes.forEach((gift, index) => {

        if (index === regaloElegido - 1) {

            gift.classList.add("opened");

        } else {

            gift.classList.add("locked");

        }

    });


    /*
     * Mostrar mensaje
     */

    const message =
        document.getElementById(
            "gift-message"
        );


    message.innerHTML = `

        🔒💕 Ya elegiste tu regalito.

        <br><br>

        Tu sorpresa es:

        <strong>
            ${obtenerNombreRegalo(
                regaloElegido
            )}
        </strong>

        <br><br>

        ✨ ¡Disfrútalo mucho! ✨

    `;

}

function mostrarRegaloYaElegido(numero) {

    const message =
        document.getElementById(
            "gift-message"
        );


    message.innerHTML = `

        🔒💕 Ya elegiste tu regalito.

        <br><br>

        Escogiste:

        <strong>
            ${obtenerNombreRegalo(numero)}
        </strong>

        <br><br>

        ✨ ¡Tu sorpresa ya está reservada para ti! ✨

    `;


    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

function obtenerNombreRegalo(numero) {

    const nombres = {

        1:
            "🍬 El dulce adicional",

        2:
            "🎤 Elegir la próxima canción",

        3:
            "💕 El dúo sorpresa"

    };


    return nombres[numero];

}

/* ==========================================
   CARTA PERSONALIZADA
========================================== */


const guestMessages = {

    "denisse":
        "Denisse, gracias por acompañarme en este día tan especial. 💗 Espero que cantemos, riamos y disfrutemos muchísimo juntas. ¡Divirtámonos al máximo y hagamos de esta noche un recuerdo inolvidable! 🎤✨",

    "luis":
        "Luis, gracias por ser parte de esta celebración. 🙌🏻 Espero que te diviertas muchísimo y, ahora sí, ¡a demostrar ese talento en el karaoke! Que no falte la música, las risas y, sobre todo, las buenas canciones. 🎤✨",

    "diego":
        "Diego, hoy toca darlo todo con las canciones que más te gusten. 🎶 Espero que esta noche esté llena de canciones, risas y momentos que se queden como buenos recuerdos. ¡Disfruta muchísimo y a cantar se ha dicho! 🥳✨",

    "erick":
        "Erick, alias Chicharrón, gracias por acompañarme en este día a pesar de tus repetidas quejas. 😂💫 Ahora ya no hay vuelta atrás: ¡que empiece la música y que nadie se quede sin cantar! Espero que te diviertas muchísimo y que, por una noche, no tengas nada de qué quejarte. 🎶✨",

    "jairo":
        "Jairo, no puedo creer que por fin llegó el día de la celebración. 🥹 Me acuerdo de cuando te conté mi plan y me animaste a hacerlo realidad. Gracias por escucharme, apoyarme y compartir conmigo este día tan especial. Espero que esta noche esté llena de buenos momentos y que te lleves muchos recuerdos bonitos. 🎤✨",

    "maria":
        "María, gracias por estar aquí y formar parte de este día tan bonito. 🌸 Después de lo de Mamma Mia, me quedé con ganas de seguir bailando y cantando contigo. 😂💗 ¡Así que hoy toca continuar! Espero que la pasemos increíble, que cantemos hasta quedarnos sin voz y que disfrutes muchísimo. Relájate y diviértete, te lo mereces. 🌸✨",

    "natalia":
        "Natalia, qué bonito que por fin llegó el día de la celebración. 🎀 Gracias por ser parte de esto y por contagiar siempre esa bonita energía que hace que todo se sienta aún más especial. Espero que esta noche esté llena de canciones, risas, buenos momentos y muchísima magia Sanrio. ¡Disfrutémoslo al máximo, come on! 🎀✨",

    "ximena":
        "Ximena, me encanta que hayas venido. 🌼 Espero que disfrutes este día tanto como yo disfruto compartir momentos contigo. Así que alócate con confianza, canta, ríe, baila y hagamos juntas muchos recuerdos bonitos. ¡Hoy se viene a disfrutar! 💗✨",

    "alessandra":
        "Alessandra, gracias por estar aquí, mi querida socia de la Virgo Season. 🌷✨ Ya pronto celebraremos tu cumple, ¡qué emoción! Espero que disfrutes muchísimo esta noche, cantes a todo pulmón y te lleves un recuerdo bonito de esta celebración. Y obviamente, esto es solo el comienzo de nuestras celebraciones. 💗✨"

};


let currentGuest = null;

const coloresSobres = {

    kitty: {
        principal: "#ff6b81",
        secundario: "#ff8fa3",
        texto: "#d6334c"
    },

    mymelody: {
        principal: "#f783b8",
        secundario: "#ffafd2",
        texto: "#d94f91"
    },

    kuromi: {
        principal: "#9b6acb",
        secundario: "#b98bdd",
        texto: "#70409c"
    },

    piano: {
        principal: "#f6b6ce",
        secundario: "#f9cedf",
        texto: "#d889aa"
    },

    cinnamoroll: {
        principal: "#8ed8f2",
        secundario: "#b9eaf8",
        texto: "#4daacb"
    },

    pompompurin: {
        principal: "#f6c94c",
        secundario: "#ffda72",
        texto: "#c39420"
    },

    pochacco: {
        principal: "#e85b65",
        secundario: "#f07d85",
        texto: "#bd3d48"
    },

    chococat: {
        principal: "#9a7256",
        secundario: "#b88e70",
        texto: "#6f4d38"
    }

};

function aplicarColorSobre(nombre) {

    const envelope =
        document.getElementById(
            "envelopeContainer"
        );


    /*
     * Intentar obtener el personaje
     * que obtuvo el invitado.
     */

    const resultados =
        JSON.parse(
            localStorage.getItem(
                "sanrioQuizResults"
            )
        ) || {};


    const personaje =
        resultados[nombre];


    /*
     * Si todavía no hay personaje,
     * usar rosa como color predeterminado.
     */

    const colores =
        coloresSobres[personaje] ||
        coloresSobres.mymelody;


    envelope.style.setProperty(
        "--envelope-main",
        colores.principal
    );

    envelope.style.setProperty(
        "--envelope-secondary",
        colores.secundario
    );

    envelope.style.setProperty(
        "--envelope-text",
        colores.texto
    );

}

/* ==========================================
   PREPARAR CARTA
========================================== */

function prepararCarta() {

    const nombre =
    localStorage.getItem(
        "sanrioGuest"
    );

    const letterForm =
        document.querySelector(".letter-form");

    const envelope =
        document.getElementById("envelopeContainer");

    const envelopeName =
        document.getElementById("envelopeName");

    const result =
        document.getElementById("letterResult");



    if (!nombre) {

        alert("🌸 Primero elige tu nombre para preparar tu cartita 💕");
        return;

    }


    if (!guestMessages[nombre]) {

        result.innerHTML = `

            <div class="letter-error">

                💕 Mmm... parece que ese nombre
                no está en nuestra lista de invitados.

                <br><br>

                ¡Prueba nuevamente! 🎀

            </div>

        `;

        envelope.classList.remove("show");

        return;

    }


    currentGuest = nombre;


    envelopeName.textContent =
        `Para ${capitalizar(nombre)} ✨`;


    /*
     * Ocultar formulario
     */

    letterForm.classList.add("hidden");


    /*
     * Mostrar sobre
     */

    envelope.classList.remove("opened");

    envelope.classList.add("show");


    result.innerHTML = "";


    /*
     * Aplicar color personalizado
     */

    aplicarColorSobre(nombre);


    lanzarEfectos();

}


/* ==========================================
   ABRIR CARTA
========================================== */

function abrirCarta() {

    if (!currentGuest) {
        return;
    }


    const envelope =
        document.getElementById(
            "envelopeContainer"
        );

    const result =
        document.getElementById(
            "letterResult"
        );


    /* Abrir sobre */

    envelope.classList.add("opened");


    /* Esperar animación */

    setTimeout(() => {

        result.innerHTML = `

            <div class="letter-card">

                <div class="letter-sparkles">
                    ✨ 💕 ✨
                </div>

                <div class="letter-icon">
                    💌
                </div>

                <h3>
                    Para ${capitalizar(currentGuest)} ☀️
                </h3>

                <p>
                    ${guestMessages[currentGuest]}
                </p>

                <div class="letter-decoration">
                    🎀 🌸 🎀
                </div>

            </div>

        `;


        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        lanzarEfectos();

    }, 900);

}


function capitalizar(nombre) {

    return nombre.charAt(0).toUpperCase()
        + nombre.slice(1);

}

document.addEventListener(
    "DOMContentLoaded",
    restaurarRegalo
);