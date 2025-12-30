import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { formatCurrency, formatDate } from './formatters';

// Export Transactions to PDF
export const exportTransactionsToPDF = (transactions, stats, userName) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129);
  doc.text('Budget Tracker - Transaction Report', 14, 20);

  // Add user info
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated for: ${userName}`, 14, 30);
  doc.text(`Date: ${formatDate(new Date())}`, 14, 35);

  // Add summary box
  doc.setFillColor(16, 185, 129);
  doc.rect(14, 45, 182, 30, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(`Total Income: ${formatCurrency(stats?.totalIncome || 0)}`, 20, 55);
  doc.text(`Total Expense: ${formatCurrency(stats?.totalExpense || 0)}`, 20, 63);
  doc.text(`Balance: ${formatCurrency(stats?.balance || 0)}`, 20, 71);

  // Add transactions table
  const tableData = transactions.map((t) => [
    formatDate(t.date),
    t.type.toUpperCase(),
    t.category,
    t.description || '-',
    formatCurrency(t.amount),
    t.paymentMethod,
  ]);

  autoTable(doc, {
    head: [['Date', 'Type', 'Category', 'Description', 'Amount', 'Payment']],
    body: tableData,
    startY: 85,
    theme: 'grid',
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save PDF
  doc.save(`transactions_${new Date().getTime()}.pdf`);
};

// Export Transactions to Excel
export const exportTransactionsToExcel = (transactions, stats) => {
  // Create summary sheet
  const summaryData = [
    ['Budget Tracker - Financial Summary'],
    [''],
    ['Total Income', formatCurrency(stats?.totalIncome || 0)],
    ['Total Expense', formatCurrency(stats?.totalExpense || 0)],
    ['Balance', formatCurrency(stats?.balance || 0)],
    [''],
    ['Category Breakdown'],
    ['Category', 'Amount'],
  ];

  stats?.categoryExpenses?.forEach((cat) => {
    summaryData.push([cat._id, formatCurrency(cat.total)]);
  });

  // Create transactions sheet
  const transactionsData = [
    ['Date', 'Type', 'Category', 'Description', 'Amount', 'Payment Method'],
  ];

  transactions.forEach((t) => {
    transactionsData.push([
      formatDate(t.date),
      t.type.toUpperCase(),
      t.category,
      t.description || '-',
      t.amount,
      t.paymentMethod,
    ]);
  });

  // Create workbook
  const wb = XLSX.utils.book_new();

  // Add summary sheet
  const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, ws1, 'Summary');

  // Add transactions sheet
  const ws2 = XLSX.utils.aoa_to_sheet(transactionsData);
  XLSX.utils.book_append_sheet(wb, ws2, 'Transactions');

  // Save file
  XLSX.writeFile(wb, `budget_report_${new Date().getTime()}.xlsx`);
};

// Export Budgets to PDF
export const exportBudgetsToPDF = (budgets, userName) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129);
  doc.text('Budget Tracker - Budget Report', 14, 20);

  // Add user info
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated for: ${userName}`, 14, 30);
  doc.text(`Date: ${formatDate(new Date())}`, 14, 35);

  // Add budgets table
  const tableData = budgets.map((b) => [
    b.category,
    b.period,
    formatCurrency(b.limit),
    formatCurrency(b.spent),
    `${Math.round((b.spent / b.limit) * 100)}%`,
    b.spent >= b.limit ? 'Over Budget' : b.spent >= b.alertThreshold * b.limit / 100 ? 'Warning' : 'On Track',
  ]);

  autoTable(doc, {
    head: [['Category', 'Period', 'Limit', 'Spent', 'Progress', 'Status']],
    body: tableData,
    startY: 45,
    theme: 'grid',
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
    },
    columnStyles: {
      5: {
        fontStyle: 'bold',
        textColor: (data) => {
          if (data === 'Over Budget') return [239, 68, 68];
          if (data === 'Warning') return [245, 158, 11];
          return [16, 185, 129];
        },
      },
    },
  });

  // Save PDF
  doc.save(`budgets_${new Date().getTime()}.pdf`);
};

// Export Goals to PDF
export const exportGoalsToPDF = (goals, userName) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129);
  doc.text('Budget Tracker - Goals Report', 14, 20);

  // Add user info
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated for: ${userName}`, 14, 30);
  doc.text(`Date: ${formatDate(new Date())}`, 14, 35);

  // Add goals table
  const tableData = goals.map((g) => [
    g.name,
    g.category,
    formatCurrency(g.targetAmount),
    formatCurrency(g.currentAmount),
    `${Math.round((g.currentAmount / g.targetAmount) * 100)}%`,
    formatDate(g.deadline),
    g.isCompleted ? 'Completed' : 'In Progress',
  ]);

 autoTable(doc, {
    head: [['Goal', 'Category', 'Target', 'Current', 'Progress', 'Deadline', 'Status']],
    body: tableData,
    startY: 45,
    theme: 'grid',
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
    },
    columnStyles: {
      6: {
        fontStyle: 'bold',
        textColor: (data) => {
          return data === 'Completed' ? [16, 185, 129] : [59, 130, 246];
        },
      },
    },
  });

  // Save PDF
  doc.save(`goals_${new Date().getTime()}.pdf`);
  console.log('autoTable:', autoTable);

};

// Export Monthly Report (Combined)
export const exportMonthlyReport = (transactions, budgets, goals, stats, userName) => {
  const doc = new jsPDF();

  // Page 1: Summary
  doc.setFontSize(24);
  doc.setTextColor(16, 185, 129);
  doc.text('Monthly Financial Report', 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`User: ${userName}`, 14, 35);
  doc.text(`Report Date: ${formatDate(new Date())}`, 14, 42);

  // Summary boxes
  doc.setFillColor(16, 185, 129);
  doc.rect(14, 55, 85, 40, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Financial Overview', 20, 65);
  doc.setFontSize(10);
  doc.text(`Income: ${formatCurrency(stats?.totalIncome || 0)}`, 20, 75);
  doc.text(`Expense: ${formatCurrency(stats?.totalExpense || 0)}`, 20, 83);
  doc.text(`Balance: ${formatCurrency(stats?.balance || 0)}`, 20, 91);

  doc.setFillColor(59, 130, 246);
  doc.rect(111, 55, 85, 40, 'F');
  doc.setFontSize(14);
  doc.text('Activity', 117, 65);
  doc.setFontSize(10);
  doc.text(`Transactions: ${transactions.length}`, 117, 75);
  doc.text(`Active Budgets: ${budgets.length}`, 117, 83);
  doc.text(`Goals: ${goals.length}`, 117, 91);

  // Page 2: Transactions
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129);
  doc.text('Recent Transactions', 14, 20);

  const transTableData = transactions.slice(0, 20).map((t) => [
    formatDate(t.date),
    t.type.toUpperCase(),
    t.category,
    formatCurrency(t.amount),
  ]);

  autoTable(doc,{
    head: [['Date', 'Type', 'Category', 'Amount']],
    body: transTableData,
    startY: 30,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129] },
  });

  // Page 3: Budgets
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129);
  doc.text('Budget Status', 14, 20);

  const budgetTableData = budgets.map((b) => [
    b.category,
    formatCurrency(b.limit),
    formatCurrency(b.spent),
    `${Math.round((b.spent / b.limit) * 100)}%`,
  ]);

  autoTable(doc,{
    head: [['Category', 'Limit', 'Spent', 'Usage']],
    body: budgetTableData,
    startY: 30,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129] },
  });

  // Page 4: Goals
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129);
  doc.text('Financial Goals', 14, 20);

  const goalsTableData = goals.map((g) => [
    g.name,
    formatCurrency(g.targetAmount),
    formatCurrency(g.currentAmount),
    `${Math.round((g.currentAmount / g.targetAmount) * 100)}%`,
  ]);

  autoTable(doc, {
    head: [['Goal', 'Target', 'Current', 'Progress']],
    body: goalsTableData,
    startY: 30,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129] },
  });

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  doc.save(`monthly_report_${new Date().getTime()}.pdf`);
};