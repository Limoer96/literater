$(document).ready(() => {
    $('#back').on('click', (event) => {
        event.preventDefault();
        history.back();
    })
});

