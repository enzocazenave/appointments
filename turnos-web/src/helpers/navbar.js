const navbar = document.querySelector('#navmain');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar_active', scrollY > (innerHeight / 2));
});