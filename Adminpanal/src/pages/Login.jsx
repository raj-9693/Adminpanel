import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { AlertIcon, EyeIcon, EyeOffIcon, SparkleIcon } from '../components/Icons';
import { loginDefaults } from '../data/dummyData';
import '../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(loginDefaults.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <section className="login__left">
        <Logo />

        <div className="login__hero">
          <p className="login__eyebrow">Studio operations</p>
          <h1 className="login__title">Every bride’s day, beautifully coordinated.</h1>
          <p className="login__sub">
            A calm workspace for the team behind Saanjh’s most memorable beauty rituals.
          </p>
        </div>

        <div className="login__tag">
          <SparkleIcon />
          <span>Thoughtful service, precisely managed.</span>
        </div>
      </section>

      <section className="login__right">
        <form className="login-card" onSubmit={handleSubmit}>
          <p className="login-card__welcome">Welcome back</p>
          <h2 className="login-card__title">Sign in to your studio</h2>

          {/* Error banner — design me dikh raha hai. Hatana ho to ye block delete kar do */}
          <div className="alert" role="alert">
            <AlertIcon />
            <span>We couldn’t sign you in. Please check your details and try again.</span>
          </div>

          <div className="field">
            <div className="field__row">
              <label className="field__label" htmlFor="email">Work email</label>
            </div>
            <input
              id="email" type="email" className="field__input"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <div className="field__row">
              <label className="field__label" htmlFor="password">Password</label>
              <a href="#forgot" className="field__link">Forgot password?</a>
            </div>
            <div className="field__control">
              <input
                id="password" className="field__input" placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button" className="field__eye" aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">Sign in</button>

          <p className="login-card__foot">
            Protected studio workspace · Need access? Contact your studio lead.
          </p>
        </form>
      </section>
    </div>
  );
}
