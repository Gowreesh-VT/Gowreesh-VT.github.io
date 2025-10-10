/*----------------------------------------------------*/
/*	Enhanced Form Validation & Loading States
------------------------------------------------------*/

// Real-time form validation
class FormValidator {
  constructor() {
    this.validators = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      name: /^[a-zA-Z\s]{2,}$/,
      subject: /^.{3,}$/,
      message: /^.{10,}$/
    };
    
    this.init();
  }
  
  init() {
    // Add real-time validation to contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      this.setupContactFormValidation(contactForm);
    }
    
    // Add real-time validation to auth forms
    const authInputs = document.querySelectorAll('#login-form input, #signup-form input');
    authInputs.forEach(input => {
      this.setupInputValidation(input);
    });
  }
  
  setupContactFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Real-time validation on input
      input.addEventListener('input', (e) => {
        this.validateField(e.target);
      });
      
      // Validation on blur
      input.addEventListener('blur', (e) => {
        this.validateField(e.target);
      });
    });
  }
  
  setupInputValidation(input) {
    const wrapper = input.closest('.input-group') || input.parentElement;
    
    // Create validation feedback element
    if (!wrapper.querySelector('.validation-feedback')) {
      const feedback = document.createElement('div');
      feedback.className = 'validation-feedback';
      wrapper.appendChild(feedback);
    }
    
    // Real-time validation
    input.addEventListener('input', (e) => {
      this.validateField(e.target);
    });
    
    input.addEventListener('blur', (e) => {
      this.validateField(e.target);
    });
  }
  
  validateField(field) {
    const fieldType = field.type === 'email' ? 'email' : field.name || field.id;
    const value = field.value.trim();
    const wrapper = field.closest('.input-group') || field.parentElement;
    const feedback = wrapper.querySelector('.validation-feedback');
    
    // Remove existing classes
    field.classList.remove('valid', 'invalid');
    wrapper.classList.remove('has-success', 'has-error');
    
    if (value === '') {
      if (feedback) feedback.textContent = '';
      return null;
    }
    
    let isValid = false;
    let message = '';
    
    switch (fieldType) {
      case 'email':
      case 'contactEmail':
        isValid = this.validators.email.test(value);
        message = isValid ? '✓ Valid email' : '✗ Please enter a valid email address';
        break;
        
      case 'name':
      case 'contactName':
        isValid = this.validators.name.test(value);
        message = isValid ? '✓ Valid name' : '✗ Name must be at least 2 characters';
        break;
        
      case 'subject':
      case 'contactSubject':
        isValid = this.validators.subject.test(value);
        message = isValid ? '✓ Valid subject' : '✗ Subject must be at least 3 characters';
        break;
        
      case 'message':
      case 'contactMessage':
        isValid = this.validators.message.test(value);
        message = isValid ? '✓ Valid message' : '✗ Message must be at least 10 characters';
        break;
        
      case 'password':
        isValid = this.validatePassword(value);
        message = isValid.valid ? '✓ Strong password' : '✗ ' + isValid.message;
        isValid = isValid.valid;
        break;
        
      default:
        isValid = value.length > 0;
        message = isValid ? '✓ Valid' : '✗ This field is required';
    }
    
    // Apply validation styles
    if (isValid) {
      field.classList.add('valid');
      wrapper.classList.add('has-success');
    } else {
      field.classList.add('invalid');
      wrapper.classList.add('has-error');
    }
    
    // Update feedback message
    if (feedback) {
      feedback.textContent = message;
      feedback.className = `validation-feedback ${isValid ? 'success' : 'error'}`;
    }
    
    return isValid;
  }
  
  validatePassword(password) {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const score = [minLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (score < 3) {
      return { valid: false, message: 'Password too weak. Include uppercase, lowercase, numbers.' };
    } else if (score < 4) {
      return { valid: true, message: 'Medium strength password' };
    } else {
      return { valid: true, message: 'Strong password' };
    }
  }
  
  validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (input.hasAttribute('required')) {
        const fieldValid = this.validateField(input);
        if (fieldValid === false) {
          isValid = false;
        }
      }
    });
    
    return isValid;
  }
}

// Enhanced loading states
class LoadingManager {
  constructor() {
    this.activeLoaders = new Set();
  }
  
  show(target, message = 'Loading...') {
    const loader = this.createLoader(message);
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!targetElement) return null;
    
    // Store original content
    loader.originalContent = targetElement.innerHTML;
    loader.targetElement = targetElement;
    
    // Add loading state
    targetElement.classList.add('loading-state');
    targetElement.appendChild(loader);
    
    this.activeLoaders.add(loader);
    return loader;
  }
  
  hide(loader) {
    if (!loader || !loader.targetElement) return;
    
    loader.targetElement.classList.remove('loading-state');
    if (loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
    
    this.activeLoaders.delete(loader);
  }
  
  createLoader(message) {
    const loader = document.createElement('div');
    loader.className = 'enhanced-loader';
    loader.innerHTML = `
      <div class="loader-spinner"></div>
      <div class="loader-message">${message}</div>
    `;
    return loader;
  }
  
  showButtonLoader(button, message = 'Processing...') {
    const btn = typeof button === 'string' ? document.querySelector(button) : button;
    if (!btn) return null;
    
    // Store original state
    const originalText = btn.textContent;
    const originalDisabled = btn.disabled;
    
    // Set loading state
    btn.disabled = true;
    btn.classList.add('btn-loading');
    btn.innerHTML = `
      <span class="btn-spinner"></span>
      <span class="btn-text">${message}</span>
    `;
    
    // Return reset function
    return () => {
      btn.disabled = originalDisabled;
      btn.classList.remove('btn-loading');
      btn.textContent = originalText;
    };
  }
}

// Enhanced toast notifications
class ToastManager {
  constructor() {
    this.container = this.createContainer();
  }
  
  createContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }
  
  show(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = this.getIcon(type);
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    // Add to container
    this.container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    const autoRemove = setTimeout(() => this.remove(toast), duration);
    
    // Manual close
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(autoRemove);
      this.remove(toast);
    });
    
    return toast;
  }
  
  getIcon(type) {
    const icons = {
      success: '✓',
      error: '✗',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  }
  
  remove(toast) {
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
  
  success(message, duration) {
    return this.show(message, 'success', duration);
  }
  
  error(message, duration) {
    return this.show(message, 'error', duration);
  }
  
  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }
  
  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Initialize enhanced functionality
const formValidator = new FormValidator();
const loadingManager = new LoadingManager();
const toastManager = new ToastManager();

// Make available globally
window.formValidator = formValidator;
window.loadingManager = loadingManager;
window.toastManager = toastManager;