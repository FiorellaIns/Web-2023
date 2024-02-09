document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".reg");

    links.forEach(function(link) {
        link.addEventListener("click", function(event) {
            const targetId = event.target.id;
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
});
