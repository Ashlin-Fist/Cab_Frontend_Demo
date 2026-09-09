 "use client";

import { useState } from "react";
import { ArrowLeft, CarFront, Check, Clock3, MapPin, Plus, ShieldCheck, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const cars = [
  { name: "CabGo Economy", seats: 4, time: "3 min", price: "₹420", desc: "Affordable everyday rides" },
  { name: "CabGo Comfort", seats: 4, time: "5 min", price: "₹560", desc: "More space and comfort" },
  { name: "CabGo XL", seats: 6, time: "8 min", price: "₹820", desc: "For groups and luggage" }
];

export default function BookPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [split, setSplit] = useState(false);
  const [stops, setStops] = useState<string[]>([]);

  return (
    <div className="booking-page">
      <header className="booking-header"><button onClick={() => router.back()}><ArrowLeft/> Back</button><div className="brand"><CarFront size={24}/> CabGo</div><span>Secure booking</span></header>
      <div className="book-layout">
        <section>
          <span className="eyebrow">STEP 1 OF 2</span><h1>Choose your ride</h1><p className="muted">Transparent pricing — the fare shown here is the fare attached to your ride.</p>
          <div className="trip-summary">
            <div><span className="dot pickup"/><div><small>FROM</small><b>Current location</b></div></div>
            {stops.map((_, i) => <div key={i}><span className="dot stop-dot"/><div><small>STOP {i+1}</small><b>Optional stop</b></div></div>)}
            <div><span className="dot drop"/><div><small>TO</small><b>Manipal</b></div></div>
          </div>
          <button className="add-stop" onClick={() => setStops([...stops, ""]) }><Plus size={16}/> Add a middle stop</button>

          <div className="ride-options">
            {cars.map((car, i) => <button key={car.name} className={`car-option ${selected === i ? "selected" : ""}`} onClick={() => setSelected(i)}>
              <div className="car-image"><CarFront size={43}/></div><div className="car-info"><b>{car.name}</b><small>{car.desc}</small><span><Users size={14}/> {car.seats} seats · <Clock3 size={14}/> {car.time} away</span></div><strong>{car.price}</strong>{selected === i && <div className="selected-check"><Check size={14}/></div>}
            </button>)}
          </div>
        </section>

        <aside className="fare-panel">
          <div className="fare-head"><span className="eyebrow">FARE SUMMARY</span><ShieldCheck size={19}/></div>
          <div className="fare-route"><span>Current location</span><b>→</b><span>Manipal</span></div>
          <div className="fare-lines"><div><span>Base fare</span><b>₹350</b></div><div><span>Distance & time</span><b>₹100</b></div><div><span>Platform fee</span><b>₹20</b></div></div>
          <div className="promo"><input placeholder="Promo code"/><button>Apply</button></div>
          <div className="total"><span>Total fare</span><strong>{cars[selected].price}</strong></div>
          <label className="split-toggle"><input type="checkbox" checked={split} onChange={e => setSplit(e.target.checked)}/><span>Split payment with passengers</span></label>
          {split && <div className="split-box"><b>Split pay</b><p>Invite passengers after booking and divide the final fare between them.</p><div>Example: 4 passengers · ₹105 each</div></div>}
          <button className="primary-btn confirm" onClick={() => router.push("/customer/dashboard")}>Confirm booking</button>
          <small className="fine-print">The final fare is stored against this ride and displayed consistently to the passenger and assigned driver.</small>
        </aside>
      </div>
    </div>
  );
}