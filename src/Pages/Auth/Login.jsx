import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ChefHat, Utensils } from 'lucide-react';
import axios from 'axios';
const BaseURrl = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true); 
    if (!validateForm()) return;
    
    try {
        const res= await axios.post(`${BaseURrl}/v1/api/users/login`,{
            email:formData.email,
            password: formData.password
        })  
        
        alert('Đăng nhập thành công! (Demo)');
        setIsLoading(false)
    } catch (error) {
        console.log(error.response.data.message)
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width:'100%',
      background: 'linear-gradient(135deg, #fed7aa 0%, #fef2f2 50%, #fce7f3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '80px',
          color: '#fed7aa',
          opacity: 0.2
        }}>
          <Utensils size={120} />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '80px',
          color: '#fca5a5',
          opacity: 0.2
        }}>
          <ChefHat size={100} />
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '40px',
          color: '#f9a8d4',
          opacity: 0.15
        }}>
          <Utensils size={80} />
        </div>
      </div>

      {/* Login Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '28rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Logo Section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(to right, #f97316, #ef4444)',
              borderRadius: '16px',
              marginBottom: '16px'
            }}>
              <ChefHat color="white" size={32} />
            </div>
            <h1 style={{
              fontSize: '30px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ea580c, #dc2626)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '0 0 8px 0'
            }}>
              FoodieHub
            </h1>
            <p style={{
              color: '#4b5563',
              marginTop: '8px',
              margin: 0
            }}>Khám phá và đặt món yêu thích</p>
          </div>

          {/* Login Form */}
          <div>
            {/* Email Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <Mail size={16} color="#6b7280" />
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: errors.email ? '2px solid #fca5a5' : '2px solid #e5e7eb',
                    transition: 'all 0.3s',
                    outline: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(4px)',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    color:'#000'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.email ? '#ef4444' : '#f97316';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? '#fca5a5' : '#e5e7eb';
                  }}
                />
              </div>
              {errors.email && (
                <p style={{
                  color: '#ef4444',
                  fontSize: '12px',
                  marginTop: '4px',
                  margin: '4px 0 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <Lock size={16} color="#6b7280" />
                Mật khẩu
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '12px 48px 12px 16px',
                    borderRadius: '12px',
                    border: errors.password ? '2px solid #fca5a5' : '2px solid #e5e7eb',
                    transition: 'all 0.3s',
                    outline: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(4px)',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                     color:'#000'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.password ? '#ef4444' : '#f97316';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? '#fca5a5' : '#e5e7eb';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280',
                    transition: 'color 0.3s',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#374151'}
                  onMouseOut={(e) => e.target.style.color = '#6b7280'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p style={{
                  color: '#ef4444',
                  fontSize: '12px',
                  marginTop: '4px',
                  margin: '4px 0 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px',
              marginBottom: '24px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <input 
                  type="checkbox" 
                  style={{
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    accentColor: '#f97316'
                  }}
                />
                <span style={{ color: '#4b5563' }}>Ghi nhớ đăng nhập</span>
              </label>
              <button
                type="button"
                style={{
                  color: '#ea580c',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.target.style.color = '#c2410c'}
                onMouseOut={(e) => e.target.style.color = '#ea580c'}
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#fed7aa' : 'linear-gradient(to right, #f97316, #ef4444)',
                color: '#ffffff',
                fontWeight: '600',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                outline: 'none',
                transition: 'all 0.3s',
                transform: isLoading ? 'none' : 'scale(1)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '32px'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.background = 'linear-gradient(to right, #ea580c, #dc2626)';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.background = 'linear-gradient(to right, #f97316, #ef4444)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </div>

          {/* Social Login */}
          <div style={{ marginTop: '32px' }}>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: '#e5e7eb'
              }}></div>
              <div style={{
                position: 'relative',
                textAlign: 'center',
                fontSize: '14px'
              }}>
                <span style={{
                  padding: '0 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: '#6b7280'
                }}>Hoặc đăng nhập bằng</span>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '32px'
            }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                transition: 'background-color 0.3s',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                gap: '8px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                transition: 'background-color 0.3s',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                gap: '8px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#4b5563',
              margin: 0,
              fontSize: '14px'
            }}>
              Chưa có tài khoản?{' '}
              <button style={{
                color: '#ea580c',
                fontWeight: '600',
                transition: 'color 0.3s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onMouseOver={(e) => e.target.style.color = '#c2410c'}
              onMouseOut={(e) => e.target.style.color = '#ea580c'}
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation for spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;