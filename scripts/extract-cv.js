const fs = require('fs')
const pdf = require('pdf-parse')

async function main() {
  try {
    const dataBuffer = fs.readFileSync('./public/cv.pdf')
    const data = await pdf(dataBuffer)
    const text = data.text || ''
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)

    const emails = Array.from(new Set((text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [])))
    const phones = Array.from(new Set((text.match(/\+?\d[\d\s().-]{6,}\d/g) || [])))

    // Heuristics for name/title
    const titleCandidates = lines.filter(l => /developer|engineer|frontend|javascript|full ?stack|designer/i.test(l)).slice(0, 6)
    let name = lines[0] || ''
    // try to find a line that looks like a name (two words with capital letters)
    const nameLine = lines.find(l => /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(l))
    if (nameLine) name = nameLine

    // Education
    const education = lines.filter(l => /b\.?tech|bachelor|master|m\.?tech|degree|university|institute/i)

    // Skills: look for Skills: or Technical Skills, or common tech words
    const skillsSection = lines.find(l => /skills|technologies|technical skills|stack/i.test(l))
    let skills = []
    if (skillsSection) {
      const idx = lines.indexOf(skillsSection)
      // take next 1-2 lines
      skills = lines.slice(idx, idx + 3).join(' ').split(/[,;|]/).map(s => s.trim()).filter(Boolean)
    } else {
      // fallback: find lines containing common tech keywords
      const techRe = /\b(React|JavaScript|TypeScript|HTML|CSS|Node|Express|Mongo|SQL|Tailwind|TailwindCSS|Redux|Git|Docker|AWS|Firebase)\b/i
      skills = Array.from(new Set(lines.filter(l => techRe.test(l)).join(' ').split(/[,;|]/).map(s=>s.trim()).filter(Boolean))).slice(0, 30)
    }

    // Projects/Experience
    const projIdx = lines.findIndex(l => /projects|experience|work experience/i.test(l))
    let projects = []
    if (projIdx >= 0) {
      projects = lines.slice(projIdx, projIdx + 10).filter(l => l.length > 10)
    }

    const output = {
      name,
      titleCandidates,
      emails,
      phones,
      education,
      skills,
      projects,
      textPreview: lines.slice(0, 120).join('\n'),
    }

    console.log(JSON.stringify(output, null, 2))
  } catch (err) {
    console.error('ERROR', err.message)
    process.exit(1)
  }
}

main()
