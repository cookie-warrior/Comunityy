function AuthPage({ onLogin, onNavigate }) {
  try {
    const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    emoji: '😊'
  });
  const [passwordValidation, setPasswordValidation] = React.useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        if (isLogin) {
          // Simulate login
          const userData = {
            id: Date.now().toString(),
            name: formData.name || 'User',
            email: formData.email,
            role: 'member'
          };
          onLogin(userData);
        } else {
          // Simulate signup
          const userData = {
            id: Date.now().toString(),
            name: formData.name,
            username: formData.username,
            phone: formData.phone,
            email: formData.email,
            emoji: formData.emoji,
            role: 'creator'
          };
          onLogin(userData);
        }
      } catch (error) {
        alert('Authentication failed. Please try again.');
      }
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      setPasswordValidation(PasswordValidator.validatePassword(value));
    }
  };

  const emojis = ['😊', '😎', '🤓', '😄', '🙂', '😇', '🤗', '😋', '🤔', '😌', '🥳', '🤩'];

    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8" data-name="auth-page" data-file="components/AuthPage.js">
        <div className="max-w-md w-full space-y-6 animate-slide-in">
          <div>
            <div className="mx-auto h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <div className="icon-users text-white text-xl"></div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required={!isLogin}
                        className="input-field mt-1"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required={!isLogin}
                        className="input-field mt-1"
                        placeholder="What should we call you?"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="input-field mt-1"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Your Emoji
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl bg-gray-100 p-2 rounded-lg">{formData.emoji}</div>
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="btn-secondary text-sm"
                      >
                        Change
                      </button>
                    </div>
                    {showEmojiPicker && (
                      <div className="mt-2 grid grid-cols-6 gap-2 p-3 bg-gray-50 rounded-lg">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setFormData({...formData, emoji});
                              setShowEmojiPicker(false);
                            }}
                            className="text-2xl p-2 hover:bg-gray-200 rounded"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field mt-1"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field mt-1"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {!isLogin && passwordValidation && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${PasswordValidator.getStrengthColor(passwordValidation.strength)}`}
                          style={{width: `${(passwordValidation.score / 5) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 capitalize">{passwordValidation.strength}</span>
                    </div>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    className="input-field mt-1"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary w-full text-base py-3 animate-pulse-hover"
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AuthPage component error:', error);
    return null;
  }
}