import React, { useState } from 'react';
import axios from 'axios';

const ReportIssue = ({ busId }) => {
  const [issue, setIssue] = useState('');

  const handleReport = async () => {
    try {
      await axios.post('YOUR_API_URL/report', { busId, issue });
      alert('Issue reported successfully');
      setIssue('');
    } catch (error) {
      console.error("Error reporting issue", error);
    }
  };

  return (
    <div className="p-4">
      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="textarea textarea-bordered w-full"
        placeholder="Describe the issue with the bus/driver"
      />
      <button onClick={handleReport} className="btn btn-danger mt-2">Report Issue</button>
    </div>
  );
};

export default ReportIssue;
