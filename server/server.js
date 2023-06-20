import express from 'express'; //Se importa módulo express para poder manejar las solicitudes del front
import * as dotenv from 'dotenv'; //Se importa módulo dotenv para utilizar la key provista por openAi
import cors from 'cors'; //Se importa módulo cors para poder acceder a la API desde diferetnes dominios
import { Configuration, OpenAIApi } from 'openai'; //Se importan las clases de openAi

//se carga la configuración del .env
dotenv.config();

//Configuración de de la API de OpenAi en base a dotenv
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

//Generación de una instancia de Express
const app = express();
app.use(cors()); // Configuración de Cors para permitir las solicitus de varios origenes
app.use(express.json());//Configuración para pasar los datos a formato JSON

//Ruta de inicio
app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Music Pal",
    })
});

// Ruta para recibir solicitudes POST y generar una respuesta utilizando la API de OpenAI
app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.9,
            max_tokens: 40,
            top_p: 1,
            frequency_penalty: 0.1,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text// Envia la respuesta generada por la API de OpenAI como propiedad 'bot'
        })
    }catch (error) {
        console.log(error);
        res.status(500).send({ error })// En caso de error, se envía una respuesta con código de error 500 y un objeto JSON con el error
    }
})

// Inicio del servidor en el puerto 5000
app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
