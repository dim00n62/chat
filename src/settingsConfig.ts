export default {
    parameters: [
        { id: 'fragments_count', title: 'Количество фрагментов для контекста', tooltip: '', default: 5, min: 1, max: 10, step: 0.1 },
        { id: 'token_limit', title: 'Ограничение токенов генерации', tooltip: '', default: 500, min: 20, max: 1000, step: 10 },
        { id: 'temperature', title: 'Температура', tooltip: '', default: 0.005, min: 0.005, max: 1, step: 0.005 }
    ]
};
