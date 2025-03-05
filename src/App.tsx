import AudioController from './components/AudioController';
import TextEditor from './components/TextEditor';
import ZoomText from './components/ZoomText';
import { useState } from 'react';

function App() {
  const [text, setText] = useState("");

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-center">
      {text ? (
        <div className="w-full h-full">
          <AudioController />
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            <div className='flex items-center justify-center min-h-screen -translate-y-1/13'>
              <ZoomText text={text} setText={setText} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <TextEditor setText={setText} />
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
      </div>
    </div>
  );
}

export default App;
