document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".boton");

  links.forEach(function(link) {
      link.addEventListener("click", function(event) {
          const targetId = event.target.id;
          let url = "/tabla";
          window.location.href = url;
      });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".boton1");

  links.forEach(function(link) {
      link.addEventListener("click", function(event) {
          const targetId = event.target.id;
          let url = "/diagnostico";
          window.location.href = url;
      });
  });
});