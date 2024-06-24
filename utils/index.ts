export const formatReviewsLabel = (count: number): string => {
  if (count === 1) {
    return `${count} отзыв`;
  } else if (count >= 2 && count <= 4) {
    return `${count} отзыва`;
  } else {
    return `${count} отзывов`;
  }
};

export const formatPrice = (price: number):number =>  parseFloat(price.toFixed(0))
