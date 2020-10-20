export const fetchAnimeMAL = async (mal_id) => {
  console.log(mal_id);
  if (mal_id !== undefined) {
    console.log('hoo');
    return await fetch(`https://api.jikan.moe/v3/anime/${mal_id}`) // jikan api with MAL ID https://jikan.docs.apiary.io/#introduction
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result;
      });
  }
};
