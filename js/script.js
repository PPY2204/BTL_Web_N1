$(window).scroll(scrollFunction);

function scrollFunction() {
if ($(window).scrollTop() > 120) {
    $(".header").addClass("activeHeader");
    $(".header__logo").hide();
    $(".header__iconBox").hide();
} else {
    $(".header").removeClass("activeHeader");
    $(".header__logo").show();
    $(".header__iconBox").show();
}
}
$(document).ready(function() {
//   alert('Hello, World!');
  let selectedTab = "home";
  $(`#${selectedTab}`).addClass('activeNav');
});
