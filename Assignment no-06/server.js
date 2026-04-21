const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/employee_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✓ MongoDB Connected'))
  .catch(err => console.log('✗ MongoDB Connection Error:', err));

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Employee Model
const Employee = mongoose.model('Employee', employeeSchema);

// ==================== APIs ====================

// GET all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
});

// POST - Add new employee
app.post('/employees', async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;

    // Validation
    if (!name || !email || !phone || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      phone,
      department,
      salary: parseFloat(salary)
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      data: savedEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding employee',
      error: error.message
    });
  }
});

// DELETE employee by ID
app.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: deletedEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message
    });
  }
});

// BONUS: PUT - Update employee
app.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, salary } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, phone, department, salary: parseFloat(salary) },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating employee',
      error: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════╗`);
  console.log(`║  Employee Management System        ║`);
  console.log(`║  Server running on http://localhost:${PORT}     ║`);
  console.log(`╚════════════════════════════════════╝\n`);
});
