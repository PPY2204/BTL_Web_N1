const moneyFormat = Intl.NumberFormat("es-ES");
$(document).ready(function () {
  let cartList = JSON.parse(localStorage.getItem("cartList"));
  // Reload total price
  const reloadTotalPrice = () => {
    let totalPrice = 0;
    cartList.forEach((item) => {
      totalPrice += item.productPrice * (item.productAmount || 1);
    });
    $("#totalPrice").text(moneyFormat.format(totalPrice) + "₫");
  };

  //Reload cart list
  const reloadCartList = () => {
    let cartListHTML = `<tr>
  <td colspan="5"><br></td>
  </tr>
  <tr>
  <td colspan="4" id="tableLine"></td>
  </tr>`;
    if (cartList &&  cartList.length !== 0) {
      cartList.forEach((item) => {
        cartListHTML += `
        <tr>
                                <td><img src="../assets/imgs/products/${
                                  item.productImage
                                }.png" alt=""></td>
                                <td>
                                    <label for="buyAmount">${
                                      item.productName
                                    }</label>
                                    <input type="number" value="${item.productAmount || 1}" min="1" class="form-control mt-2" id="buyAmount"
                                        name="buyAmount" price=${
                                          item.productPrice
                                        }>
                                </td>
                                <td>${moneyFormat.format(
                                  item.productPrice
                                )}₫</td>
                                <td id="cartTotalrice">${moneyFormat.format(
                                  item.cartTotalrice
                                    ? item.cartTotalrice
                                    : item.productPrice
                                )}₫</td>
                                <td style="font-weight: 900;" id="xButton">X</td>
        </tr>`;
      });
      cartListHTML += `<tr>
  <td colspan="4" id="tableLine"></td>
</tr>

<tr>
  <td colspan="5"><br></td>
</tr>

<tr>
  <td colspan="3" style="text-align: center; text-indent: -100px;">Tổng số</td>
  <td id="totalPrice"></td>
</tr>`;
    } else {
      cartListHTML += `<tr>
    <td colspan="5"><br></td>
</tr>
<tr>
    <td colspan="4" style="text-align: center;">Giỏ hàng trống...</td>
</tr>
<tr>
    <td colspan="5"><br></td>
</tr>
<tr>
                                <td colspan="4" id="tableLine"></td>
                            </tr>

                            <tr>
                                <td colspan="5"><br></td>
                            </tr>`;
    }
    $("#cartBody").html(cartListHTML);
    reloadTotalPrice();
  };

  // Run first time
  reloadCartList();

  // Click events
  $("#cartBody").on("change",  "#buyAmount", function () {
    console.log("a")
    const parent = $(this).parent().parent();
    parent
      .find("#cartTotalrice")
      .text(moneyFormat.format($(this).val() * $(this).attr("price")) + "₫");
    cartList.find((item) => {
      if (item.productName === $(this).parent().find("label").text()) {
        item.cartTotalrice = $(this).val() * $(this).attr("price");
        item.productAmount = $(this).val();
      }
    });
    localStorage.setItem("cartList", JSON.stringify(cartList));
    reloadCartList();
  });

  $("#cartBody").on("click", "#xButton", function () {
    let newCartList = JSON.parse(localStorage.getItem("cartList"));
    const cartCount = localStorage.getItem("cartCount");
    cartList = newCartList.filter(
      (item) => item.productName !== $(this).parent().find("label").text()
    );
    localStorage.setItem("cartList", JSON.stringify(cartList));
    localStorage.setItem("cartCount", cartCount - 1);
    $(".header__iconBox__cartCount").text(cartCount - 1);
    $(this).parent().remove();
    reloadCartList();
  });

  $("#continueButton").on("click", function () {
    window.location.href = "product.html";
  });
});