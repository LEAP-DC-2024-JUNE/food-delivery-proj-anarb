// export const sanitizeUser = (user) => {
//   if (!user) return null;
//   const { password, resetToken, __v, ...safeUser } = user.toObject
//     ? user.toObject()
//     : user;
//   return safeUser;
// };

export const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : user;
  return {
    _id: obj._id,
    email: obj.email,
    address: obj.address,
  };
};
