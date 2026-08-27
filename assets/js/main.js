/* 亿格云 EagleCloud 单页官网 — 交互脚本 */
(function(){
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('.nav-menu');

  // 滚动导航样式
  function onScroll(){
    if(window.scrollY > 40){
      nav.classList.add('scrolled');
    }else{
      nav.classList.remove('scrolled');
    }
    updateActive();
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // 汉堡菜单
  if(burger && menu){
    burger.addEventListener('click', function(){
      menu.classList.toggle('open');
      this.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); burger.classList.remove('active'); });
    });
  }

  // 高亮当前 section 菜单
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-menu a[href^="#"]');
  function updateActive(){
    var cur = '';
    sections.forEach(function(s){
      var top = s.offsetTop - 140;
      if(window.scrollY >= top) cur = s.getAttribute('id');
    });
    links.forEach(function(a){
      a.classList.remove('active');
      if(a.getAttribute('href') === '#'+cur) a.classList.add('active');
    });
  }

  // 入场淡入
  var fades = document.querySelectorAll('.fadein');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  },{threshold:0.16});
  fades.forEach(function(el){ io.observe(el); });

  // 数字滚动动画
  var nums = document.querySelectorAll('.count');
  var numObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && !e.target.dataset.done){
        e.target.dataset.done = '1';
        animateNum(e.target);
      }
    });
  },{threshold:0.4});
  nums.forEach(function(n){ numObserver.observe(n); });

  function animateNum(el){
    var to = parseInt(el.dataset.to||el.textContent, 10);
    var dur = 1400;
    var start = performance.now();
    function step(t){
      var p = Math.min(1,(t-start)/dur);
      var eased = 1 - Math.pow(1-p, 3);
      var val = Math.round(to*eased);
      el.textContent = val;
      if(p<1) requestAnimationFrame(step);
      else el.textContent = to;
    }
    requestAnimationFrame(step);
  }
})();
