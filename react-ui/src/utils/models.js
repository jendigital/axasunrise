export function models() {
    let models = JSON.parse(localStorage.getItem('models'));

    console.log(models)
    if (models) {
        return models;
    } else {
        return [];
    }
}