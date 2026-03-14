// array of pages starting from page 1 // sliding window
export const getEpisodes = async (idList: number[]) => {
    const idString = idList.join(',');
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${idString}`)
  return await res.json()
}

export const getEpisode = async (episodeId: string) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeId}`,
  )
  return await res.json()
}

// array of characters
export const getCharacters = async (episodeIds: number[]) => {
    const idString = episodeIds.join(',');
  const res = await fetch(`https://rickandmortyapi.com/api/character/${idString}`)
  return await res.json()
}

export const getCharacter = async (characterId: string) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${characterId}`,
  )
  return await res.json()
}

export const getLocation = async (locationId: string) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/location/${locationId}`,
  )
  return await res.json()
}