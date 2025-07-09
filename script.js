// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Here you would typically send the data to your server
        // For demo purposes, we'll just show an alert
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Simple validation
            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Here you would typically send the data to your server
            // For demo purposes, we'll simulate a successful login
            simulateLogin(email, password, rememberMe);
        });
    }
    
    // Show alert message
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert-message');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alert = document.createElement('div');
        alert.className = `alert-message alert-${type}`;
        alert.textContent = message;
        
        const form = document.querySelector('.login-form');
        if (form) {
            form.insertBefore(alert, form.firstChild);
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                alert.remove();
            }, 5000);
        }
    }
    
    // Simulate login (for demo purposes)
    function simulateLogin(email, password, remember) {
        // Show loading state
        const submitButton = document.querySelector('.login-button');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        }
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo, consider it successful if password isn't "wrongpassword"
            if (password !== 'wrongpassword') {
                showAlert('Login successful! Redirecting...', 'success');
                
                // Store login state if remember me is checked
                if (remember) {
                    localStorage.setItem('rememberedEmail', email);
                }
                
                // Redirect to dashboard after delay
                setTimeout(() => {
                    window.location.href = 'student-dashboard.html';
                }, 1500);
            } else {
                showAlert('Invalid email or password', 'error');
                
                // Reset button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Log In';
                }
            }
        }, 1500);
    }
    
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get input values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple client-side validation (in real app, validate server-side)
            if (email === 'student@example.com' && password === 'newton123') {
                // Store user in localStorage (not secure for production)
                localStorage.setItem('currentStudent', JSON.stringify({
                    name: 'Rahul Sharma',
                    email: email,
                    class: '12'
                }));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('errorMessage').textContent = 'Invalid email or password';
            }
        });
});