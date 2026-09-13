const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY as string

export async function fetchFontData(family: string) {
  const response = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?family=${family}&key=${API_KEY}`
  )
  return await response.json()
}
