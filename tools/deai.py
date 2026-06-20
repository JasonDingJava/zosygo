#!/usr/bin/env python3
"""
de-ai v3: Batch rewrite AI template patterns across all article files.
Works on raw file content (single backslash n for newlines inside strings).
"""
import re

FILES = [
    'lib/articles.ts',
    'lib/articles1.ts',
    'lib/articles2.ts',
    'lib/articles3.ts',
    'lib/articles4.ts',
    'lib/articles5.ts',
]

def process_file(filepath):
    with open(filepath) as f:
        content = f.read()
    original = content
    
    # === Fix FAQ Yes/No patterns ===
    # Pattern: "Is X good?\nYes.\nExplanation." -> "**Is X good?** Yes — explanation."
    # Note: in raw file, it's \n not \\n
    content = re.sub(
        r'(Is [^?]+\?)\\nYes\.\\n([^\\"\n][^\\"\n]+?)\.\n',
        r'**\1** Yes — \2.\n',
        content
    )
    content = re.sub(
        r'(Is [^?]+\?)\\nNo\.\\n([^\\"\n][^\\"\n]+?)\.\n',
        r'**\1** No — \2.\n',
        content
    )
    
    # === Fix standalone "Yes.\n" inside FAQ-like structures ===
    # "Question?\nYes.\nMore text" -> "Question? Yes. More text"
    content = re.sub(
        r'(\?)\\nYes\.\\n',
        r'\1 Yes. ',
        content
    )
    content = re.sub(
        r'(\?)\\nNo\.\\n',
        r'\1 No. ',
        content
    )
    
    # === Fix "Many players assume X.\nThat is only part of the story." ===
    content = re.sub(
        r'Many players assume ([^.]+)\.\\nThat is only part of the story\.',
        r'Many players assume \1, but that is only half the picture',
        content
    )
    
    # === Fix "This is where most build guides stop.\nThey tell you..." ===
    content = re.sub(
        r'This is where most build guides stop\.\\nThey tell you to level ([^.]*)\.\\nThey rarely tell you ([^.]*)\.',
        r'Most build guides stop at telling you to level \1. They rarely explain \2.',
        content
    )
    
    # === Fix "Damage means nothing if you die.\nAlways prioritize survivability." ===
    content = re.sub(
        r'Damage means nothing if you die in two hits\.\\nAlways prioritize survivability\.',
        r'Damage is meaningless if you die in two hits, so survivability comes first.',
        content
    )
    
    # === Fix "This creates an inefficient build." ===
    content = re.sub(
        r'This creates an inefficient build\.',
        r'This spreads stats too thin for reliable endgame performance.',
        content
    )
    
    # === Fix "Most players assume X is stronger.\nIn practice, Y..." ===
    content = re.sub(
        r'Most players assume ([^.]+) is stronger\.\\nIn practice, ',
        r'Most players assume \1 is stronger, but in practice ',
        content
    )
    
    # === Fix "The reason is simple:\n\nMoonveil combines..." ===
    content = re.sub(
        r'The reason is simple:\\n\\n',
        r'',
        content
    )
    
    # === Fix "This is intentional.\n" ===
    content = re.sub(
        r'This is intentional\.\\n\\n',
        r'',
        content
    )
    
    # === Fix "Excellent for:\n\n- ...\n- ..." ===
    content = re.sub(
        r'Excellent for:\\n\\n- ([^\n]+?)\\n- ([^\n]+?)\\n\\n',
        r'Works well for \1 and \2.\n\n',
        content
    )
    content = re.sub(
        r'Excellent for:\\n\\n- ([^\n]+?)\\n\\n',
        r'Best suited for \1.\n\n',
        content
    )
    
    # === Fix "Ideal for:\n\n- ...\n- ..." ===
    content = re.sub(
        r'Ideal for:\\n\\n- ([^\n]+?)\\n- ([^\n]+?)\\n\\n',
        r'Suitable for \1 and \2.\n\n',
        content
    )
    content = re.sub(
        r'Ideal for:\\n\\n- ([^\n]+?)\\n\\n',
        r'Best for \1.\n\n',
        content
    )
    
    # === Fix "Particularly useful during:\n\n- ...\n- ..." ===
    content = re.sub(
        r'Particularly useful during:\\n\\n- ([^\n]+?)\\n- ([^\n]+?)\\n\\n',
        r'Useful during \1 and \2.\n\n',
        content
    )
    
    # === Fix "This guide explains how to build X correctly" ===
    content = re.sub(
        r'This guide explains how to build ([^"]+?) correctly',
        r'This guide covers how to build \1',
        content
    )
    
    # === Fix "Understanding X is one of the easiest ways..." ===
    content = re.sub(
        r'Understanding ([^"]+?) is one of the easiest ways to improve your build',
        r'Understanding \1 is one of the quickest ways to improve your build',
        content
    )
    
    # === Fix "Most players fail because X" ===
    content = re.sub(
        r'Most players fail because ([^.]+)\.',
        r'The most common mistake is \1.',
        content
    )
    
    if content != original:
        # Count changed lines
        changes = sum(1 for a, b in zip(content.split('\n'), original.split('\n')) if a != b)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"  ✅ {filepath} — {changes} lines changed")
    else:
        print(f"  ➖ {filepath} — no changes")
    
    return content != original

if __name__ == '__main__':
    count = 0
    for f in FILES:
        if process_file(f):
            count += 1
    print(f"\nModified {count}/{len(FILES)} files")
