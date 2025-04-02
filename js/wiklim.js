function toggleDropdown() {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.querySelectorAll(".dropdown-content");
      dropdowns.forEach(function(dropdown) {
        if (dropdown.style.display === "block") {
          dropdown.style.display = "none";
        }
      });
    }
  }