import fs from 'fs'
import { fileURLToPath } from 'url'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

async function extractText(filePath){
  const data = new Uint8Array(fs.readFileSync(filePath))
  const loadingTask = getDocument({data})
  const doc = await loadingTask.promise
  const maxPages = doc.numPages
  let text = ''
  for (let i = 1; i <= maxPages; i++){
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const strings = content.items.map(i=>i.str)
    text += strings.join(' ') + '\n\n'
  }
  return text
}

;(async ()=>{
  try{
  const filePath = fileURLToPath(new URL('../public/cv.pdf', import.meta.url))
  const text = await extractText(filePath)
    const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)
    const emails = Array.from(new Set((text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [])))
    const phones = Array.from(new Set((text.match(/\+?\d[\d\s().-]{6,}\d/g) || [])))
    const nameLine = lines.find(l => /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(l)) || lines[0] || ''
    const titleCandidates = lines.filter(l => /developer|engineer|frontend|javascript|full ?stack|designer/i).slice(0,6)
    const education = lines.filter(l => /b\.?tech|bachelor|master|m\.?tech|degree|university|institute/i)
    const techRe = /\b(React|JavaScript|TypeScript|HTML|CSS|Node|Express|Mongo|SQL|Tailwind|Redux|Git|Docker|AWS|Firebase)\b/i
    const skills = Array.from(new Set(lines.filter(l=>techRe.test(l)).join(' ').split(/[,;|]/).map(s=>s.trim()).filter(Boolean))).slice(0,30)
    const projIdx = lines.findIndex(l=>/projects|experience|work experience/i.test(l))
    let projects = []
    if (projIdx>=0) projects = lines.slice(projIdx, projIdx+12).filter(l=>l.length>10)

    const output = { name: nameLine, titleCandidates, emails, phones, education, skills, projects, textPreview: lines.slice(0,200).join('\n') }
    console.log(JSON.stringify(output, null, 2))
  }catch(err){
    console.error('ERROR', err)
    process.exit(1)
  }
})()
