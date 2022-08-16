
/*For Name Animation*/
anime({
    targets: '#amazing path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1200,
    delay: function(el, i) { return i * 50 },
    direction: 'alternate',
    loop: false,
    });


function animateNameonScroll(){
    if(this.scrollY > this.innerHeight / 1.5){
        anime({
            targets: '#amazing path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1200,
            delay: function(el, i) { return i * 60 },
            direction: 'alternate',
            loop: false,
            });
    }
}

 window.addEventListener("scroll", animateNameonScroll);

/*End Name Animation*/

$(function(){
	var inputs = $('.input');
	var paras = $('.description-flex-container').find('p');
	inputs.click(function(){
		var t = $(this),
				ind = t.index(),
				matchedPara = paras.eq(ind);
		
		t.add(matchedPara).addClass('active');
		inputs.not(t).add(paras.not(matchedPara)).removeClass('active');
	});
});


  /*Scroll to Section from Navbar*/

/*Scroll Trigger*/
// function goToSection(i, anim) {
//     gsap.to(window, {
//       scrollTo: {y: i*innerHeight, autoKill: false},
//       duration: 1
//     });
//     console.log(i*innerHeight)
    
//     if(anim) {
//       anim.restart();
//     }
//   }


//   gsap.utils.toArray(".container").forEach((container, i) => {
//     ScrollTrigger.create({
//       trigger: container,
//       onEnter: () => goToSection(i)
//     });

    
//     ScrollTrigger.create({
//       trigger: container,
//       start: "bottom bottom",
//       onEnterBack: () => goToSection(i),
//     });
//   });


  //For smooth scrolling
  // gsap.utils.toArray("nav a").forEach(function(a) {
  //   a.addEventListener("click", function(e) {
  //     e.preventDefault();
  //     gsap.to(window, {duration: 1, scrollTo: e.target.getAttribute("href")});
  //   });
  // });
