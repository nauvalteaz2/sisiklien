import React from 'react';

const ReportDetail = ({ report }) => {
  return (
    <div className="mt-6 p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold mb-2">Detail Mahasiswa</h2>
      <p><strong>Title:</strong> {report.title}</p>
      <p><strong>Detail:</strong> {report.report}</p>
    </div>
  );
};

export default ReportDetail;
