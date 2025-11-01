class TextType {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      text: options.text || [],
      typingSpeed: options.typingSpeed || 50,
      initialDelay: options.initialDelay || 0,
      pauseDuration: options.pauseDuration || 2000,
      deletingSpeed: options.deletingSpeed || 30,
      loop: options.loop !== undefined ? options.loop : true,
      showCursor: options.showCursor !== undefined ? options.showCursor : true,
      hideCursorWhileTyping: options.hideCursorWhileTyping || false,
      cursorCharacter: options.cursorCharacter || '|',
      cursorBlinkDuration: options.cursorBlinkDuration || 0.5,
      textColors: options.textColors || [],
      variableSpeed: options.variableSpeed || null,
      onSentenceComplete: options.onSentenceComplete || null,
      startOnVisible: options.startOnVisible || false,
      reverseMode: options.reverseMode || false
    };

    this.displayedText = '';
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.currentTextIndex = 0;
    this.isVisible = !this.options.startOnVisible;
    this.timeout = null;
    this.cursorInterval = null;
    this.observer = null;

    this.textArray = Array.isArray(this.options.text) ? this.options.text : [this.options.text];
    
    this.init();
  }

  init() {
    // Create container structure
    this.contentSpan = document.createElement('span');
    this.contentSpan.className = 'text-type__content';
    
    if (this.options.showCursor) {
      this.cursorSpan = document.createElement('span');
      this.cursorSpan.className = 'text-type__cursor';
      this.cursorSpan.textContent = this.options.cursorCharacter;
    }

    this.element.innerHTML = '';
    this.element.appendChild(this.contentSpan);
    if (this.options.showCursor) {
      this.element.appendChild(this.cursorSpan);
    }

    // Start cursor blinking
    if (this.options.showCursor) {
      this.startCursorBlink();
    }

    // Setup intersection observer if needed
    if (this.options.startOnVisible) {
      this.setupIntersectionObserver();
    } else {
      this.startTyping();
    }
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isVisible) {
            this.isVisible = true;
            this.startTyping();
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.element);
  }

  startCursorBlink() {
    let visible = true;
    const blinkDuration = this.options.cursorBlinkDuration * 1000;
    
    this.cursorInterval = setInterval(() => {
      if (this.cursorSpan) {
        this.cursorSpan.style.opacity = visible ? '0' : '1';
        visible = !visible;
      }
    }, blinkDuration);
  }

  getRandomSpeed() {
    if (!this.options.variableSpeed) return this.options.typingSpeed;
    const { min, max } = this.options.variableSpeed;
    return Math.random() * (max - min) + min;
  }

  getCurrentTextColor() {
    if (this.options.textColors.length === 0) return null;
    return this.options.textColors[this.currentTextIndex % this.options.textColors.length];
  }

  updateDisplay() {
    this.contentSpan.textContent = this.displayedText;
    
    const color = this.getCurrentTextColor();
    if (color) {
      this.contentSpan.style.color = color;
    }

    // Handle cursor visibility
    if (this.options.showCursor && this.options.hideCursorWhileTyping) {
      const shouldHide = this.currentCharIndex < this.textArray[this.currentTextIndex].length || this.isDeleting;
      this.cursorSpan.style.display = shouldHide ? 'none' : 'inline-block';
    }
  }

  startTyping() {
    if (!this.isVisible) return;

    const animate = () => {
      const currentText = this.textArray[this.currentTextIndex];
      const processedText = this.options.reverseMode 
        ? currentText.split('').reverse().join('') 
        : currentText;

      if (this.isDeleting) {
        if (this.displayedText === '') {
          this.isDeleting = false;
          
          if (this.currentTextIndex === this.textArray.length - 1 && !this.options.loop) {
            return;
          }

          if (this.options.onSentenceComplete) {
            this.options.onSentenceComplete(
              this.textArray[this.currentTextIndex], 
              this.currentTextIndex
            );
          }

          this.currentTextIndex = (this.currentTextIndex + 1) % this.textArray.length;
          this.currentCharIndex = 0;
          
          this.timeout = setTimeout(() => {
            animate();
          }, this.options.pauseDuration);
        } else {
          this.displayedText = this.displayedText.slice(0, -1);
          this.updateDisplay();
          
          this.timeout = setTimeout(() => {
            animate();
          }, this.options.deletingSpeed);
        }
      } else {
        if (this.currentCharIndex < processedText.length) {
          this.displayedText += processedText[this.currentCharIndex];
          this.currentCharIndex++;
          this.updateDisplay();
          
          const speed = this.options.variableSpeed 
            ? this.getRandomSpeed() 
            : this.options.typingSpeed;
          
          this.timeout = setTimeout(() => {
            animate();
          }, speed);
        } else if (this.textArray.length > 1) {
          this.timeout = setTimeout(() => {
            this.isDeleting = true;
            animate();
          }, this.options.pauseDuration);
        }
      }
    };

    // Initial delay before starting
    this.timeout = setTimeout(() => {
      animate();
    }, this.options.initialDelay);
  }

  destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Public method to update text array
  updateText(newText) {
    this.textArray = Array.isArray(newText) ? newText : [newText];
    this.reset();
  }

  // Public method to reset animation
  reset() {
    this.displayedText = '';
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.currentTextIndex = 0;
    this.updateDisplay();
    
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.startTyping();
  }

  // Public method to pause animation
  pause() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  // Public method to resume animation
  resume() {
    this.startTyping();
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TextType;
}
