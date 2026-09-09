 "use client";

import { useState } from "react";
import {
  Bell, CarFront, ChevronDown, Clock3, CreditCard, Home, MapPin,
  Menu, MessageCircle, Navigation, Plus, Search, ShieldCheck, Sparkles,
  Star, UserRound, X, Zap
} from "lucide-react";
import { useRouter } from "next/navigation";

const recent = [
  { from: "Udupi", to: "Manipal", date: "Today, 9:20 AM", fare: "₹420", status: "Completed" },
  { from: "Mangaluru Airport", to: "Udupi", date: "Sep 07, 6:10 PM", fare: "₹1,650", status: "Completed" },
  { from: "Udupi", to: "Kundapura", date: "Sep 05, 8:45 AM", fare: "₹980", status: "Completed" }
];

export default function Dashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [from, setFrom] = useState("Current location");
  const [to, setTo] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [aiOpen, setAiOpen] = useState(false);

  function addStop() { setStops([...stops, ""]); }
  function updateStop(i: number, value: string) {
    const next = [...stops]; next[i] = value; setStops(next);
  }
  function removeStop(i: number) {
    setStops(stops.filter((_, index) => index !== i));
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand side-brand"><CarFront size={25}/> CabGo</div>
        <button className="close-menu" onClick={() => setMenuOpen(false)}><X/></button>
        <nav>
          <a className="active"><Home size={18}/> Overview</a>
          <a onClick={() => router.push("/customer/book")}><Navigation size={18}/> Book a ride</a>
          <a><Clock3 size={18}/> My rides</a>
          <a><CreditCard size={18}/> Payments</a>
          <a><MessageCircle size={18}/> Messages</a>
          <a><Star size={18}/> Rewards</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-user"><div className="avatar">AF</div><div><b>Alex</b><small>Passenger</small></div><ChevronDown size={15}/></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)}><Menu/></button>
          <div>
            <span className="muted small">Wednesday, September 9</span>
            <h3>Good morning, Alex 👋</h3>
          </div>
          <div className="top-actions">
            <button className="icon-btn"><Bell size={19}/><i/></button>
            <div className="top-avatar">AF</div>
          </div>
        </header>

        <section className="hero">
          <div>
            <span className="eyebrow">READY WHEN YOU ARE</span>
            <h1>Where are you<br/><em>going today?</em></h1>
            <p>Comfortable rides with transparent pricing and live tracking.</p>
          </div>
          <div className="hero-car"><CarFront size={100}/></div>
        </section>

        <section className="booking-grid">
          <div className="booking-card">
            <div className="card-heading">
              <div><span className="eyebrow">NEW RIDE</span><h2>Plan your journey</h2></div>
              <span className="secure-pill"><ShieldCheck size={14}/> Fare protected</span>
            </div>

            <div className="location-flow">
              <div className="timeline"><span className="dot pickup"/><span className="connector"/><span className="dot drop"/></div>
              <div className="location-fields">
                <label>FROM</label>
                <div className="location-input"><MapPin size={18}/><input value={from} onChange={e => setFrom(e.target.value)}/></div>

                {stops.map((stop, i) => (
                  <div key={i} className="stop-row">
                    <label>STOP {i + 1}</label>
                    <div className="location-input stop"><Plus size={16}/><input value={stop} onChange={e => updateStop(i, e.target.value)} placeholder="Add a stop"/><button onClick={() => removeStop(i)}><X size={14}/></button></div>
                  </div>
                ))}

                <label>TO</label>
                <div className="location-input"><MapPin size={18}/><input value={to} onChange={e => setTo(e.target.value)} placeholder="Search destination"/></div>
              </div>
            </div>

            <div className="suggestion-row">
              <button onClick={() => setTo("Mangaluru International Airport")}><Zap size={15}/> Airport</button>
              <button onClick={() => setTo("Manipal")}>Popular: Manipal</button>
              <button onClick={addStop}><Plus size={15}/> Add stop</button>
            </div>

            <div className="booking-options">
              <div><span>Pickup</span><b>Now</b></div>
              <div><span>Passengers</span><b>1 passenger</b></div>
              <button className="primary-btn" onClick={() => router.push("/customer/book")}>See ride options <Search size={17}/></button>
            </div>
          </div>

          <div className="map-card">
            <div className="map-toolbar"><span><Navigation size={15}/> Live map</span><button>Full screen</button></div>
            <div className="fake-map">
              <div className="map-roads r1"/><div className="map-roads r2"/><div className="map-roads r3"/>
              <div className="map-label l1">Udupi</div><div className="map-label l2">Manipal</div><div className="map-label l3">Malpe</div>
              <div className="route-map"/>
              <div className="map-pin big pickup-pin">A</div>
              <div className="map-pin big destination-pin">B</div>
            </div>
            <div className="map-footer"><span><span className="live-dot"/> GPS ready</span><span>ETA updates automatically</span></div>
          </div>
        </section>

        <section className="quick-grid">
          <div className="quick-card offer"><div className="quick-icon"><Sparkles/></div><div><b>Save on your next ride</b><p>Use <strong>WELCOME300</strong> for ₹300 off</p></div><button>Use offer</button></div>
          <div className="quick-card"><div className="quick-icon"><ShieldCheck/></div><div><b>Ride with confidence</b><p>Verified drivers and secure payments.</p></div></div>
          <div className="quick-card"><div className="quick-icon"><MessageCircle/></div><div><b>Need help?</b><p>Chat with CabGo support.</p></div></div>
        </section>

        <section className="recent-section">
          <div className="section-title"><div><span className="eyebrow">ACTIVITY</span><h2>Recent rides</h2></div><button>View all</button></div>
          <div className="rides-table">
            {recent.map((ride, i) => <div className="ride-row" key={i}>
              <div className="ride-icon"><CarFront size={18}/></div>
              <div className="ride-route"><b>{ride.from} <span>→</span> {ride.to}</b><small>{ride.date}</small></div>
              <span className="status">{ride.status}</span><b className="ride-fare">{ride.fare}</b><ChevronDown className="chev" size={17}/>
            </div>)}
          </div>
        </section>
      </main>

      <button className="ai-fab" onClick={() => setAiOpen(!aiOpen)}><Sparkles size={19}/><span>Ask CabGo AI</span></button>
      {aiOpen && <div className="ai-panel"><div className="ai-head"><div><Sparkles size={17}/> CabGo AI</div><button onClick={() => setAiOpen(false)}><X size={17}/></button></div><div className="ai-body"><div className="ai-message">Hi Alex! I can book rides, suggest stops and restaurants, estimate fares, or help with your current trip.</div><div className="ai-suggestions"><button>Book a ride</button><button>Find restaurants</button><button>Plan a trip</button></div></div><div className="ai-input"><input placeholder="Ask anything..."/><button><Navigation size={16}/></button></div></div>}
    </div>
  );
}