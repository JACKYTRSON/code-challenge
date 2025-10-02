import SwapForm from "@/components/swap-form";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="h-full flex justify-center items-center">
      <SwapForm />
      <Toaster />
    </div>
  );
}

export default App;
