$(document).ready(function () {
  // nav
  function reloadTab(selectedTab) {
    if (
      ["home", "contact", "member", "product", "about", "productInfo"].includes(
        selectedTab
      )
    ) {
      if (selectedTab === "productInfo") {
        selectedTab = "product";
      }
      $(`#${selectedTab}`).addClass("activeNav");
      $(`#${selectedTab} > a`).css("color", "#ffc1a6");
    }
  }
  let pagePathName = window.location.pathname.split("/").pop();
  let pageName = pagePathName.split(".")[0];
  reloadTab(pageName);
  // switch slide
  const list = $(".slider__list");
  const items = $(".slider__list__item");
  const dots = $(".slider__dots li");

  const prevButton = $("#prevButton");
  const nextButton = $("#nextButton");

  let active = 0;
  let lengthItems = items.length - 1;
  let refreshSlider = setInterval(() => {
    nextButton.click();
  }, 5000);

  nextButton.on("click", () => {
    if (active + 1 > lengthItems) {
      active = 0;
    } else {
      active += 1;
    }
    reloadSlider();
  });

  prevButton.on("click", () => {
    if (active - 1 < 0) {
      active = lengthItems;
    } else {
      active = active - 1;
    }
    reloadSlider();
  });
  dots.on("click", function () {
    active = $(this).index();
    reloadSlider();
  });

  function reloadSlider() {
    let checkleft = items.eq(active)[0].offsetLeft;
    list.css("left", -checkleft + "px");

    let lastActiveDot = $(".slider__dots li.active");
    lastActiveDot.removeClass("active");
    $(dots).eq(active).addClass("active");
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => {
      nextButton.click();
    }, 5000);
  }

  function goToPage(url) {
    if (url !== window.location.href) {
        window.location.assign(url); 
    } else {
        window.location.reload();
    }
}

  // login button
  $("#userButton").on("click", function () {
    goToPage("login.html")
  });

  // cart count update
  const cartCount = localStorage.getItem("cartCount");
  $(".header__iconBox__cartCount").text(cartCount | 0);

  // cart button
  $("#cartButton").on("click", function () {
    goToPage("cart.html")
  });

  // cart phone button
  $(".header__cartPhoneWrapper").on("click", function () {
    goToPage("cart.html")
  });

  // search button
  $("#searchButton").on("click", function () {
    if ($(".header__iconBox__searchBox").is(":visible")) {
      $(".header__iconBox__searchBox").hide();
      return;
    }
    $(".header__iconBox__searchBox").show();
  });

  $(".header__iconBox__searchBox__right").on("click", function(){
    localStorage.setItem("searchValue", $(".header__iconBox__searchBox__left").val());
    goToPage("product.html")
  })
  $("#headerSearchBox").on("submit", function(e){
    e.preventDefault();
    localStorage.setItem("searchValue", $(this).find("input").val());
    goToPage("product.html")
  });
  $("#headerSearchBox2").on("submit", function(e){
    e.preventDefault();
    localStorage.setItem("searchValue", $(".header__iconBox__searchBox__left").val());
    goToPage("product.html")
  });
  
});
