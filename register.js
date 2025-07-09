document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthMeter = document.querySelector('.strength-meter');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            let strength = 0;
            
            // Check password length
            if (password.length >= 8) strength += 1;
            if (password.length >= 12) strength += 1;
            
            // Check for mixed case
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
            
            // Check for numbers
            if (/\d/.test(password)) strength += 1;
            
            // Check for special chars
            if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
            
            // Update strength meter
            const width = strength * 25;
            let color = '#e74c3c'; // red
            let text = 'Weak';
            
            if (strength >= 3) {
                color = '#f39c12'; // orange
                text = 'Medium';
            }
            if (strength >= 5) {
                color = '#27ae60'; // green
                text = 'Strong';
            }
            
            strengthMeter.style.width = width + '%';
            strengthMeter.style.backgroundColor = color;
            strengthText.textContent = text;
            strengthText.style.color = color;
        });
    }

    // Form validation and submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault