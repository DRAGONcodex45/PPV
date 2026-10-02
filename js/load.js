
fetch('/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Initialize hamburger AFTER header is loaded
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('.navlinks');

    if (!menu || !nav) return;

    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('mobile-open');

      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute(
        'aria-label',
        open ? 'Close menu' : 'Open menu'
      );
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open menu');
      });
    });
  })
  .catch(error => console.error('Error loading header:', error));



fetch('/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  }).catch(error => console.error('Error loading footer:', error));

fetch('/chat.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('chat-icon').innerHTML = data;
  }).catch(error => console.error('Error loading footer:', error));
