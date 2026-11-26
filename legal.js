const currentYear = new Date().getFullYear();

document.getElementById("year").textContent = currentYear;
document.getElementById("footerYear").textContent = currentYear;

document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      history.replaceState(null, "", this.getAttribute("href"));
    }
  });
});
