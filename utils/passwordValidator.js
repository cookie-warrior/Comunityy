const PasswordValidator = {
  validatePassword: (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const score = Object.values(criteria).filter(Boolean).length;
    
    return {
      score,
      strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
      criteria,
      isValid: score >= 3
    };
  },

  getStrengthColor: (strength) => {
    switch(strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  }
};