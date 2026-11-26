const currentYear = new Date().getFullYear();

const yearElement = document.getElementById("year");
const footerYearElement = document.getElementById("footerYear");

if (yearElement) yearElement.textContent = currentYear;
if (footerYearElement) footerYearElement.textContent = currentYear;

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
