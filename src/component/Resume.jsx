// src/Resume.js
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const Resume = () => {
  const resumeRef = useRef();

  const handleDownloadAndSharePDF = async () => {
    const element = resumeRef.current;

    // Generate PDF as a blob
    const pdfOptions = {
      margin: 1,
      filename: 'resume.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { format: 'a4', orientation: 'portrait' },
    };

    const pdfBlob = await new Promise((resolve, reject) => {
      html2pdf()
        .from(element)
        .set(pdfOptions)
        .outputPdf('blob')
        .then(resolve)
        .catch(reject);
    });

    // Check if Web Share API is available for direct sharing
    if (navigator.share) {
      const file = new File([pdfBlob], 'resume.pdf', { type: 'application/pdf' });
      const filesArray = [file];

      try {
        await navigator.share({
          title: 'My Resume',
          text: 'Check out my resume!',
          files: filesArray,
        });
      } catch (error) {
        console.error('Error sharing the PDF:', error);
      }
    } else {
      // If Web Share API isn't supported, fallback to download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Resume Template */}
      <div ref={resumeRef} style={{ border: '1px solid #ddd', padding: '20px', width: '60%', margin: 'auto', backgroundColor: '#f9f9f9' }}>
        <h1>John Doe</h1>
        <p>Full Stack Developer</p>
        <h3>About Me</h3>
        <p>Experienced developer with expertise in MERN stack and a passion for learning new technologies.</p>
        <h3>Skills</h3>
        <ul>
          <li>React.js</li>
          <li>Node.js</li>
          <li>HTML/CSS</li>
        </ul>
        <h3>Experience</h3>
        <p>Full Stack Developer at XYZ Company</p>
      </div>

      {/* Download and Share Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handleDownloadAndSharePDF} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Download & Share PDF
        </button>
      </div>
    </div>
  );
};

export default Resume;
