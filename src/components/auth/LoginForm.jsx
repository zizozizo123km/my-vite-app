import React, { useState, useCallback } from 'react';
import { Mail, LockClosed, ArrowPath, ExclamationCircle } from '@heroicons/react/24/outline';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * LoginForm Component
 * A production-ready login form component featuring state management,
 * client-side validation, loading states, and modern Tailwind CSS styling.
 */
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  /**
   * Client-side validation logic.
   * @returns {boolean} True if validation passes, false otherwise.
   */
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب.';
      isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  /**
   * Handles input changes and updates the form state.
   */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setApiError(null); // Clear API error on interaction
  }, [errors]);

  /**
   * Handles form submission. Simulates an API call.
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError(null);

    // --- Simulation of API Call ---
    try {
      // Replace this with your actual API call (e.g., axios.post('/api/login', formData))
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData.email === 'test@fail.com') {
        throw new Error('بيانات الاعتماد غير صحيحة. يرجى المحاولة مرة أخرى.');
      }

      // Success handling (e.g., redirect, store token)
      console.log('Login Successful:', formData);
      // window.location.href = '/dashboard'; // Example redirect

    } catch (error) {
      setApiError(error.message || 'حدث خطأ غير متوقع أثناء تسجيل الدخول.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  /**
   * Renders a styled input field with icon and error handling.
   */
  const renderInputField = (name, type, placeholder, Icon) => (
    <div className="mb-4">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id={name}
          name={name}
          type={type}
          required
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg shadow-sm transition duration-150
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            ${errors[name] ? 'border-red-500 pr-10' : 'border-gray-300'}
            text-right
          `}
          dir="rtl"
        />
        {errors[name] && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <ExclamationCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 text-right">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">تسجيل الدخول</h2>
        <p className="mt-2 text-sm text-gray-600">
          أدخل بياناتك للوصول إلى حسابك.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Error Display */}
        {apiError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-right flex items-center justify-end">
            <span className="mr-2">{apiError}</span>
            <ExclamationCircle className="w-5 h-5" />
          </div>
        )}

        {/* Email Input */}
        {renderInputField('email', 'email', 'البريد الإلكتروني', Mail)}

        {/* Password Input */}
        {renderInputField('password', 'password', 'كلمة المرور', LockClosed)}

        {/* Remember Me / Forgot Password Section */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ml-2"
              disabled={isLoading}
            />
            <label htmlFor="remember-me" className="text-gray-900 select-none">
              تذكرني
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
            >
              نسيت كلمة المرور؟
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white transition duration-200
              ${isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }
            `}
          >
            {isLoading ? (
              <>
                <ArrowPath className="w-5 h-5 mr-2 animate-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ليس لديك حساب؟{' '}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            إنشاء حساب جديد
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;