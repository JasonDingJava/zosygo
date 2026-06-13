#!/bin/bash
# Download high-quality game key art for Zosygo
# Using official/press kit sources where possible

# Elden Ring - Bandai Namco press kit
curl -sL -o elden-ring-hero.jpg "https://www.gamespot.com/a/uploads/screen_kubrick/1591/15918215/4088043-elden-ring-review-thumb.jpg" 2>/dev/null &
# GTA 6 - Rockstar
curl -sL -o gta6-hero.jpg "https://www.rockstargames.com/images/games/gta6/GTAVI_KeyArt.jpg" 2>/dev/null &
# Cyberpunk 2077 - CD Projekt
curl -sL -o cyberpunk2077-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg" 2>/dev/null &
# BG3 - Larian
curl -sL -o bg3-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg" 2>/dev/null &
# Zelda TotK - Nintendo
curl -sL -o zelda-totk-hero.jpg "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000063924/ac24a5fce2e03e1c72a8ee7c0b6e53c3e6eb614aa2d0fbfb2b17f4e1cebf1b10" 2>/dev/null &
# GoW Ragnarok - Sony
curl -sL -o gow-ragnarok-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/2322010/capsule_616x353.jpg" 2>/dev/null &
# RDR2 - Rockstar
curl -sL -o rdr2-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg" 2>/dev/null &
# Witcher 3 - CD Projekt
curl -sL -o witcher3-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/292030/capsule_616x353.jpg" 2>/dev/null &
# Dark Souls 3 - Bandai Namco
curl -sL -o ds3-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/374320/capsule_616x353.jpg" 2>/dev/null &
# Skyrim - Bethesda
curl -sL -o skyrim-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/489830/capsule_616x353.jpg" 2>/dev/null &
# Sekiro - Activision
curl -sL -o sekiro-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_616x353.jpg" 2>/dev/null &
# MH Wilds - Capcom
curl -sL -o mhwilds-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/2246340/capsule_616x353.jpg" 2>/dev/null &
# Hollow Knight - Team Cherry
curl -sL -o hollow-knight-hero.jpg "https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg" 2>/dev/null &

wait
echo "Downloaded images:"
ls -lh *.jpg 2>/dev/null || echo "No jpg files created"
