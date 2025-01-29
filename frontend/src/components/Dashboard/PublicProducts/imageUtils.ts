const getImageSrc = (image: string | File | null): string => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  if (typeof image === "string") {
    return image;
  }
  return "https://demoapi.anticbyte.com/media/products/invalid-product.png";
};