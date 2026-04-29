export function authorizeOwnership(getOwnerId) {
  return async (req, res, next) => {
    try {
      const loggedInUserId = req.user.userId;

      const ownerId = await getOwnerId(req);

      if (!ownerId) {
        return res.status(404).json({
          error: 'Resource not found',
        });
      }

      if (loggedInUserId !== ownerId) {
        return res.status(403).json({
          error: 'Forbidden: you do not own this resource',
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}