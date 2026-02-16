const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
    }
    next();
  };
};

// Check if user is the assigned person or admin
const checkTaskAccess = (req, res, next) => {
  if (req.user.role === 'admin' || req.task.assignedTo.toString() === req.user.id) {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Not authorized to access this task' 
    });
  }
};

module.exports = { authorize, checkTaskAccess };