const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newComplaint = new Complaint({
      title,
      description,
      user: req.userId, // The user who is creating the complaint
      status: 'pending',
    });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ message: 'Error creating complaint', error });
  }
};

exports.updateComplaint = async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );
    res.status(200).json({ message: 'Complaint updated', complaint: updatedComplaint });
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint', error });
  }
};

exports.viewComplaint = async (req, res) => {
  const { complaintId } = req.params;
  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json({ complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaint', error });
  }
};
