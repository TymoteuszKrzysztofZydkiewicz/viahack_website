import { readdir, mkdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

// Original photos stay in images/<year>. Only optimized browser assets are public.
const root = fileURLToPath(new URL("../", import.meta.url))
const publicDirectory = path.join(root, "public")
const assetDirectory = path.join(publicDirectory, "assets")
const years = ["2026", "2025"]
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"])
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" })
const cachePath = path.join(publicDirectory, "images", ".gallery-cache.json")
// Bump this value whenever image processing settings change.
const cacheVersion = 2

async function listPhotos(directory) {
  let entries
  try {
    entries = await readdir(directory, { withFileTypes: true })
  } catch (error) {
    if (error.code === "ENOENT") return []
    throw error
  }
  const files = []
  for (const entry of entries.sort((a, b) => collator.compare(a.name, b.name))) {
    const filename = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await listPhotos(filename))
    if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) files.push(filename)
  }
  return files
}

async function readCache() {
  try { return JSON.parse(await readFile(cachePath, "utf8")) }
  catch (error) {
    if (error.code !== "ENOENT" && !(error instanceof SyntaxError)) throw error
    return {}
  }
}

async function optimize(filename, outputPath) {
  const options = { width: 1920, height: 1920, fit: "inside", withoutEnlargement: true }
  return await sharp(filename).rotate().resize(options).jpeg({ quality: 84, mozjpeg: true }).toFile(outputPath)
}

const previousCache = await readCache()
const nextCache = {}
const photos = []
let generated = 0
for (const year of years) {
  const sourceDirectory = path.join(root, "images", year)
  const filenames = await listPhotos(sourceDirectory)
  for (const filename of filenames) {
    // Retain the source extension so differently named originals cannot collide.
    const relativePath = `${path.relative(sourceDirectory, filename)}.jpg`
    const outputPath = path.join(publicDirectory, "images", year, relativePath)
    const src = "/" + path.relative(publicDirectory, outputPath).split(path.sep).map(encodeURIComponent).join("/")
    const sourceStat = await stat(filename)
    const signature = `${cacheVersion}:${sourceStat.size}:${sourceStat.mtimeMs}`
    const cached = previousCache[src]
    let dimensions
    if (cached?.signature === signature && await stat(outputPath).then(() => true, error => {
      if (error.code === "ENOENT") return false
      throw error
    })) {
      dimensions = cached
    } else {
      await mkdir(path.dirname(outputPath), { recursive: true })
      try {
        dimensions = await optimize(filename, outputPath)
      } catch (error) {
        throw new Error(`Cannot prepare gallery photo ${path.relative(root, filename)}. No photos are silently skipped. ${error.message}`, { cause: error })
      }
      generated++
    }
    if (!dimensions.width || !dimensions.height) throw new Error(`Missing image dimensions: ${filename}`)
    const photo = { src, year, width: dimensions.width, height: dimensions.height }
    nextCache[src] = { signature, width: photo.width, height: photo.height }
    photos.push(photo)
  }
  console.log(`Gallery ${year}: ${filenames.length} photos prepared.`)
}

await mkdir(assetDirectory, { recursive: true })
await mkdir(path.dirname(cachePath), { recursive: true })
await writeFile(path.join(assetDirectory, "gallery-manifest.json"), `${JSON.stringify(photos, null, 2)}\n`)
await writeFile(cachePath, `${JSON.stringify(nextCache, null, 2)}\n`)
console.log(`Gallery manifest: ${photos.length} photos (${generated} generated, ${photos.length - generated} cached).`)
