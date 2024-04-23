const moneyFormat = Intl.NumberFormat('es-ES');
const topSaleData = [
    {
        productName: "Opera Cake",
        productPrice: 400000,
        productImage: "opera"
    },
    {
        productName: "Velvet Heart Cake",
        productPrice: 599000,
        productImage: "velvetheart"
    },
    {
        productName: "Fresh Cream Cake",
        productPrice: 315000,
        productImage: "freshcream"
    },
    {
        productName: "Red Velvet Cake",
        productPrice: 320000,
        productImage: "redvelvet"
    }
]

$(document).ready(function () {
    let productList = "";
    topSaleData.forEach((item) => {
         productList += `<div class="main__product__item m-4">
         <div class="main__product__item__top">
             <img class="main__product__item__top--image" src="../assets/imgs/products/${item.productImage}.png">
             <span class="main__product__item__top--text">No 1 Bakery</span>
         </div>
         <div class="main__product__item__bottom">
             <span class="main__product__item__bottom__productName">${item.productName}</span>
             <span class="main__product__item__bottom__productPrice">${moneyFormat.format(item.productPrice)}₫</span>
             <img src="../assets/imgs/products/cartIcon.png" class="main__product__item__bottom__addProduct">
         </div>
     </div>`
    });
     $(".main__product").html(productList);
});