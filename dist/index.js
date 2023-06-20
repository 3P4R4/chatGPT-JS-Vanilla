const API = "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";
const btnEnviar = document.querySelector("#enviar");
const respuestaGPT = document.querySelector("#output");
const entradaInput = document.querySelector("#entradainput");
const historial = document.querySelector(".historial");
const nuevoChat = document.querySelector(".newchat");

function restaurarHistorial(arg) {
  entradaInput.value = arg;
}

async function obtenerMensaje() {
  console.log("click");
  const option = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: entradaInput.value }],
      max_tokens: 100
    })
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", option);
    const data = await response.json();
    respuestaGPT.textContent = data.choices[0].message.content;
    setTimeout(() => {
      entradaInput.value = "";
    }, 1000);

    /* Creando el resultado de Historial */
    if (data.choices[0].message.content) {
      const pElement = document.createElement("p");
      pElement.textContent = entradaInput.value;
      historial.append(pElement);
      pElement.addEventListener("click", () => restaurarHistorial(pElement.textContent));
    }
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function borrarInput() {
  entradaInput.value = "";
}

const teclaIntro = (event) => {
  if (event.key === "Enter") {
    obtenerMensaje();
  }
};

btnEnviar.addEventListener("click", obtenerMensaje);
entradaInput.addEventListener("keydown", teclaIntro);
nuevoChat.addEventListener("click", borrarInput);
