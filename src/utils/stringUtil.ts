export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

BigInt.prototype.toJSON = function () {
  return this.toString();
};
