const logo = document.getElementById('HULogo');

HULogo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const menuPrices = {
  cut: 5000,
  frontCut: 1000,
  color: 6200,
  retouchColor: 4700,
  bleach: 10200,
  parm: 6200,
  straightParm: 24000,
  treatment: 3700,
  headspa: 3700
};


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const staff = document.getElementById('staff').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      const selectedMenu = [];
      let totalPrice = 0;

      const menuSections = document.querySelectorAll('#menu-box input[type="checkbox"]');
      menuSections.forEach((checkbox) => {
          if (checkbox.checked) {
              const menuId = checkbox.getAttribute('for');
              const select = document.getElementById(menuId + 'Menu');
              const selectedOption = select.options[select.selectedIndex];
              const menuName = selectedOption.text;
              const menuValue = selectedOption.value;

              selectedMenu.push(menuName);
              totalPrice += menuPrices[menuValue];
          }
      });

      let message = `ご予約はお間違いないでしょうか？\n\n`;
      message += `名前: ${name}\nメールアドレス: ${email}\n`;
      message += `担当者: ${staff}\n日付: ${date}\n時間: ${time}\n\n`;
      message += `メニュー:\n${selectedMenu.join('\n') || "なし"}\n\n`;
      message += `合計金額: ¥${totalPrice}`;

      if (confirm(message)) {
          const confirmationMessage = document.createElement('div');
          confirmationMessage.innerHTML = `<h2>予約が完了しました！</h2><p>ご予約内容は以下の通りです：</p>
                                          <p>名前: ${name}</p>
                                          <p>メールアドレス: ${email}</p>
                                          <p>担当者: ${staff}</p>
                                          <p>予約日: ${date}</p>
                                          <p>予約時間: ${time}</p>
                                          <p>メニュー: ${selectedMenu.join(', ') || 'なし'}</p>
                                          <p>合計金額: ¥${totalPrice}</p>`;
          document.body.appendChild(confirmationMessage);

          form.submit();
      }
  });
});


