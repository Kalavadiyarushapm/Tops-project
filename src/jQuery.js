$(document).ready(function () {
  // Open search when clicking search box
  $(".search-wrapper").on("click", function (e) {
    e.stopPropagation(); // prevent document click
    $(".search-box").show();
  });

  // Close search when clicking anywhere else
  $(document).on("click", function () {
    $(".search-box").hide();
  });
});
