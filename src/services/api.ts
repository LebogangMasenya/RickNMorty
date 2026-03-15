// array of pages starting from page 1 // sliding window
export const getEpisodes = async (idList: number[]) => {
    const idString = idList.join(',');
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${idString}`)
  return await res.json()
}

export const getAllEpisodes = async () => {
  const res = await fetch(`https://rickandmortyapi.com/api/episode`)
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

export const getAllCharacters = async () => {
  const res = await fetch(`https://rickandmortyapi.com/api/character`)
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

export const getAllLocations = async () => {
  const res = await fetch(`https://rickandmortyapi.com/api/location`)
  return await res.json()
}

export const getLocations = async (locationIds: number[]) => {
  const idString = locationIds.join(',');
  const res = await fetch(`https://rickandmortyapi.com/api/location/${idString}`)
  return await res.json()
}