import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { FaUserShield, FaEnvelope, FaLock, FaSpinner, FaArrowRight } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/administration_and_development" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      await login(email, password);
      toast.success('Access Granted. Operations Link established.');
      navigate('/administration_and_development', { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authorization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-eazypost-blue skew-x-12 translate-x-1/2 opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-eazypost-red skew-x-12 -translate-x-1/2 opacity-5"></div>

      <div className="max-w-md w-full mx-4 relative">
        <div className="bg-white shadow-2xl overflow-hidden border-t-8 border-eazypost-blue">
          <div className="p-6 sm:p-10">
            <div className="flex justify-center mb-10 scale-125">
              <Logo />
            </div>

            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-eazypost-blue uppercase tracking-tight flex items-center justify-center gap-3">
                <Icon icon={FaUserShield} className="text-eazypost-red" />
                SECURE ACCESS
              </h2>
              <div className="w-12 h-1 bg-eazypost-red mx-auto mt-4"></div>
              <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                Logistics Command & Manifest Operations Control
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-eazypost-blue transition-colors">
                    <Icon icon={FaEnvelope} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-b-2 border-gray-100 focus:border-eazypost-blue focus:outline-none font-bold text-xs uppercase tracking-widest transition-all"
                    placeholder="OPERATOR EMAIL"
                  />
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-eazypost-blue transition-colors">
                    <Icon icon={FaLock} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-b-2 border-gray-100 focus:border-eazypost-blue focus:outline-none font-bold text-xs uppercase tracking-widest transition-all"
                    placeholder="ACCESS CREDENTIALS"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-5 px-4 bg-eazypost-blue text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-eazypost-red transition-all shadow-xl hover:shadow-eazypost-red/20 group disabled:opacity-50"
              >
                {isLoading ? (
                  <Icon icon={FaSpinner} className="animate-spin text-lg" />
                ) : (
                  <>
                    Initialize Connection
                    <Icon icon={FaArrowRight} className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Authorized Personnel Only - System Access Logged
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
          EazyPost LLC &reg; Global Intelligence Network
        </p>
      </div>
    </div>
  );
};

export default Login;