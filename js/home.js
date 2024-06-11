const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,

});
const moneyFormat = Intl.NumberFormat("es-ES");
const productData = [
  {
    productName: "Opera Cake",
    productPrice: 400000,
    productImage: "opera",
    productIngredient: "Gateau, whipping cream, bột hạnh nhân, Coffee...",
    productDescription:
      "Theo nhà phát triển công thức, Jessica Morone, bánh Opera là một món tráng miệng của Pháp bao gồm ba lớp bánh bông lan hạnh nhân ngâm xi-rô cà phê tinh tế, xen kẽ với các lớp kem bơ hương cà phê và ganache sô cô la, theo nhà phát triển công thức, Jessica Morone. Morone cũng tình cờ là nhiếp ảnh gia ẩm thực và người viết blog để tạo ra công thức làm bánh opera cổ điển này, Theo The Good Life France, bánh opera được đặt tên cho Nhà hát Opera của Pháp, với các lớp bánh giống các dãy gác lửng trong chính nhà hát opera. Chiếc bánh kẹo được đầu bếp bánh ngọt người Pháp, Cyriaque Gavillon, mơ ước, người muốn tạo ra một món tráng miệng mang đến cho bạn tất cả các hương vị một cách dễ dàng. Chỉ trong một lần cắn, bạn sẽ cảm nhận được từng hương vị và kết cấu mà chiếc bánh opera này mang lại!",
    state: 0,
  },
  {
    productName: "Velvet Heart Cake",
    productPrice: 599000,
    productImage: "velvetheart",
    productDescription:
      "Red Velvet Cake là một chiếc bánh độc đáo mà tất cả mọi người yêu thích. Lớp phủ kem phô mai thơm và ngọt ngào. Với kết cấu mềm mịn như nhung và lớp sương bông xốp",
    state: 1,
  },
  {
    productName: "Fresh Cream Cake",
    productPrice: 315000,
    productImage: "freshcream",
    productDescription: "",
    state: 1,
  },
  {
    productName: "Red Velvet Cake",
    productPrice: 320000,
    productImage: "redvelvet",
    productDescription: "",
    state: 1,
  },
  {
    productName: "Tiramisu Cake",
    productPrice: 320000,
    productImage: "tiramisu",
    productDescription:
      "Bánh Sinh Nhật Tiramisu là một loại bánh ngọt tráng miệng vị cà phê của nước Ý, gồm các lớp bánh quy Savoiardi, nhúng cà phê xen kẽ với hỗn hợp trứng, đường, phô mai mascarpone đánh bông, thêm một ít bột cacao. Công thức bánh này được biến tấu thành nhiều món bánh và món tráng miệng khác nhau.",
    state: 0,
  },
  {
    productName: "Cream Cheese Cake",
    productPrice: 320000,
    productImage: "creamcheeselayer",
    productDescription: "",
    state: 1,
  },
  {
    productName: "Fresh Flower Cake",
    productPrice: 268000,
    productImage: "freshflower",
    productDescription: "",
    state: 1,
  },
  {
    productName: "Chocolate Cream Cake",
    productPrice: 300000,
    productImage: "chocolatecream",
    productDescription: "",
    state: 0,
  },
];

const topSaleData = [
  {
    productName: "Opera Cake",
    productPrice: 400000,
    productImage: "opera",
  },
  {
    productName: "Velvet Heart Cake",
    productPrice: 599000,
    productImage: "velvetheart",
  },
  {
    productName: "Fresh Cream Cake",
    productPrice: 315000,
    productImage: "freshcream",
  },
  {
    productName: "Red Velvet Cake",
    productPrice: 320000,
    productImage: "redvelvet",
  },
];

$(document).ready(function () {
  let productList = "";
  topSaleData.forEach((item) => {
    productList += `<div class="main__product__item m-4">
         <div class="main__product__item__top">
             <img class="main__product__item__top--image" src="../assets/imgs/products/${
               item.productImage
             }.png">
             <span class="main__product__item__top--text">No 1 Bakery</span>
         </div>
         <div class="main__product__item__bottom">
             <span class="main__product__item__bottom__productName">${
               item.productName
             }</span>
             <span class="main__product__item__bottom__productPrice">${moneyFormat.format(
               item.productPrice
             )}₫</span>
             <img src="../assets/imgs/products/cartIcon.png" class="main__product__item__bottom__addProduct">
         </div>
     </div>`;
  });
  $(".main__product").html(productList);
  $(".main__product").on("click", ".main__product__item__top", function () {
    productData.find((item) => {
      if (
        item.productName ===
        $(this)
          .parent()
          .find(".main__product__item__bottom__productName")
          .text()
      ) {
        localStorage.setItem("currentProduct", JSON.stringify(item));
        window.location.href = "productDetail.html";
      }
    });
  });
  $(".main__product").on(
    "click",
    ".main__product__item__bottom__addProduct",
    function () {
      console.log("press")
      productData.find((item) => {
        if (
          item.productName ===
          $(this)
            .parent()
            .find(".main__product__item__bottom__productName")
            .text()
        ) {
          const cartCount = localStorage.getItem("cartCount");
          const newCartCount = cartCount ? parseInt(cartCount) + 1 : 1;
          const cart = localStorage.getItem("cartList");
          let newCart = cart ? JSON.parse(cart) : [];
          const foundItem = newCart.find(
            (element) => item.productName === element.productName
          );
          if (foundItem === undefined) {
            Toast.fire({
              icon: "success",
              title: "Đã thêm sản phẩm vào giỏ hàng!",
            });
            localStorage.setItem("cartCount", newCartCount);
            $(".header__iconBox__cartCount").text(newCartCount);
            newCart.push(item);
            localStorage.setItem("cartList", JSON.stringify(newCart));
          } else {
            Toast.fire({
              icon: "error",
              title: "Sản phẩm đã có trong giỏ hàng!",
            });
          }
        }
      });
    }
  );
});
