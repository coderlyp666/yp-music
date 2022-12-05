export default function parseLyric(lyricStr) {
  const newLyric = lyricStr.split("\n")
  const timeReg = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
  const arr = []
  for (const str of newLyric) {
    const reslut = timeReg.exec(str)
    if(!reslut) continue
    const minute = reslut[1] * 60 * 1000
    const second = reslut[2] * 1000
    const milliS = reslut[3].length === 2 ? reslut[3] * 10 : reslut[3] * 1
    const time = minute + second +milliS
    const text = str.replace(timeReg, "")
    arr.push({
      text,
      time
    })
  }
  return arr
}