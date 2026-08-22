const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/buku/*/page.tsx');

files.forEach(f => {
    if (f.includes('arsip-sunyi')) return;
    
    let content = fs.readFileSync(f, 'utf-8');
    
    if (content.includes('MusicPlayer')) return;
    
    // Insert import
    content = content.replace(/import\s+.*?;/, match => match + "\nimport MusicPlayer from '@/src/components/MusicPlayer';");
    
    // Insert component
    const authorNoteIdx = content.indexOf('{/* Author Note');
    if (authorNoteIdx !== -1) {
        const insertion = "\n              {/* Music Player */}\n              <MusicPlayer audioSrc=\"/audio/placeholder.mp3\" />\n\n              ";
        content = content.substring(0, authorNoteIdx) + insertion + content.substring(authorNoteIdx);
    } else {
        const sections = [...content.matchAll(/<\/section>/g)];
        if (sections.length > 0) {
            const lastSection = sections[sections.length - 1];
            const insertion = "\n              {/* Music Player */}\n              <MusicPlayer audioSrc=\"/audio/placeholder.mp3\" />\n            ";
            content = content.substring(0, lastSection.index) + insertion + content.substring(lastSection.index);
        }
    }
    
    fs.writeFileSync(f, content);
});
