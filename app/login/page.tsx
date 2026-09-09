 "use client";

import { useState } from "react";
import { CarFront, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function continueLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setSent(true);
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="brand"><CarFront size={28} /> CabGo</div>
        <div className="visual-copy">
          <span className="eyebrow">SMART • SAFE • SIMPLE</span>
          <h1>Your journey,<br /><em>your way.</em></h1>
          <p>Book reliable rides, add stops, split payments and stay connected from pickup to destination.</p>
          <div className="trust-row">
            <span><ShieldCheck size={17}/> Secure payments</span>
            <span><MapPin size={17}/> Live tracking</span>
          </div>
        </div>
        <div className="road-art">
          <div className="map-grid"/>
          <div className="route-line"/>
          <div className="map-pin pin-a">A</div>
          <div className="map-pin pin-b">B</div>
          <div className="car-dot"><CarFront size={20}/></div>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-brand brand"><CarFront size={25}/> CabGo</div>
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Book your next ride</h2>
          <p className="muted">Sign in with your mobile number to continue.</p>

          <form onSubmit={continueLogin}>
            <label>Mobile number</label>
            <div className="phone-input">
              <span>+91</span>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Enter mobile number"
                inputMode="numeric"
              />
            </div>

            {!sent ? (
              <button className="primary-btn" type="submit">
                Continue <ArrowRight size={18}/>
              </button>
            ) : (
              <>
                <div className="otp-note">Demo OTP sent. Use any 4 digits.</div>
                <input className="text-input" placeholder="Enter OTP" maxLength={4} />
                <button className="primary-btn" type="button" onClick={() => router.push("/customer/dashboard")}>
                  Enter CabGo <ArrowRight size={18}/>
                </button>
              </>
            )}
          </form>

          <p className="legal">By continuing, you agree to our Terms and Privacy Policy.</p>
        </div>
      </section>
    </main>
  );
}