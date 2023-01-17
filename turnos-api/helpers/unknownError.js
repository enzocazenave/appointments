const unknownError = (response, error) => {
    console.log(error);

    response.status(500).json({
        ok: false,
        msg: 'Ocurrió un error inesperado, por favor hablá con el administrador.'
    });
}

module.exports = {
    unknownError
}