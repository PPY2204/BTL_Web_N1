const moneyFormat = Intl.NumberFormat("es-ES");
$(document).ready(function () {
    const productDetail = JSON.parse(localStorage.getItem("currentProduct"));
    $(".main__productInfo__productImageWrapper img").attr("src", `../assets/imgs/products/${productDetail.productImage}.png`);
    $(".main__productInfo__info__productName").text(productDetail.productName);
    $(".main__productInfo__info__state").text(productDetail.state === 1 ? "Còn hàng" : "Hết hàng");
    $(".main__productInfo__info__productPrice").text(moneyFormat.format(productDetail.productPrice) + "₫");
    $(".main__productDescription__des").text(productDetail.productDescription);
});