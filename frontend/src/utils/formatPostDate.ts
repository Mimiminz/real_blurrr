export const formatPostDate = (createdAt: string): string => {
  const postDate = new Date(createdAt);
  const today = new Date();

  if (postDate.toDateString() === today.toDateString()) {
    return postDate.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return createdAt.split("T")[0].replace(/-/g, ".");
  }
};
