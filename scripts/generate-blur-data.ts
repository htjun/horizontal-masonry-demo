import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

interface ImageData {
  id: string
  fileName: string
  width: number
  height: number
  title: string
  blurDataURL?: string
}

async function generateBlurDataURL(imagePath: string): Promise<string> {
  try {
    const buffer = await fs.readFile(imagePath)
    const blurredImage = await sharp(buffer).resize(10, 10, { fit: 'inside' }).blur().toBuffer()

    const base64 = blurredImage.toString('base64')
    return `data:image/jpeg;base64,${base64}`
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error)
    throw error
  }
}

async function main() {
  const dataPath = path.join(process.cwd(), 'data', 'images.ts')
  const imagesDir = path.join(process.cwd(), 'public', 'images')

  // Read the existing images.ts file
  const content = await fs.readFile(dataPath, 'utf-8')

  // Extract the images array using regex
  const arrayMatch = content.match(/export const images: ImageData\[\] = (\[[\s\S]*?\n\])/m)
  if (!arrayMatch) {
    throw new Error('Could not find images array in data/images.ts')
  }

  // Parse the images array (simple eval - could use a proper parser for production)
  const imagesData: ImageData[] = eval(arrayMatch[1])

  console.log(`Processing ${imagesData.length} images...`)

  // Generate blur data for each image
  for (const image of imagesData) {
    const imagePath = path.join(imagesDir, image.fileName)
    console.log(`Generating blur for ${image.fileName}...`)
    image.blurDataURL = await generateBlurDataURL(imagePath)
  }

  // Generate the new TypeScript file content
  const newContent = `export interface ImageData {
  id: string
  fileName: string
  width: number
  height: number
  title: string
  blurDataURL?: string
}

export const images: ImageData[] = ${JSON.stringify(imagesData, null, 2)}
`

  // Write the updated file
  await fs.writeFile(dataPath, newContent, 'utf-8')

  console.log('✅ Successfully generated blur data for all images!')
}

main().catch(console.error)
