export const countComments = (items: HNItem[]): number =>
  items.reduce((sum, item) => {
    const self = item.type === "comment" ? 1 : 0;
    return sum + self + countComments(item.children);
  }, 0);
