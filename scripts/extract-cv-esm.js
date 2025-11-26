import fs from 'fs/promises'
import pdfParse from 'pdf-parse'

async function main(){
  try{
    const buf = await fs.readFile(new URL('../public/cv.pdf', import.meta.url))
    const data = await pdfParse(buf)
    const text = data.text || ''
    const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)

    const emails = Array.from(new Set((text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [])))
    const phones = Array.from(new Set((text.match(/\+?\d[\d\s().-]{6,}\d/g) || [])))
    const nameLine = lines.find(l => /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(l)) || lines[0] || ''
    const titleCandidates = lines.filter(l => /developer|engineer|frontend|javascript|full ?stack|designer/i).slice(0,6)
    const education = lines.filter(l => /b\.?tech|bachelor|master|m\.?tech|degree|university|institute/i)
    const skillsSection = lines.find(l => /skills|technologies|technical skills|stack/i)
    let skills = []
    if (skillsSection){
      const idx = lines.indexOf(skillsSection)
      skills = lines.slice(idx, idx+3).join(' ').split(/[,;|]/).map(s=>s.trim()).filter(Boolean)
    } else {
      const techRe = /\b(React|JavaScript|TypeScript|HTML|CSS|Node|Express|Mongo|SQL|Tailwind|Redux|Git|Docker|AWS|Firebase)\b/i
      skills = Array.from(new Set(lines.filter(l=>techRe.test(l)).join(' ').split(/[,;|]/).map(s=>s.trim()).filter(Boolean))).slice(0,30)
    }
    const projIdx = lines.findIndex(l=>/projects|experience|work experience/i.test(l))
    let projects = []
    if (projIdx>=0) projects = lines.slice(projIdx, projIdx+12).filter(l=>l.length>10)

    console.log(JSON.stringify({
      name: nameLine,
      titleCandidates,
      emails,
      phones,
      education,
      skills,
      projects,
      textPreview: lines.slice(0,120).join('\n')
    }, null, 2))
  }catch(err){
    console.error('ERROR', err)
    process.exit(1)
  }
}

main()
