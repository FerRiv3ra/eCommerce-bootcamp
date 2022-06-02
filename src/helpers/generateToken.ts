const generateToken = (): string => {
  const random: string = Math.random().toString(32).substring(2);
  const date: string = Date.now().toString(32);

  return random + date;
};

export default generateToken;
