const Service = require('../models/Service');

// Create a new service request
const createService = async (req, res) => {
  try {
    const { vehicle, serviceType, description, scheduledDate, priority } = req.body;
    
    const service = new Service({
      customerId: req.user._id,
      vehicle,
      serviceType,
      description,
      scheduledDate,
      priority
    });
    
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services for a customer
const getCustomerServices = async (req, res) => {
  try {
    const services = await Service.find({ customerId: req.user._id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services for a provider
const getProviderServices = async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.user._id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service status
const updateServiceStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (service) {
      service.status = req.body.status || service.status;
      service.providerId = req.user._id;
      service.updatedAt = Date.now();
      
      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getCustomerServices,
  getProviderServices,
  updateServiceStatus
};