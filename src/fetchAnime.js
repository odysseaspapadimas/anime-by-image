export const fetchAnime = async (canvas) => {
  return await fetch("https://trace.moe/api/search", {
    method: "POST",
    body: JSON.stringify({ image: canvas.toDataURL("image/jpeg", 0.8) }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
};
