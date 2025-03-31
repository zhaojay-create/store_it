export const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw new Error(message);
};
