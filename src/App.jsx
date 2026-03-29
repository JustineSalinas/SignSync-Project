import SignZoneCamera from './components/SignZoneCamera';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Sign-to-Text Interface</h1>
        <p className="text-slate-400">Please position yourself within the camera frame.</p>
      </div>
      
      <SignZoneCamera />
    </div>
  );
}

export default App;
