/**
 * Kids Toy Store & Educational Games Shop - GSAP & Motion Script
 * Handles smooth reveals, hover effects, counter triggers, and banner entry.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure elements are visible by default
  const revealItems = document.querySelectorAll('.gsap-reveal');
  revealItems.forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'none';
  });

  // Check if GSAP is available
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero entrance reveal
    const heroContent = document.querySelectorAll('.hero-content-reveal');
    if (heroContent.length > 0) {
      gsap.fromTo(heroContent, 
        { y: 30, opacity: 0 },
        { duration: 0.8, y: 0, opacity: 1, stagger: 0.15, ease: 'power2.out', clearProps: 'transform' }
      );
    }

    // Reveal elements safely on scroll using individual triggers
    if (revealItems.length > 0 && typeof ScrollTrigger !== 'undefined') {
      revealItems.forEach(item => {
        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }

    // Stat counter animation
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || 100;
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.to(counter, {
          innerText: target,
          duration: 1.8,
          snap: { innerText: 1 },
          ease: 'power1.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 90%'
          }
        });
      } else {
        counter.textContent = target;
      }
    });

    // Refresh ScrollTrigger after window loads
    window.addEventListener('load', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }
});
