const testimonials = document.querySelectorAll('.testimonial-card');
let current = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
}

showTestimonial(current);
setInterval(nextTestimonial, 5000); // Cambia cada 5 segundos
