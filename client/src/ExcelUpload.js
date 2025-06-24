import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Bar, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'
  const chartContainerRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose an Excel file");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/excel/upload', formData);
      alert("File uploaded successfully!");
      setExcelData(res.data.data);

      const firstRow = res.data.data[0];
      const keys = firstRow ? Object.keys(firstRow) : [];
      setColumns(keys);
    } catch (err) {
      console.error("Frontend Upload Error:", err.response || err.message);
      alert("Upload failed");
    }
  };

  const chartData = {
    labels: excelData.map(row => row[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: excelData.map(row => parseFloat(row[yAxis]) || 0),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleExportPDF = async () => {
    const chartNode = chartContainerRef.current;
    if (!chartNode) return alert("Chart not ready");

    const canvas = await html2canvas(chartNode);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
    pdf.save('chart_export.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {columns.length > 0 && (
        <div className="mt-6 flex gap-4 items-center flex-wrap">
          <label className="flex flex-col">
            <span className="font-medium">X-Axis:</span>
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="font-medium">Y-Axis:</span>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="font-medium">Chart Type:</span>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
            </select>
          </label>
        </div>
      )}

      {excelData.length > 0 && xAxis && yAxis && (
        <motion.div
          ref={chartContainerRef}
          className="mt-10 bg-gray-50 p-4 rounded shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {chartType === 'bar' ? <Bar data={chartData} /> : <Pie data={chartData} />}

          <button
            onClick={handleExportPDF}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export Chart as PDF
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ExcelUpload;