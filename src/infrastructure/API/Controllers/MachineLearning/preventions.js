import { PythonShell } from 'python-shell';

export async function createExpensesPreventions(req, res) {
    const { cc_num } = req.body;

    const options = {
        mode: 'text',
        pythonPath: 'C:/Python312/python.exe', // Especifica la ruta de Python que tiene statsmodels instalado
        scriptPath: 'src/infrastructure/API/Controllers/MachineLearning', // Directorio que contiene el script de Python
        args: [cc_num] // Pasa la ruta del archivo .pkl como argumento al script de Python
    };

    try {
        const messages = await PythonShell.run('read_pkl.py', options).then(messages => {
            // results is an array consisting of messages collected during execution
            res.status(200).json({ messages: messages });
            console.log(messages);
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function createIncomesPreventions(req, res) {
    const { cc_num } = req.body;

    console.log(cc_num)

    const options = {
        mode: 'text',
        pythonPath: 'C:/Python312/python.exe', // Especifica la ruta de Python que tiene statsmodels instalado
        scriptPath: 'src/infrastructure/API/Controllers/MachineLearning', // Directorio que contiene el script de Python
        args: [cc_num] // Pasa la ruta del archivo .pkl como argumento al script de Python
    };

    try {
        const messages = await PythonShell.run('read_pkl_incomes.py', options).then(messages => {
            // results is an array consisting of messages collected during execution
            res.status(200).json({ messages: messages });
            console.log(messages);
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}