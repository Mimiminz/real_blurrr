export const formatPostDate = (createdAt: string): string => {
  const postDate = new Date(createdAt);
  const today = new Date();

  if (postDate.toDateString() === today.toDateString()) {
    return postDate.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (postDate.getFullYear() === today.getFullYear()) {
    const month = (postDate.getMonth() + 1).toString().padStart(2, "0");
    const day = postDate.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  } else {
    return createdAt.split("T")[0].replace(/-/g, ".");
  }
};
