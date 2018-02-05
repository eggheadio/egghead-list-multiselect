/* eslint-disable */

export function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function interpolateColors(start, end, steps, count) {
  function interpolate(start, end, steps, count) {
    const s = start,
      e = end,
      final = s + (e - s) / steps * count
    return Math.floor(final)
  }

  return {
    r: interpolate(start.r, end.r, steps, count),
    g: interpolate(start.g, end.g, steps, count),
    b: interpolate(start.b, end.b, steps, count),
  }
}
