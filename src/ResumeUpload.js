import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import pdf from 'pdf-parse';
import './ResumeUpload.css';

function ResumeUpload() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [financeQual, setFinanceQual] = useState([]);
  const [financeAnalysis, setFinanceAnalysis] = useState([]);
  const [financeSoftware, setFinanceSoftware] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles);
    },
    accept: 'application/pdf',
  });

  const handleUpload = async () => {
    setUploadStatus('Uploading...');
    try {
      const pdfData = await pdf(files[0]);
      setUploadStatus('Upload Successful!');
      console.log(pdfData.text);
      
      // Extract financial qualifications
      const financeQualRegex = /(CFA|CPA|MBA|CA|Financial Analyst|Finance|Accounting)/gi;
      setFinanceQual(pdfData.text.match(financeQualRegex));

      // Extract financial analysis experience
      const financeAnalysisRegex = /(Financial Analysis|Budgeting|Forecasting|Investment|Portfolio)/gi;
      setFinanceAnalysis(pdfData.text.match(financeAnalysisRegex));

      // Extract experience with financial software
      const financeSoftwareRegex = /(Excel|SAP|QuickBooks|Oracle|FinancialForce)/gi;
      setFinanceSoftware(pdfData.text.match(financeSoftwareRegex));
    } catch (err) {
      setUploadStatus('Upload Failed');
      console.error(err);
    }
  }

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop a PDF resume here, or click to select a file.</p>
</div>
<div>
<button onClick={handleUpload}>Upload and Extract Text</button>
<p>{uploadStatus}</p>
<div>
<p>Financial Qualifications: {financeQual.join(', ')}</p>
<p>Financial Analysis Experience: {financeAnalysis.join(', ')}</p>
<p>Experience with Financial Software: {financeSoftware.join(', ')}</p>
</div>
</div>
</div>
);
}

export default ResumeUpload;