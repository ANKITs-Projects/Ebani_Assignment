class RoleMiddleware {
  static authorizeRoles(role) {
    return (req, res, next) => {
      if (role != (req.role)) {
        res.status(403).json({
            success: false,
          message: `${req.role} is not authorized`,
        });
        return
      }
      next();
    };
  }
}


module.exports = RoleMiddleware