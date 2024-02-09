$(document).ready(function() {
    $(".inicio").on("click", ".reg", function() {
        const targetId = $(this).attr("id");
        let url = "";
        if (targetId === "paciente") {
            url = "/tabla";
        } else if (targetId === "Perfil") {
            url = "/perfil_medico";
        } else if (targetId === "cerrar") {
            url = "/";
        }
        window.location.href = url;
    });
});
