import { PythonShell } from 'python-shell';

export async function createPreventions(req, res) {
    const {cc_num } = 4512828414983801781

    const options = {
        mode: 'text',
        pythonPath: 'C:/Python312/python.exe', // Especifica la ruta de Python que tiene statsmodels instalado
        scriptPath: 'C:/Users/carlo/OneDrive/Documentos/Backend/src/infrastructure/API/Controllers/MachineLearning', // Directorio que contiene el script de Python
        args: [cc_num] // Pasa la ruta del archivo .pkl como argumento al script de Python
    };

    try {
        const messages = await PythonShell.run('read_pkl.py', options).then(messages=>{
            // results is an array consisting of messages collected during execution
            res.status(200).json({ messages: messages });
            console.log(messages);
          });
        //const account = await accountService.createAccount( cc_num)

// Envía la respuesta JSON con el objeto 'parsedMessages'
        

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}