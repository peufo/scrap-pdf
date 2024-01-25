import fs from 'node:fs/promises'
import path from 'node:path'
import pdf from 'pdf-parse'

main()

async function main() {
  const pdfPath = path.resolve('./BRB2022.pdf')
  const buffer = await fs.readFile(pdfPath)
  const data = await pdf(buffer)

  const dists = data.text.split('> ').map((text) => {
    const [event, amount, org] = text.split('\n')
    return { org, amount, event, text }
  })
  const festivals = dists.filter((d) => d.text.match(/Festival/i))
  const runs = dists.filter((d) => d.text.match(/Course/i))
  console.log(runs)
}

console.log(pdf)
