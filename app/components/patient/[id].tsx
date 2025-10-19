import { useLocalSearchParams } from "expo-router"
import Patient from "./Patient";

const PatientScreen = () => {
  const { data } = useLocalSearchParams();
  let parsed = null;

  try {
    const decoded = decodeURIComponent(data);
    parsed = JSON.parse(decoded);
  } catch (error) {
    console.warn("Failed to decode or parse data, using raw:", error);
    try {
      parsed = JSON.parse(data); // Fallback in case it's already decoded
    } catch (e) {
      console.error("Still failed to parse data:", e);
      return null;
    }
  }

  return (
    <Patient
      appointment={parsed}
      patient={parsed.patient}
    />
  );
};

export default PatientScreen;
