var d = document,
    itemBox = d.querySelectorAll('.item_box'), // блок каждого товара
    cartCont = d.getElementById('cart_content'),
    totalPriceEl = d.querySelector('.modal-price'),
    modalCloseBtn =d.querySelector('.modal-close'),
    openModalBtn = d.getElementById('confirm') // блок вывода данных корзины

    var totalPrice = 0
    function addEvent(elem, type, handler){
        if(elem.addEventListener){
          elem.addEventListener(type, handler, false);
        } else {
          elem.attachEvent('on'+type, function(){ handler.call( elem ); });
        }
        return false;
      }
      // Получаем данные из LocalStorage
      function getCartData(){
        return JSON.parse(localStorage.getItem('cart'));
      }
      // Записываем данные в LocalStorage
      function setCartData(o){
        localStorage.setItem('cart', JSON.stringify(o));
        return false;
      }
// Открываем корзину со списком добавленных товаров
function openCart(e){
    var cartData = getCartData(), // вытаскиваем все данные корзины
        totalItems = '';

    // если что-то в корзине уже есть, начинаем формировать данные для вывода
    if(cartData !== null){
      totalItems = `
      <div class="shopping_list">
        <span class="list_title text-white">Наименование</span>
        <div class="list_right">
            <span class="list_price text-white">Цена</span>
            <span class="list_count text-white">Количество</span>
        </div>

      </div>
      `;
      for(var items in cartData){
        totalItems += '<div class="item_basket">';
        // for(var i = 0; i < cartData[items].length; i++){
          totalItems += `  <div class="basket_item_left">
          <div class="basket_item_title text-white">${cartData[items][0]}</div>
          <div class="backet_item_img">${cartData[items][3]}</div>
     </div>`
          totalItems += `
          <div class="basket_item_right">
             <div class="basket_item_price text-white">${cartData[items][1]}₽</div>
             <div class="backet_item_count text-white">${cartData[items][2]}шт.</div>
        </div>
          `
          totalPrice+= cartData[items][1] * cartData[items][2]
      
        totalItems += '</div>';
      }
      totalItems += '</div>';
      cartCont.innerHTML = totalItems;
      console.log(cartCont)
    } else {
      // если в корзине пусто, то сигнализируем об этом
      cartCont.innerHTML = 'В корзине пусто!';
    }
    return false;
  }

  openCart()
  totalPriceEl.innerHTML = `${totalPrice} ₽`
  modalCloseBtn.addEventListener('click', ()=>{
    d.querySelector('.modal-wrapper').style.display = 'none'
    d.body.style.overflow = 'auto'
  })
  openModalBtn.addEventListener('click', ()=>{
    d.querySelector('.modal-wrapper').style.display = 'flex'
    window.scrollTo(0,0)
    d.body.style.overflow = 'hidden'

  })
  /* Очистить корзину */
addEvent(d.getElementById('clear_cart'), 'click', function(e){
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Корзина очишена.';
  });



  