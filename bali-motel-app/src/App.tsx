import { useState } from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { ConfirmScreen } from "./screens/ConfirmScreen";
import { DoneScreen } from "./screens/DoneScreen";
import { buildWhatsappLink } from "./utils/whatsapp";
import { MOTEL_PHONE_TEL } from "./config";
import type { Booking, ConfirmMode, Flow, Screen, Suite } from "./types";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [flow, setFlow] = useState<Flow>("agora");
  const [suite, setSuite] = useState<Suite | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>("mensagem");
  const [booking, setBooking] = useState<Booking | null>(null);

  function resetAndGoHome() {
    setScreen("home");
    setSuite(null);
    setDate("");
    setTime("");
    setName("");
    setConfirmMode("mensagem");
    setBooking(null);
  }

  function handleSend(finishedBooking: Booking) {
    setBooking(finishedBooking);
    if (finishedBooking.confirmMode === "mensagem") {
      window.open(buildWhatsappLink(finishedBooking), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `tel:${MOTEL_PHONE_TEL}`;
    }
    setScreen("done");
  }

  if (screen === "home") {
    return (
      <HomeScreen
        flow={flow}
        onFlowChange={setFlow}
        onSelectSuite={(s) => {
          setSuite(s);
          setScreen("detail");
        }}
      />
    );
  }

  if (screen === "detail" && suite) {
    return (
      <DetailScreen
        suite={suite}
        flow={flow}
        date={date}
        time={time}
        onDateChange={setDate}
        onTimeChange={setTime}
        onBack={() => setScreen("home")}
        onContinue={() => setScreen("confirm")}
      />
    );
  }

  if (screen === "confirm" && suite) {
    return (
      <ConfirmScreen
        suite={suite}
        flow={flow}
        date={date}
        time={time}
        name={name}
        confirmMode={confirmMode}
        onNameChange={setName}
        onConfirmModeChange={setConfirmMode}
        onBack={() => setScreen("detail")}
        onSend={handleSend}
      />
    );
  }

  if (screen === "done" && booking) {
    return <DoneScreen booking={booking} onNewBooking={resetAndGoHome} />;
  }

  return (
    <HomeScreen
      flow={flow}
      onFlowChange={setFlow}
      onSelectSuite={(s) => {
        setSuite(s);
        setScreen("detail");
      }}
    />
  );
}

export default App;
