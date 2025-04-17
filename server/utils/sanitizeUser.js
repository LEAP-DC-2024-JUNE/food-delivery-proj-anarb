export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, resetToken, __v, ...safeUser } = user.toObject
    ? user.toObject()
    : user;
  return safeUser;
};
