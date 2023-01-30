import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload';

function App() {
  const [success, setSuccess] = useState('');

  const handleSuccess = (message) => {
    setSuccess(message);
  }

  return (
    <div>
      <ResumeUpload onSuccess={handleSuccess} />
      { success && <p>{success}</p> }
    </div>
  );
}

export default App;