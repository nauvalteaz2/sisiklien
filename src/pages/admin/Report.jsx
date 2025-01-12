import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Table from '../../components/Table';
import Button from '../../components/Button';
import axios from 'axios'; // Pastikan axios sudah diinstall
import ReportDetail from './ReportDetail';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const API_URL = 'http://localhost/api-new';
  
  // Ambil token dari localStorage atau state management Anda
  const token = localStorage.getItem('authToken'); // Sesuaikan dengan cara Anda menyimpan token
  
  // Konfigurasi axios
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  // Fetch data report saat komponen dimount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/report.php`, axiosConfig);
      if (response.data.success) {
        setReports(response.data.data); // Data reports
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch reports', 'error');
      console.error('Error fetching reports:', error);
    }
  };
  

  const handleAddReport = () => {
    Swal.fire({
      title: 'Enter report Details',
      html: `
        <input 
          type="text" 
          id="title" 
          class="swal2-input" 
          placeholder="Enter Report Title" 
          style="
          width: 100%;
          font-size: 16px; 
          box-sizing: border-box;
          margin-bottom: 10px;
          "
        >
        <textarea 
          id="report" 
          class="swal2-textarea" 
          placeholder="Enter Report Detail" 
          style="
            width: 100%; 
            height: 100px; 
            font-size: 16px; 
            resize: none; 
            overflow: auto;
            box-sizing: border-box;
          "></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value;
        const report = Swal.getPopup().querySelector('#report').value;
    
        if (!title || !report) {
          Swal.showValidationMessage('Please fill all fields');
        }
    
        return { title, report };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${API_URL}/report.php`, result.value, axiosConfig);
          if (response.data.success) {
            await fetchReports(); // Refresh data
            Swal.fire('Success', response.data.message, 'success');
          } else {
            Swal.fire('Error', response.data.message, 'error');
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to add report', 'error');
          console.error('Error adding report:', error);
        }
      }
    });
  };
  

  const handleEditReport = (index) => {
    const report = reports[index];
    Swal.fire({
      title: 'Edit Report Details',
      html: `
        <input 
          type="text" 
          id="title" 
          class="swal2-input" value = "${report.title}"
          placeholder="Enter Report Title" 
          style="
          width: 100%;
          font-size: 16px; 
          box-sizing: border-box;
          margin-bottom: 10px;
          "
        >
        <textarea 
          id="report" 
          class="swal2-textarea" 
          placeholder="Enter Report Detail" 
          style="
            width: 100%; 
            height: 100px; 
            font-size: 16px; 
            resize: none; 
            overflow: auto;
            box-sizing: border-box;
          ">${report.report}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value;
        const reportText = Swal.getPopup().querySelector('#report').value;
  
        if (!title || !reportText) {
          Swal.showValidationMessage('Please fill all fields');
        }
        return { title, report: reportText };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${API_URL}/report.php?id=${report.id}`,
            result.value,
            axiosConfig
          );
          await fetchReports();
          Swal.fire('Success', 'Report updated successfully', 'success');
        } catch (error) {
          Swal.fire('Error', 'Failed to update report', 'error');
          console.error('Error updating report:', error);
        }
      }
    });
  };
  
  const handleDeleteReport = (index) => {
    const report = reports[index];
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${API_URL}/report.php?id=${report.id}`,
            axiosConfig
          );
          await fetchReports();
          Swal.fire('Deleted!', 'Report has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Failed to delete report', 'error');
          console.error('Error deleting report:', error);
        }
      }
    });
  };
  

  const handleDetailReport = (index) => {
    setSelectedReport(reports[index]);
  };

  return (
    <div className="pl-6">
      <h1 className="text-2xl font-bold mb-6">Report</h1>
      <Button style="primary" text="Add Report" onClick={handleAddReport} />
      <Table
        data={reports}
        onEdit={handleEditReport}
        onDelete={handleDeleteReport}
        onDetail={handleDetailReport}
      />
      {selectedReport && <ReportDetail report={selectedReport} />}
    </div>
  );
};

export default Report;