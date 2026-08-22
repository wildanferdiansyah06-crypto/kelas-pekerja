import os
import glob
import re

files = glob.glob('src/app/buku/*/page.tsx')
for f in files:
    if 'arsip-sunyi' in f:
        continue
        
    with open(f, 'r') as file:
        content = file.read()
        
    if 'MusicPlayer' in content:
        continue
        
    # Insert import
    import_match = re.search(r'import\s+.*?;', content)
    if import_match:
        content = content.replace(import_match.group(0), import_match.group(0) + "\nimport MusicPlayer from '@/src/components/MusicPlayer';")
    else:
        content = "import MusicPlayer from '@/src/components/MusicPlayer';\n" + content
        
    # Try to find Author Note
    author_note_idx = content.find('{/* Author Note')
    if author_note_idx != -1:
        # Insert before Author Note
        insertion = "\n              {/* Music Player */}\n              <MusicPlayer audioSrc=\"/audio/placeholder.mp3\" />\n\n              "
        content = content[:author_note_idx] + insertion + content[author_note_idx:]
    else:
        # Try to find last </section>
        sections = list(re.finditer(r'</section>', content))
        if sections:
            last_section = sections[-1]
            insertion = "\n              {/* Music Player */}\n              <MusicPlayer audioSrc=\"/audio/placeholder.mp3\" />\n            "
            content = content[:last_section.start()] + insertion + content[last_section.start():]
        else:
            # Just put it before the last </div> </div>
            match = re.search(r'</div>\s*</div>\s*</main>', content)
            if match:
                insertion = "\n              {/* Music Player */}\n              <MusicPlayer audioSrc=\"/audio/placeholder.mp3\" />\n            "
                content = content[:match.start()] + insertion + content[match.start():]
                
    with open(f, 'w') as file:
        file.write(content)
