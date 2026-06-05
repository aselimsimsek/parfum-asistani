import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════
   VERİ TABANI — Her parfümde color (şişe rengi) ve sephoraSlug eklendi
══════════════════════════════════════════════════════════ */
const DB = [
  {id:1,  name:"Miss Dior Blooming Bouquet",    brand:"Dior",              gender:["kadın","hediye"],        mood:["romantik","taze"],      occasion:["günlük","özel"],  family:["çiçeksi"],            budget:["orta"],           notes:["Şakayık","Beyaz Misk","Manolya"],           price:"₺3.200–₺4.800", match:92, season:["ilkbahar","yaz"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fce4ec,#f8bbd0,#f48fb1)",    icon:"🌸", sephoraSlug:"miss-dior-blooming-bouquet-P3100097"},
  {id:2,  name:"Miss Dior Eau de Parfum",       brand:"Dior",              gender:["kadın","hediye"],        mood:["romantik","sofistike"], occasion:["özel","gece"],    family:["çiçeksi"],            budget:["premium"],        notes:["Gül","Şakayık","Sandal"],                  price:"₺5.900–₺8.500", match:93, season:["ilkbahar","sonbahar"], ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#fce4ec,#e91e63,#c2185b)",    icon:"🌹", sephoraSlug:"miss-dior-eau-de-parfum-P3100094"},
  {id:3,  name:"Chanel Chance Eau Tendre",      brand:"Chanel",            gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük","iş"],    family:["çiçeksi","narenciye"],budget:["premium"],        notes:["Greyfurt","Yasemin","Beyaz Misk"],          price:"₺5.250–₺7.800", match:90, season:["ilkbahar","yaz"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fff9c4,#fff176,#ffee58)",     icon:"✨", sephoraSlug:"chanel-chance-eau-tendre-P140004"},
  {id:4,  name:"Chanel Chance Eau Fraîche",     brand:"Chanel",            gender:["kadın"],                 mood:["taze"],                 occasion:["günlük"],         family:["narenciye","çiçeksi"],budget:["premium"],        notes:["Limon","Su Hyasintiyle","Sedir"],           price:"₺5.000–₺7.200", match:87, season:["yaz"],                 ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e0f7fa,#80deea,#26c6da)",     icon:"💧", sephoraSlug:"chanel-chance-eau-fraiche-P140005"},
  {id:5,  name:"Chanel N°5 Eau de Parfum",     brand:"Chanel",            gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["özel","gece"],    family:["çiçeksi","oryantal"], budget:["premium","lüks"], notes:["Yasemin","Iris","Sandal"],                  price:"₺5.680–₺9.500", match:95, season:["sonbahar","kış"],      ageGroup:["olgun","tüm_yaşlar"],color:"linear-gradient(160deg,#fffde7,#fff9c4,#f5c842)",    icon:"👑", sephoraSlug:"chanel-no5-eau-de-parfum-P8010"},
  {id:6,  name:"Chanel Coco Mademoiselle",      brand:"Chanel",            gender:["kadın"],                 mood:["sofistike","taze"],     occasion:["iş","özel"],      family:["çiçeksi","oryantal"], budget:["premium","lüks"], notes:["Portakal","Gül","Patchouli"],               price:"₺5.500–₺8.200", match:94, season:["tüm_sezonlar"],        ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#efebe9,#d7ccc8,#a1887f)",     icon:"🖤", sephoraSlug:"chanel-coco-mademoiselle-P15328"},
  {id:7,  name:"Lancôme La Vie Est Belle",      brand:"Lancôme",           gender:["kadın","hediye"],        mood:["romantik","sofistike"], occasion:["özel","gece"],    family:["oryantal","çiçeksi"], budget:["orta","premium"], notes:["Iris","Pralin","Vanilya"],                  price:"₺3.750–₺6.200", match:88, season:["sonbahar","kış"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#f3e5f5,#ce93d8,#ab47bc)",     icon:"💜", sephoraSlug:"lancome-la-vie-est-belle-P326730"},
  {id:8,  name:"Lancôme Idôle",                brand:"Lancôme",           gender:["kadın","hediye"],        mood:["taze","sofistike"],     occasion:["iş","günlük"],    family:["çiçeksi","odunsu"],   budget:["orta","premium"], notes:["Iris","Sedir","Misk"],                      price:"₺3.200–₺5.500", match:87, season:["ilkbahar","yaz"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fce4ec,#f8bbd0,#e91e63)",     icon:"🌷", sephoraSlug:"lancome-idole-P449887"},
  {id:9,  name:"Viktor & Rolf Flowerbomb",        brand:"Viktor & Rolf",       gender:["kadın"],                 mood:["romantik","sofistike"], occasion:["gece","özel"],    family:["çiçeksi","oryantal"], budget:["premium"],        notes:["Patchouli","Jasmin","Gül"],                 price:"₺5.800–₺8.900", match:94, season:["kış","sonbahar"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#fce4ec,#f06292,#c62828)",     icon:"💣", sephoraSlug:"viktor-rolf-flowerbomb-P204088"},
  {id:10, name:"Gucci Bloom",                  brand:"Gucci",             gender:["kadın","hediye"],        mood:["romantik","doğal"],     occasion:["günlük","özel"],  family:["çiçeksi"],            budget:["premium"],        notes:["Tuberose","Jasmin","Kumkuat"],              price:"₺4.500–₺6.800", match:91, season:["ilkbahar","yaz"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#f1f8e9,#dcedc8,#8bc34a)",     icon:"🌼", sephoraSlug:"gucci-bloom-P432631"},
  {id:11, name:"YSL Black Opium",              brand:"YSL",               gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal"],           budget:["premium"],        notes:["Kahve","Vanilya","Beyaz Çiçek"],            price:"₺4.950–₺7.200", match:96, season:["kış","sonbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#212121,#424242,#c62828)",      icon:"☕", sephoraSlug:"ysl-black-opium-P389158"},
  {id:12, name:"YSL Mon Paris",                brand:"YSL",               gender:["kadın"],                 mood:["romantik","sofistike"], occasion:["özel","gece"],    family:["çiçeksi","oryantal"], budget:["premium"],        notes:["Çilek","Patchouli","Beyaz Misk"],           price:"₺4.600–₺6.900", match:90, season:["sonbahar","kış"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fce4ec,#e91e63,#880e4f)",      icon:"🗼", sephoraSlug:"ysl-mon-paris-P412546"},
  {id:13, name:"YSL Libre",                    brand:"YSL",               gender:["kadın"],                 mood:["sofistike","taze"],     occasion:["iş","özel"],      family:["çiçeksi","odunsu"],   budget:["premium"],        notes:["Lavanta","Portakal Çiçeği","Misk"],        price:"₺4.800–₺7.500", match:91, season:["tüm_sezonlar"],        ageGroup:["orta"],           color:"linear-gradient(160deg,#ede7f6,#9c27b0,#4a148c)",      icon:"💛", sephoraSlug:"ysl-libre-P447649"},
  {id:14, name:"Burberry Her",                 brand:"Burberry",          gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük","iş"],    family:["çiçeksi","narenciye"],budget:["orta"],           notes:["Kırmızı Meyve","Misk","Sedir"],             price:"₺3.800–₺5.600", match:86, season:["ilkbahar","yaz"],      ageGroup:["genç"],           color:"linear-gradient(160deg,#fce4ec,#ff80ab,#f50057)",      icon:"🍓", sephoraSlug:"burberry-her-P432856"},
  {id:15, name:"Marc Jacobs Daisy",            brand:"Marc Jacobs",       gender:["kadın","hediye"],        mood:["taze","doğal"],         occasion:["günlük"],         family:["çiçeksi"],            budget:["orta"],           notes:["Çilek","Menekşe","Sandal"],                 price:"₺2.800–₺4.400", match:84, season:["ilkbahar","yaz"],      ageGroup:["genç"],           color:"linear-gradient(160deg,#fffde7,#ffeb3b,#f9a825)",      icon:"🌻", sephoraSlug:"marc-jacobs-daisy-P203842"},
  {id:16, name:"Chloé Eau de Parfum",          brand:"Chloé",             gender:["kadın","hediye"],        mood:["romantik","taze"],      occasion:["günlük","iş"],    family:["çiçeksi"],            budget:["orta","premium"], notes:["Gül","Manolya","Sedir"],                    price:"₺4.200–₺6.300", match:89, season:["ilkbahar","yaz"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fce4ec,#f8bbd0,#fff9c4)",      icon:"🌹", sephoraSlug:"chloe-eau-de-parfum-P271685"},
  {id:17, name:"Paco Rabanne Olympéa",         brand:"Paco Rabanne",      gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","çiçeksi"], budget:["orta","premium"], notes:["Yeşil Mandalina","Tuzlu Vanilya","Misk"],   price:"₺3.500–₺5.600", match:90, season:["kış","sonbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e8f5e9,#a5d6a7,#2e7d32)",      icon:"⚡", sephoraSlug:"paco-rabanne-olympea-P395752"},
  {id:18, name:"Carolina Herrera Good Girl",   brand:"Carolina Herrera",  gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","çiçeksi"], budget:["premium"],        notes:["Kakao","Jasmin","Tuberose"],                price:"₺5.400–₺7.900", match:93, season:["kış","sonbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#1a237e,#311b92,#c62828)",      icon:"👠", sephoraSlug:"carolina-herrera-good-girl-P411393"},
  {id:19, name:"Givenchy Irresistible",        brand:"Givenchy",          gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük","iş"],    family:["çiçeksi"],            budget:["orta","premium"], notes:["Gül","Sedir","Vanilya"],                    price:"₺4.000–₺6.200", match:87, season:["ilkbahar","yaz"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fce4ec,#f48fb1,#e91e63)",      icon:"🌷", sephoraSlug:"givenchy-irresistible-P461754"},
  {id:20, name:"Armani Sì",                    brand:"Giorgio Armani",    gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["iş","özel"],      family:["çiçeksi","oryantal"], budget:["premium"],        notes:["Kasis","Vanilya","Patchouli"],              price:"₺5.200–₺7.800", match:91, season:["sonbahar","kış"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#efebe9,#bcaaa4,#4e342e)",      icon:"🍇", sephoraSlug:"armani-si-P337609"},
  {id:21, name:"Narciso Rodriguez For Her",    brand:"Narciso Rodriguez", gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","çiçeksi"], budget:["orta","premium"], notes:["Misk","Gül","Amber"],                       price:"₺4.200–₺6.500", match:91, season:["sonbahar","kış"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#f3e5f5,#e1bee7,#9c27b0)",      icon:"🤍", sephoraSlug:"narciso-rodriguez-for-her-P246533"},
  {id:22, name:"Parfums de Marly Delina",      brand:"Parfums de Marly",  gender:["kadın","hediye"],        mood:["romantik","taze"],      occasion:["özel","günlük"],  family:["çiçeksi"],            budget:["lüks"],           notes:["Şakayık","Lychee","Gül"],                  price:"₺9.500–₺14.500",match:96, season:["ilkbahar","yaz"],      ageGroup:["orta"],           color:"linear-gradient(160deg,#fce4ec,#f48fb1,#fff9c4)",      icon:"🌸", sephoraSlug:"parfums-de-marly-delina-P432870"},
  {id:23, name:"Kilian Good Girl Gone Bad",    brand:"Kilian Paris",      gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["çiçeksi","oryantal"], budget:["lüks"],           notes:["Gül","Iris","Tuberose"],                    price:"₺11.500–₺17.000",match:94,season:["kış","sonbahar"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#880e4f,#c62828,#212121)",      icon:"🖤", sephoraSlug:"kilian-good-girl-gone-bad-P396088"},
  {id:24, name:"Guerlain Shalimar",            brand:"Guerlain",          gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal"],           budget:["premium","lüks"], notes:["Bergamot","Vanilya","Opoponaks"],            price:"₺5.800–₺9.200", match:92, season:["kış"],                 ageGroup:["olgun"],          color:"linear-gradient(160deg,#fff8e1,#ffe082,#ff8f00)",      icon:"👑", sephoraSlug:"guerlain-shalimar-P236099"},
  {id:25, name:"Dior Sauvage",                 brand:"Dior",              gender:["erkek","unisex"],        mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["odunsu","narenciye"], budget:["premium"],        notes:["Bergamot","Sedir","Ambroxan"],              price:"₺5.875–₺9.500", match:95, season:["yaz","ilkbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e3f2fd,#1565c0,#0d47a1)",      icon:"🌊", sephoraSlug:"sauvage-eau-de-parfum-P3807043"},
  {id:26, name:"Bleu de Chanel",               brand:"Chanel",            gender:["erkek"],                 mood:["sofistike","taze"],     occasion:["iş","özel"],      family:["odunsu","narenciye"], budget:["premium","lüks"], notes:["Greyfurt","Sedir","Sandal"],                price:"₺5.680–₺9.800", match:93, season:["tüm_sezonlar"],        ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#e3f2fd,#42a5f5,#1565c0)",      icon:"💎", sephoraSlug:"bleu-de-chanel-P271678"},
  {id:27, name:"Armani Acqua di Giò",          brand:"Giorgio Armani",    gender:["erkek","unisex"],        mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["narenciye","odunsu"], budget:["orta"],           notes:["Deniz Notası","Bergamot","Patchouli"],      price:"₺3.800–₺6.200", match:90, season:["yaz"],                 ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e0f7fa,#00bcd4,#006064)",      icon:"🌊", sephoraSlug:"armani-acqua-di-gio-P300672"},
  {id:28, name:"Armani Code",                  brand:"Giorgio Armani",    gender:["erkek"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["orta","premium"], notes:["Bergamot","Zeytin","Tonga Fasulyesi"],      price:"₺3.900–₺6.400", match:91, season:["sonbahar","kış"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#1a237e,#283593,#0d47a1)",      icon:"🖤", sephoraSlug:"armani-code-P271676"},
  {id:29, name:"Versace Eros",                 brand:"Versace",           gender:["erkek"],                 mood:["romantik","sofistike"], occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["orta"],           notes:["Nane","Tonga Fasulyesi","Vetiver"],         price:"₺3.200–₺5.200", match:88, season:["sonbahar","kış"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e3f2fd,#1e88e5,#1a237e)",      icon:"⚡", sephoraSlug:"versace-eros-P300671"},
  {id:30, name:"Paco Rabanne 1 Million",       brand:"Paco Rabanne",      gender:["erkek"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal"],           budget:["orta","premium"], notes:["Kan Portakalı","Tarçın","Deri"],            price:"₺3.500–₺5.800", match:91, season:["kış","sonbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fff8e1,#ffd54f,#ff6f00)",      icon:"💰", sephoraSlug:"paco-rabanne-1-million-P300673"},
  {id:31, name:"Paco Rabanne Invictus",        brand:"Paco Rabanne",      gender:["erkek"],                 mood:["taze","romantik"],      occasion:["günlük"],         family:["narenciye","odunsu"], budget:["orta"],           notes:["Greyfurt","Deniz Akkordu","Guaiac"],        price:"₺3.200–₺5.400", match:87, season:["yaz","ilkbahar"],      ageGroup:["genç"],           color:"linear-gradient(160deg,#e8f5e9,#66bb6a,#1b5e20)",      icon:"🏆", sephoraSlug:"paco-rabanne-invictus-P337614"},
  {id:32, name:"Hugo Boss Bottled",            brand:"Hugo Boss",         gender:["erkek"],                 mood:["doğal","taze"],         occasion:["günlük","iş"],    family:["odunsu"],             budget:["ekonomik","orta"],notes:["Elma","Sedir","Sandal"],                    price:"₺1.800–₺3.200", match:83, season:["tüm_sezonlar"],        ageGroup:["tüm_yaşlar"],     color:"linear-gradient(160deg,#efebe9,#a1887f,#4e342e)",      icon:"🍎", sephoraSlug:"hugo-boss-bottled-P113553"},
  {id:33, name:"Hugo Boss The Scent",          brand:"Hugo Boss",         gender:["erkek"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["orta"],           notes:["Zencefil","Kakao","Deri"],                  price:"₺2.800–₺4.800", match:87, season:["kış","sonbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#212121,#37474f,#bf360c)",      icon:"🔥", sephoraSlug:"hugo-boss-the-scent-P395553"},
  {id:34, name:"Mont Blanc Legend",            brand:"Mont Blanc",        gender:["erkek"],                 mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["odunsu"],             budget:["ekonomik","orta"],notes:["Bergamot","Lavanta","Okyanus"],             price:"₺1.600–₺2.800", match:82, season:["yaz","ilkbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e3f2fd,#90caf9,#1565c0)",      icon:"⛰️", sephoraSlug:"mont-blanc-legend-P379524"},
  {id:35, name:"Terre d'Hermès",               brand:"Hermès",            gender:["erkek","unisex"],        mood:["doğal","sofistike"],    occasion:["iş","günlük"],    family:["odunsu"],             budget:["premium","lüks"], notes:["Portakal","Flint","Vetiver"],               price:"₺5.500–₺8.500", match:92, season:["sonbahar","kış"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#fff3e0,#ff8a65,#bf360c)",      icon:"🌍", sephoraSlug:"terre-d-hermes-P179892"},
  {id:36, name:"Tom Ford Oud Wood",            brand:"Tom Ford",          gender:["erkek","unisex"],        mood:["sofistike","doğal"],    occasion:["gece","özel"],    family:["odunsu","oryantal"],  budget:["lüks"],           notes:["Oud","Sandal","Vetiver"],                   price:"₺9.800–₺14.500",match:97, season:["kış","sonbahar"],      ageGroup:["olgun"],          color:"linear-gradient(160deg,#3e2723,#5d4037,#d4a017)",      icon:"🪵", sephoraSlug:"tom-ford-oud-wood-P229550"},
  {id:37, name:"Tom Ford Tobacco Vanille",     brand:"Tom Ford",          gender:["erkek","unisex"],        mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["lüks"],           notes:["Tütün","Vanilya","Kakao"],                  price:"₺9.200–₺13.800",match:94, season:["kış"],                 ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#4e342e,#795548,#ffe082)",      icon:"🍂", sephoraSlug:"tom-ford-tobacco-vanille-P229551"},
  {id:38, name:"Baccarat Rouge 540",           brand:"MFK",               gender:["unisex","kadın","erkek"],mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","çiçeksi"], budget:["lüks"],           notes:["Safran","Amberwood","Jasmin"],              price:"₺12.500–₺18.500",match:98, season:["kış","sonbahar"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#fff8e1,#ffca28,#e65100)",      icon:"💎", sephoraSlug:"baccarat-rouge-540-P393581"},
  {id:39, name:"Le Labo Santal 33",            brand:"Le Labo",           gender:["unisex"],                mood:["doğal","sofistike"],    occasion:["günlük","özel"],  family:["odunsu"],             budget:["lüks"],           notes:["Sandal","Sedir","Deri"],                    price:"₺9.500–₺14.500",match:94, season:["tüm_sezonlar"],        ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#efebe9,#d7ccc8,#795548)",      icon:"🌿", sephoraSlug:"le-labo-santal-33-P380011"},
  {id:40, name:"Byredo Bal d'Afrique",         brand:"Byredo",            gender:["unisex"],                mood:["doğal","sofistike"],    occasion:["günlük","iş"],    family:["çiçeksi","odunsu"],   budget:["lüks"],           notes:["Bergamot","Neroli","Vetiver"],              price:"₺9.800–₺14.500",match:92, season:["yaz","ilkbahar"],      ageGroup:["orta"],           color:"linear-gradient(160deg,#fffde7,#fff176,#f9a825)",      icon:"🌞", sephoraSlug:"byredo-bal-d-afrique-P414499"},
  {id:41, name:"Creed Aventus",                brand:"Creed",             gender:["erkek","unisex"],        mood:["sofistike","taze"],     occasion:["iş","özel"],      family:["narenciye","odunsu"], budget:["lüks"],           notes:["Ananas","Huş Ağacı","Misk"],               price:"₺18.000–₺26.000",match:96, season:["tüm_sezonlar"],        ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#e8f5e9,#43a047,#1b5e20)",      icon:"🏆", sephoraSlug:"creed-aventus-P390098"},
  {id:42, name:"Jo Malone Lime Basil",         brand:"Jo Malone",         gender:["unisex"],                mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["narenciye"],          budget:["premium","lüks"], notes:["Misket Limonu","Fesleğen","Amber"],         price:"₺5.800–₺8.800", match:88, season:["yaz"],                 ageGroup:["tüm_yaşlar"],     color:"linear-gradient(160deg,#f1f8e9,#aed581,#558b2f)",      icon:"🍋", sephoraSlug:"jo-malone-lime-basil-mandarin-P10005"},
  {id:43, name:"Jo Malone Peony Blush Suede",  brand:"Jo Malone",         gender:["kadın","unisex"],        mood:["romantik","sofistike"], occasion:["özel","günlük"],  family:["çiçeksi"],            budget:["premium","lüks"], notes:["Şakayık","Elma","Süet"],                   price:"₺5.800–₺8.800", match:91, season:["ilkbahar"],            ageGroup:["orta"],           color:"linear-gradient(160deg,#fce4ec,#f8bbd0,#ef9a9a)",      icon:"🌸", sephoraSlug:"jo-malone-peony-blush-suede-P390100"},
  {id:44, name:"Maison Margiela Beach Walk",   brand:"Maison Margiela",   gender:["unisex","kadın"],        mood:["taze","doğal"],         occasion:["günlük","özel"],  family:["narenciye","odunsu"], budget:["premium","lüks"], notes:["Limon","Hindistan Cevizi","Misk"],          price:"₺5.800–₺8.900", match:89, season:["yaz"],                 ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e0f7fa,#80cbc4,#004d40)",      icon:"🏖️", sephoraSlug:"maison-margiela-replica-beach-walk-P419041"},
  {id:45, name:"Diptyque Philosykos",          brand:"Diptyque",          gender:["unisex"],                mood:["doğal","taze"],         occasion:["günlük"],         family:["odunsu"],             budget:["premium","lüks"], notes:["İncir Ağacı","Odun","Sütlü Notalar"],      price:"₺5.500–₺8.200", match:87, season:["yaz","ilkbahar"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#f1f8e9,#c5e1a5,#558b2f)",      icon:"🌳", sephoraSlug:"diptyque-philosykos-P352022"},
  {id:46, name:"Hermès Twilly d'Hermès",       brand:"Hermès",            gender:["kadın","unisex"],        mood:["taze","sofistike"],     occasion:["günlük","iş"],    family:["çiçeksi","narenciye"],budget:["premium","lüks"], notes:["Zencefil","Tuberose","Sandal"],             price:"₺5.600–₺8.600", match:89, season:["ilkbahar"],            ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fff3e0,#ffcc80,#e65100)",      icon:"🧣", sephoraSlug:"hermes-twilly-d-hermes-P432878"},
  {id:47, name:"Parfums de Marly Layton",      brand:"Parfums de Marly",  gender:["erkek","unisex"],        mood:["sofistike","romantik"], occasion:["özel","iş"],      family:["oryantal","çiçeksi"], budget:["lüks"],           notes:["Elma","Lavanta","Vanilya"],                 price:"₺9.500–₺14.500",match:94, season:["sonbahar","kış"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#1a237e,#283593,#fff9c4)",      icon:"⚜️", sephoraSlug:"parfums-de-marly-layton-P432871"},
  {id:48, name:"Kilian Angels' Share",         brand:"Kilian Paris",      gender:["kadın","unisex"],        mood:["romantik","sofistike"], occasion:["gece","özel"],    family:["oryantal"],           budget:["lüks"],           notes:["Konyak","Kestane","Sandal"],               price:"₺11.500–₺16.500",match:93, season:["kış"],                 ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#4a148c,#7b1fa2,#ffe082)",      icon:"👼", sephoraSlug:"kilian-angels-share-P461833"},
  {id:49, name:"Guerlain Mon Guerlain",        brand:"Guerlain",          gender:["kadın","hediye"],        mood:["romantik","doğal"],     occasion:["günlük","özel"],  family:["çiçeksi","oryantal"], budget:["orta","premium"], notes:["Lavanta","Vanilya","Sandal"],               price:"₺3.800–₺5.900", match:87, season:["ilkbahar","yaz"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#ede7f6,#b39ddb,#4527a0)",      icon:"💜", sephoraSlug:"guerlain-mon-guerlain-P432862"},
  {id:50, name:"Davidoff Cool Water",          brand:"Davidoff",          gender:["erkek","unisex"],        mood:["taze","doğal"],         occasion:["günlük"],         family:["narenciye"],          budget:["ekonomik","orta"],notes:["Deniz","Lavanta","Sedir"],                  price:"₺900–₺1.800",  match:79, season:["yaz"],                 ageGroup:["genç"],           color:"linear-gradient(160deg,#e3f2fd,#64b5f6,#0277bd)",      icon:"💧", sephoraSlug:"davidoff-cool-water-P10003"},
  {id:51, name:"Calvin Klein CK One",          brand:"Calvin Klein",      gender:["unisex"],                mood:["taze","doğal"],         occasion:["günlük"],         family:["narenciye"],          budget:["ekonomik","orta"],notes:["Bergamot","Çay","Sandal"],                  price:"₺1.200–₺2.400", match:78, season:["yaz"],                 ageGroup:["genç"],           color:"linear-gradient(160deg,#eceff1,#b0bec5,#546e7a)",      icon:"✌️", sephoraSlug:"calvin-klein-ck-one-P10004"},
  {id:52, name:"Versace Bright Crystal",       brand:"Versace",           gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük"],         family:["çiçeksi","narenciye"],budget:["orta"],           notes:["Nar","Şakayık","Amber"],                    price:"₺2.800–₺4.600", match:82, season:["yaz","ilkbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fce4ec,#f8bbd0,#e0f7fa)",      icon:"💎", sephoraSlug:"versace-bright-crystal-P181741"},
  {id:53, name:"Issey Miyake L'Eau d'Issey",  brand:"Issey Miyake",      gender:["erkek","unisex"],        mood:["taze","doğal"],         occasion:["günlük"],         family:["narenciye","odunsu"], budget:["orta"],           notes:["Yuzu","Su Notası","Sedir"],                price:"₺2.800–₺4.500", match:85, season:["yaz","ilkbahar"],      ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e8f5e9,#80cbc4,#006064)",      icon:"🌊", sephoraSlug:"issey-miyake-l-eau-d-issey-P271682"},
  {id:54, name:"Givenchy L'Interdit",          brand:"Givenchy",          gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["çiçeksi","odunsu"],   budget:["premium"],        notes:["Tuberose","Beyaz Misk","Vetiver"],          price:"₺4.500–₺6.800", match:90, season:["kış","sonbahar"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#212121,#424242,#fce4ec)",      icon:"🖤", sephoraSlug:"givenchy-l-interdit-P432872"},
  {id:55, name:"Dolce & Gabbana Light Blue",     brand:"D&G",               gender:["kadın","unisex"],        mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["narenciye","çiçeksi"],budget:["orta"],           notes:["Elma","Sedir","Bambu"],                     price:"₺2.600–₺4.400", match:87, season:["yaz"],                 ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#e3f2fd,#81d4fa,#0277bd)",      icon:"💙", sephoraSlug:"dolce-gabbana-light-blue-P186765"},
  {id:56, name:"Mancera Roses Vanille",        brand:"Mancera",           gender:["kadın","unisex"],        mood:["romantik","sofistike"], occasion:["gece","özel"],    family:["çiçeksi","oryantal"], budget:["premium","lüks"], notes:["Gül","Vanilya","Misk"],                     price:"₺6.500–₺9.800", match:93, season:["kış","sonbahar"],      ageGroup:["orta","olgun"],   color:"linear-gradient(160deg,#fce4ec,#e91e63,#fff9c4)",      icon:"🌹", sephoraSlug:"mancera-roses-vanille-P432880"},
  {id:57, name:"Escentric Molecules 01",       brand:"Escentric Molecules",gender:["unisex"],               mood:["doğal","taze"],         occasion:["günlük"],         family:["odunsu"],             budget:["premium"],        notes:["Iso E Super","Sedir","Misk"],               price:"₺4.200–₺6.500", match:85, season:["tüm_sezonlar"],        ageGroup:["orta"],           color:"linear-gradient(160deg,#eceff1,#90a4ae,#37474f)",      icon:"🧪", sephoraSlug:"escentric-molecules-molecule-01-P445991"},
  {id:58, name:"Acqua di Parma Colonia",       brand:"Acqua di Parma",    gender:["unisex","erkek"],        mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["narenciye"],          budget:["premium","lüks"], notes:["Turunç","Lavanta","Vetiver"],               price:"₺6.200–₺9.500", match:88, season:["yaz","ilkbahar"],      ageGroup:["tüm_yaşlar"],     color:"linear-gradient(160deg,#fff8e1,#ffe082,#f9a825)",      icon:"🇮🇹", sephoraSlug:"acqua-di-parma-colonia-P365044"},
  {id:59, name:"Guerlain Idylle",              brand:"Guerlain",          gender:["kadın","hediye"],        mood:["romantik","taze"],      occasion:["özel","günlük"],  family:["çiçeksi"],            budget:["premium"],        notes:["Gül","Şakayık","Sandal"],                  price:"₺4.200–₺6.500", match:88, season:["ilkbahar"],            ageGroup:["orta"],           color:"linear-gradient(160deg,#fce4ec,#ef9a9a,#e91e63)",      icon:"🌺", sephoraSlug:"guerlain-idylle-P271683"},
  {id:60, name:"Prada Candy",                  brand:"Prada",             gender:["kadın"],                 mood:["romantik","sofistike"], occasion:["gece","özel"],    family:["oryantal"],           budget:["premium"],        notes:["Karamel","Misk","Benzoin"],                 price:"₺4.800–₺7.200", match:89, season:["kış"],                 ageGroup:["genç","orta"],    color:"linear-gradient(160deg,#fce4ec,#f48fb1,#880e4f)",      icon:"🍬", sephoraSlug:"prada-candy-P337611"},

  // ── ZARA PARFÜM SERİSİ (Tam Koleksiyon) ──
  // KADIN
  {id:61,  name:"Zara Tender Amber",            brand:"Zara", gender:["kadın","unisex"],        mood:["romantik","sofistike"], occasion:["özel","gece"],    family:["oryantal"],           budget:["ekonomik"], notes:["Amber","Gül","Sümbülteber","Egzotik Meyve"],  price:"₺280–₺480", match:83, season:["sonbahar","kış"],  ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#fff8e1,#ffca28,#e65100)", icon:"🍯", sephoraSlug:null},
  {id:62,  name:"Zara Tender Amber Intense",    brand:"Zara", gender:["kadın","unisex"],        mood:["sofistike"],            occasion:["gece","özel"],    family:["oryantal"],           budget:["ekonomik"], notes:["Safran","Amber","Laden Reçinesi","Siyah Frenk Üzümü"], price:"₺300–₺520", match:85, season:["kış"],          ageGroup:["orta","olgun"], color:"linear-gradient(160deg,#bf360c,#e65100,#ffd54f)", icon:"🔥", sephoraSlug:null},
  {id:63,  name:"Zara Applejuice",              brand:"Zara", gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük"],         family:["çiçeksi","narenciye"],budget:["ekonomik"], notes:["Elma","Yasemin","Beyaz Misk"],                price:"₺250–₺430", match:80, season:["ilkbahar","yaz"], ageGroup:["genç"],         color:"linear-gradient(160deg,#f1f8e9,#aed581,#fff9c4)", icon:"🍎", sephoraSlug:null},
  {id:64,  name:"Zara Lightly Bloom",           brand:"Zara", gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük"],         family:["çiçeksi"],            budget:["ekonomik"], notes:["Şakayık","Gül","Bergamot","Misk"],            price:"₺250–₺430", match:78, season:["ilkbahar","yaz"], ageGroup:["genç"],         color:"linear-gradient(160deg,#fce4ec,#f8bbd0,#f48fb1)", icon:"🌸", sephoraSlug:null},
  {id:65,  name:"Zara Gardenia",                brand:"Zara", gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["çiçeksi","oryantal"], budget:["ekonomik"], notes:["Gardenia","Vanilya","Kahve","Misk"],          price:"₺260–₺450", match:79, season:["kış","sonbahar"],  ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#212121,#424242,#ffd54f)", icon:"🖤", sephoraSlug:null},
  {id:66,  name:"Zara Femme",                   brand:"Zara", gender:["kadın"],                 mood:["sofistike"],            occasion:["gece","özel"],    family:["oryantal"],           budget:["ekonomik"], notes:["Badem","Misk","Amber","Tatlı Meyve"],         price:"₺260–₺450", match:77, season:["kış"],             ageGroup:["orta","olgun"], color:"linear-gradient(160deg,#880e4f,#c2185b,#ede7f6)", icon:"💜", sephoraSlug:null},
  {id:67,  name:"Zara Barbie",                  brand:"Zara", gender:["kadın"],                 mood:["romantik","taze"],      occasion:["günlük","özel"],  family:["çiçeksi","oryantal"], budget:["ekonomik"], notes:["Marshmallow","Gül","Vanilya","Misk"],         price:"₺260–₺450", match:76, season:["ilkbahar","yaz"], ageGroup:["genç"],         color:"linear-gradient(160deg,#f06292,#f8bbd0,#fff9c4)", icon:"🩷", sephoraSlug:null},
  {id:68,  name:"Zara Amber in Bloom",          brand:"Zara", gender:["kadın"],                 mood:["romantik","sofistike"], occasion:["özel","gece"],    family:["çiçeksi","oryantal"], budget:["ekonomik"], notes:["Yasemin","Tuberose","Amber","Kaşmeran"],      price:"₺280–₺480", match:81, season:["sonbahar","kış"],  ageGroup:["orta"],         color:"linear-gradient(160deg,#fff3e0,#ffb74d,#e65100)", icon:"🌺", sephoraSlug:null},
  {id:69,  name:"Zara Amber Satin",             brand:"Zara", gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal"],           budget:["ekonomik"], notes:["Amber","Sandal","Vanilya","Misk"],            price:"₺280–₺480", match:80, season:["kış"],             ageGroup:["orta"],         color:"linear-gradient(160deg,#efebe9,#d7ccc8,#ff8a65)", icon:"✨", sephoraSlug:null},
  {id:70,  name:"Zara Amber Fever",             brand:"Zara", gender:["kadın"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","çiçeksi"], budget:["ekonomik"], notes:["Orkide","Bourbon Vanyalası","Altın Amber"],   price:"₺280–₺480", match:82, season:["kış","sonbahar"],  ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#4a148c,#7b1fa2,#ffca28)", icon:"🌟", sephoraSlug:null},
  {id:71,  name:"Zara Stellar Amber",           brand:"Zara", gender:["unisex"],                mood:["sofistike"],            occasion:["özel","gece"],    family:["oryantal","odunsu"],  budget:["ekonomik"], notes:["Amber","Sedir","Rezin","Beyaz Misk"],         price:"₺300–₺520", match:84, season:["kış"],             ageGroup:["orta","olgun"], color:"linear-gradient(160deg,#1a237e,#283593,#ffd54f)", icon:"⭐", sephoraSlug:null},
  {id:72,  name:"Zara Fleur d'Oranger",        brand:"Zara", gender:["kadın","unisex"],        mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["çiçeksi","narenciye"],budget:["ekonomik"], notes:["Portakal Çiçeği","Bergamot","Misk"],          price:"₺250–₺430", match:77, season:["yaz","ilkbahar"],  ageGroup:["tüm_yaşlar"],   color:"linear-gradient(160deg,#fff8e1,#ffe082,#fb8c00)", icon:"🌼", sephoraSlug:null},
  {id:73,  name:"Zara Cherry Smoothie",         brand:"Zara", gender:["kadın"],                 mood:["romantik","taze"],      occasion:["günlük","özel"],  family:["çiçeksi","narenciye"],budget:["ekonomik"], notes:["Kiraz","Gül","Vanilya","Amber"],              price:"₺260–₺450", match:79, season:["ilkbahar","yaz"], ageGroup:["genç"],         color:"linear-gradient(160deg,#880e4f,#e91e63,#fce4ec)", icon:"🍒", sephoraSlug:null},
  {id:74,  name:"Zara Cashmere Rose",           brand:"Zara", gender:["kadın","hediye"],        mood:["romantik","taze"],      occasion:["günlük"],         family:["çiçeksi"],            budget:["ekonomik"], notes:["Gül","Yasemin","Kaşmir","Misk"],              price:"₺250–₺430", match:78, season:["ilkbahar"],        ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#fce4ec,#f8bbd0,#efebe9)", icon:"🌹", sephoraSlug:null},
  {id:75,  name:"Zara Supreme Vanilla",         brand:"Zara", gender:["kadın"],                 mood:["romantik","sofistike"], occasion:["gece","özel"],    family:["oryantal"],           budget:["ekonomik"], notes:["Vanilya","Kahve","Pralin","Amber"],           price:"₺260–₺450", match:80, season:["kış"],             ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#fff8e1,#ffe082,#795548)", icon:"🍮", sephoraSlug:null},
  {id:76,  name:"Zara Starlight Vanilla",       brand:"Zara", gender:["kadın","unisex"],        mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal"],           budget:["ekonomik"], notes:["Vanilya","Tonka Fasulyesi","Misk","Sandal"],  price:"₺280–₺480", match:81, season:["kış"],             ageGroup:["orta"],         color:"linear-gradient(160deg,#fffde7,#fff176,#f9a825)", icon:"🌙", sephoraSlug:null},
  {id:77,  name:"Zara Hypnotic Vanilla",        brand:"Zara", gender:["kadın"],                 mood:["sofistike"],            occasion:["gece","özel"],    family:["oryantal"],           budget:["ekonomik"], notes:["Vanilya","Badem","Amber","Misk"],             price:"₺260–₺450", match:79, season:["kış","sonbahar"],  ageGroup:["orta"],         color:"linear-gradient(160deg,#3e2723,#5d4037,#ffe082)", icon:"🍦", sephoraSlug:null},
  {id:78,  name:"Zara Frosted Cream",           brand:"Zara", gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük","iş"],    family:["çiçeksi"],            budget:["ekonomik"], notes:["Bergamot","Şakayık","Sandal","Misk"],         price:"₺250–₺430", match:76, season:["ilkbahar","yaz"], ageGroup:["genç"],         color:"linear-gradient(160deg,#f3e5f5,#e1bee7,#fff3e0)", icon:"🤍", sephoraSlug:null},
  {id:79,  name:"Zara Sublime Epoque",          brand:"Zara", gender:["kadın"],                 mood:["sofistike","taze"],     occasion:["iş","özel"],      family:["çiçeksi","odunsu"],   budget:["ekonomik"], notes:["Portakal Çiçeği","Tuberose","Sandal"],        price:"₺260–₺450", match:78, season:["tüm_sezonlar"],    ageGroup:["orta"],         color:"linear-gradient(160deg,#e8f5e9,#a5d6a7,#ffffff)", icon:"💐", sephoraSlug:null},
  {id:80,  name:"Zara Sense of Glam",           brand:"Zara", gender:["kadın"],                 mood:["romantik","sofistike"], occasion:["özel","gece"],    family:["çiçeksi","oryantal"], budget:["ekonomik"], notes:["Pudra","Gül","Ruj Notu","Sandal"],            price:"₺260–₺450", match:77, season:["sonbahar"],        ageGroup:["orta","olgun"], color:"linear-gradient(160deg,#fce4ec,#f48fb1,#ef9a9a)", icon:"💋", sephoraSlug:null},
  {id:81,  name:"Zara Go Fruity",               brand:"Zara", gender:["kadın","hediye"],        mood:["taze","romantik"],      occasion:["günlük"],         family:["çiçeksi","narenciye"],budget:["ekonomik"], notes:["Kırmızı Meyve","Frenk Üzümü","Misk"],        price:"₺250–₺430", match:76, season:["yaz","ilkbahar"],  ageGroup:["genç"],         color:"linear-gradient(160deg,#e91e63,#f48fb1,#fff9c4)", icon:"🍓", sephoraSlug:null},
  {id:82,  name:"Zara Amber Fig Cashmere",      brand:"Zara", gender:["kadın","unisex"],        mood:["doğal","sofistike"],    occasion:["günlük","özel"],  family:["odunsu","oryantal"],  budget:["ekonomik"], notes:["Amber","İncir","Kaşmir","Sandal"],            price:"₺280–₺480", match:80, season:["sonbahar","kış"],  ageGroup:["orta"],         color:"linear-gradient(160deg,#fff3e0,#ffcc80,#8d6e63)", icon:"🌿", sephoraSlug:null},
  {id:83,  name:"Zara Soleil Decade",           brand:"Zara", gender:["kadın"],                 mood:["taze","doğal"],         occasion:["yaz","günlük"],   family:["narenciye","odunsu"], budget:["ekonomik"], notes:["Bergamot","Bronz Notu","Hindistan Cevizi"],   price:"₺260–₺450", match:76, season:["yaz"],             ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#fff8e1,#ffb300,#e65100)", icon:"☀️", sephoraSlug:null},
  // ERKEK
  {id:84,  name:"Zara Aromatic Future",         brand:"Zara", gender:["erkek"],                 mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["odunsu","narenciye"], budget:["ekonomik"], notes:["Bergamot","Lavanta","Sedir","Ambroxan"],      price:"₺260–₺450", match:79, season:["yaz","ilkbahar"],  ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#e3f2fd,#1565c0,#0d47a1)", icon:"🌊", sephoraSlug:null},
  {id:85,  name:"Zara Amber Ego",               brand:"Zara", gender:["erkek"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["ekonomik"], notes:["Amber","Vanilya","Zencefil","Sedir"],         price:"₺280–₺480", match:80, season:["kış","sonbahar"],  ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#3e2723,#6d4c41,#ffd54f)", icon:"🏆", sephoraSlug:null},
  {id:86,  name:"Zara Black Amber",             brand:"Zara", gender:["erkek"],                 mood:["sofistike"],            occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["ekonomik"], notes:["Tütün","Amber","Sandal","Misk"],              price:"₺280–₺480", match:81, season:["kış"],             ageGroup:["orta","olgun"], color:"linear-gradient(160deg,#212121,#37474f,#ffd54f)", icon:"🔴", sephoraSlug:null},
  {id:87,  name:"Zara Vibrant Leather",         brand:"Zara", gender:["erkek","unisex"],        mood:["sofistike","doğal"],    occasion:["iş","özel"],      family:["odunsu","oryantal"],  budget:["ekonomik"], notes:["Deri","Sedir","Bergamot","Vetiver"],          price:"₺280–₺480", match:78, season:["sonbahar","kış"],  ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#3e2723,#5d4037,#90a4ae)", icon:"🪨", sephoraSlug:null},
  {id:88,  name:"Zara Exclusive Oud",           brand:"Zara", gender:["erkek","unisex"],        mood:["sofistike"],            occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["ekonomik"], notes:["Oud","Safran","Gül","Reçine"],                price:"₺300–₺520", match:82, season:["kış"],             ageGroup:["olgun"],        color:"linear-gradient(160deg,#1a0a00,#3e2723,#d4a017)", icon:"🕌", sephoraSlug:null},
  {id:89,  name:"Zara Blue Spirit",             brand:"Zara", gender:["erkek"],                 mood:["taze","doğal"],         occasion:["günlük"],         family:["narenciye","odunsu"], budget:["ekonomik"], notes:["Deniz","Greyfurt","Guaiac Ağacı"],            price:"₺250–₺430", match:77, season:["yaz","ilkbahar"],  ageGroup:["genç"],         color:"linear-gradient(160deg,#e8f5e9,#4caf50,#1b5e20)", icon:"💚", sephoraSlug:null},
  {id:90,  name:"Zara For Him",                 brand:"Zara", gender:["erkek"],                 mood:["sofistike","romantik"], occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["ekonomik"], notes:["Bergamot","Tütün","Sandal"],                  price:"₺260–₺450", match:78, season:["kış","sonbahar"],  ageGroup:["orta","olgun"], color:"linear-gradient(160deg,#1a237e,#283593,#90a4ae)", icon:"🖤", sephoraSlug:null},
  {id:91,  name:"Zara London Savile Row",       brand:"Zara", gender:["erkek"],                 mood:["taze","sofistike"],     occasion:["iş","günlük"],    family:["odunsu","narenciye"], budget:["ekonomik"], notes:["Elma","Sage","Sedir","Amber"],                price:"₺260–₺450", match:77, season:["tüm_sezonlar"],    ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#37474f,#546e7a,#ffe082)", icon:"🎩", sephoraSlug:null},
  {id:92,  name:"Zara Bohemian Oud",            brand:"Zara", gender:["erkek","unisex"],        mood:["doğal","sofistike"],    occasion:["özel","gece"],    family:["oryantal","odunsu"],  budget:["ekonomik"], notes:["Oud","Duman","Kestane","Ahşap"],              price:"₺280–₺480", match:79, season:["kış"],             ageGroup:["orta"],         color:"linear-gradient(160deg,#212121,#4e342e,#8d6e63)", icon:"🪵", sephoraSlug:null},
  {id:93,  name:"Zara Man Gold",                brand:"Zara", gender:["erkek"],                 mood:["sofistike","taze"],     occasion:["iş","günlük"],    family:["odunsu","narenciye"], budget:["ekonomik"], notes:["Bergamot","Sedir","Amber","Misk"],            price:"₺270–₺460", match:76, season:["tüm_sezonlar"],    ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#fff8e1,#ffd54f,#f57f17)", icon:"⚜️", sephoraSlug:null},
  {id:94,  name:"Zara Soft Haze",               brand:"Zara", gender:["erkek","unisex"],        mood:["taze","doğal"],         occasion:["günlük","iş"],    family:["narenciye","odunsu"], budget:["ekonomik"], notes:["Bergamot","Gün Işığı Çayı","Gümüş Misk"],    price:"₺260–₺450", match:77, season:["yaz","ilkbahar"],  ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#eceff1,#cfd8dc,#b0bec5)", icon:"🌫️", sephoraSlug:null},
  {id:95,  name:"Zara Tobacco Collection Rich", brand:"Zara", gender:["erkek","unisex"],        mood:["sofistike"],            occasion:["gece","özel"],    family:["oryantal","odunsu"],  budget:["ekonomik"], notes:["Tütün","Vanilya","Kakao","Tonka"],             price:"₺280–₺500", match:82, season:["kış"],             ageGroup:["orta","olgun"], color:"linear-gradient(160deg,#4e342e,#6d4c41,#ffe082)", icon:"🍂", sephoraSlug:null},
  {id:96,  name:"Zara Waterfall Brume",         brand:"Zara", gender:["unisex","kadın"],        mood:["taze","doğal"],         occasion:["günlük"],         family:["narenciye"],          budget:["ekonomik"], notes:["Citrus","Su Notalı","Yeşillik","Misk"],        price:"₺220–₺400", match:74, season:["yaz"],             ageGroup:["genç","tüm_yaşlar"],color:"linear-gradient(160deg,#e0f7fa,#80deea,#00838f)", icon:"💦", sephoraSlug:null},
  {id:97,  name:"Zara Ebony Wood",              brand:"Zara", gender:["erkek","unisex"],        mood:["doğal","sofistike"],    occasion:["günlük","iş"],    family:["odunsu"],             budget:["ekonomik"], notes:["Sedir","Deniz Tuzu","Ada Çayı","Misk"],       price:"₺260–₺450", match:78, season:["sonbahar"],        ageGroup:["genç","orta"],  color:"linear-gradient(160deg,#212121,#37474f,#546e7a)", icon:"🌲", sephoraSlug:null},
];

/* ══ KOKU NOTALARI (simülatör için) ══ */

/* ══ SORU SETİ ══ */
const QS = [
  {id:"gender",   text:"Parfümü kim için seçiyorsunuz?", options:[
    {value:"kadın",  emoji:"🌸",label:"Kadın",        desc:"Zarif ve feminen"},
    {value:"erkek",  emoji:"🌿",label:"Erkek",        desc:"Güçlü ve derin"},
    {value:"unisex", emoji:"✦", label:"Unisex",       desc:"Sınır ötesi"},
    {value:"hediye", emoji:"🎁",label:"Hediye",       desc:"Sevdiklerim için"},
  ]},
  {id:"age",      text:"Yaş grubunuz ve karakteriniz?", options:[
    {value:"genç",   emoji:"⚡",label:"Genç ve Dinamik",desc:"18–28 · Enerjik"},
    {value:"orta",   emoji:"💫",label:"Orta ve Modern", desc:"28–45 · Sofistike"},
    {value:"olgun",  emoji:"👑",label:"Olgun ve Klasik", desc:"45+ · Zamansız"},
    {value:"tüm_yaşlar",emoji:"🌈",label:"Tüm Yaşlar",desc:"Yaş sınırı yok"},
  ]},
  {id:"season",   text:"Hangi mevsim için arıyorsunuz?", options:[
    {value:"ilkbahar",emoji:"🌸",label:"İlkbahar",    desc:"Taze, çiçekli, uyanış"},
    {value:"yaz",    emoji:"☀️",label:"Yaz",          desc:"Hafif, ferah, enerjik"},
    {value:"sonbahar",emoji:"🍂",label:"Sonbahar",    desc:"Sıcak, derin, gizemli"},
    {value:"kış",    emoji:"❄️",label:"Kış",          desc:"Yoğun, sıcak, sarmalayan"},
  ]},
  {id:"mood",     text:"Koku karakteri nasıl olsun?", options:[
    {value:"taze",      emoji:"💧",label:"Fresh",         desc:"Deniz, ozon, narenciye"},
    {value:"romantik",  emoji:"🍬",label:"Şekerli",       desc:"Vanilya, karamel, meyve"},
    {value:"doğal",     emoji:"🪵",label:"Odunsu",        desc:"Sedir, sandal, toprak"},
    {value:"sofistike", emoji:"🌶️",label:"Baharatlı",     desc:"Amber, oud, egzotik"},
  ]},
  {id:"occasion", text:"Parfümü en çok nerede kullanacaksınız?", options:[
    {value:"iş",     emoji:"💼",label:"Profesyonel",   desc:"Ofis ve toplantı"},
    {value:"gece",   emoji:"🌙",label:"Gece ve Özel",   desc:"Akşam davetleri"},
    {value:"günlük", emoji:"☀️",label:"Her Gün",       desc:"Sabah rutini"},
    {value:"özel",   emoji:"✨",label:"Romantik Anlar",desc:"Unutulmaz geceler"},
  ]},
  {id:"family",   text:"Hangi koku ailesini tercih edersiniz?", options:[
    {value:"çiçeksi",  emoji:"🌺",label:"Çiçeksi",  desc:"Gül, yasemin, şakayık"},
    {value:"odunsu",   emoji:"🪵",label:"Odunsu",   desc:"Sedir, sandal, oud"},
    {value:"oryantal", emoji:"🕌",label:"Oryantal", desc:"Amber, misk, vanilya"},
    {value:"narenciye",emoji:"🍊",label:"Narenciye",desc:"Bergamot, limon, greyfurt"},
  ]},
  {id:"budget",   text:"Bütçeniz nedir?", options:[
    {value:"ekonomik",emoji:"💛",label:"Ekonomik",   desc:"₺500 altı"},
    {value:"orta",    emoji:"🥈",label:"Orta",       desc:"₺500 – ₺2.500"},
    {value:"premium", emoji:"🏆",label:"Premium",    desc:"₺2.500 – ₺5.000"},
    {value:"lüks",    emoji:"💎",label:"Lüks ve Niş", desc:"₺5.000+"},
  ]},
];

/* ══ SEPHORA TR — SADECE DOĞRULANMIŞ URL'LER ══
   Arama sonuçlarından teyit edilmiş gerçek slug'lar.
   Listede olmayan parfümler için Sephora linki gösterilmez.
══════════════════════════════════════════════════════ */
const SEPHORA_SLUGS = {
  // Arama sonuçlarından doğrulanan Sephora TR URL'leri
  "Miss Dior Blooming Bouquet":     "miss-dior-blooming-bouquet---eau-de-toilette-P10047140",
  "YSL Black Opium":               "black-opium-edp-150ml-P1920022",
  "Lancôme La Vie Est Belle":       "la-vie-est-belle-30-ml-eau-de-parfum-P1067011",
  "Bleu de Chanel":                 "bleu-de-chanel-P114112",
  "Gucci Bloom":                    "gucci-bloom-eau-de-parfum-for-her-50ml-P3106038",
  "Dior Sauvage":                   "sauvage-elixir-P10017596",
};

/* ══ ZARA TR ÜRÜN URL'LERİ ══ */
const ZARA_SLUGS = {
  // Arama sonuçlarından teyit edilmiş gerçek Zara TR URL'leri
  "Zara Tender Amber":            "tender-amber-100-ml-p20220257",
  "Zara Tender Amber Intense":    "tender-amber-intense-edp-100-ml--3-38-fl--oz--p20220342",
  "Zara Vibrant Leather":         "vibrant-leather-edp-100ml--3-38-fl-oz--p20210721",
  // Diğerleri için Zara TR arama sayfası kullanılır (slug doğrulanmadı)
};

function getZaraUrl(name) {
  const slug = ZARA_SLUGS[name];
  if (slug) return `https://www.zara.com/tr/tr/${slug}.html`;
  const q = encodeURIComponent(name.replace("Zara ", ""));
  return `https://www.zara.com/tr/tr/search?searchTerm=${q}&section=WOMAN,MAN`;
}

function getShops(name, brand, sephoraSlug) {
  const q  = encodeURIComponent(`${brand} ${name}`);
  const qT = encodeURIComponent(`${brand} ${name} parfüm`);
  const verifiedSlug = SEPHORA_SLUGS[name];
  const isZara = brand === "Zara";
  const hasVerifiedZaraSlug = !!ZARA_SLUGS[name];

  const shops = [];

  // Zara ürünü ise Zara TR linki en üste
  if (isZara) {
    shops.push({
      icon:"🛒",
      label:"Zara Türkiye",
      desc: hasVerifiedZaraSlug ? "Resmi mağaza · garantili ürün · direkt ürün" : "Resmi mağaza · garantili ürün",
      url: getZaraUrl(name),
      badge: hasVerifiedZaraSlug ? "✓ Direkt Ürün" : "✓ Resmi Site",
    });
  }

  // Sephora — sadece doğrulanmış slug varsa
  if (verifiedSlug) {
    shops.push({
      icon:"🛍️",
      label:"Sephora Türkiye",
      desc:"Orijinal ürün · ücretsiz kargo · mağaza iade",
      url:`https://www.sephora.com.tr/p/${verifiedSlug}.html`,
      badge:"✓ Direkt Ürün",
    });
  }

  shops.push(
    {
      icon:"📦",
      label:"Trendyol",
      desc:"Hızlı teslimat · taksit · ücretsiz kargo",
      url:`https://www.trendyol.com/sr?q=${qT}`,
      badge: (!zaraSlug && !verifiedSlug) ? "🔥 Popüler" : null,
    },
    {
      icon:"🌐",
      label:"Douglas TR",
      desc:"Geniş marka yelpazesi",
      url:`https://www.douglas.com.tr/search?q=${encodeURIComponent(name)}`,
      badge: null,
    },
    {
      icon:"🏷️",
      label:"Hepsiburada",
      desc:"Kampanya ve indirim fırsatları",
      url:`https://www.hepsiburada.com/ara?q=${q}`,
      badge: null,
    },
    {
      icon:"🔍",
      label:"Tüm Mağazaları Karşılaştır",
      desc:"Google Alışveriş — en iyi fiyatı bul",
      url:`https://www.google.com/search?q=${q}+parfüm+satın+al&tbm=shop`,
      badge: null,
    },
  );

  return shops;
}

/* ══ FİLTRE ══ */
// Yeni koku karakteri → DB mood eşleştirmesi
// Fresh→taze, Şekerli→romantik, Odunsu→doğal, Baharatlı→sofistike
const MOOD_MAP = { taze:"taze", romantik:"romantik", doğal:"doğal", sofistike:"sofistike" };

function filterPerfumes(ans) {
  const {gender, mood, occasion, family, budget, season, age} = ans;
  const dbMood = MOOD_MAP[mood] || mood;
  const gMap = {hediye:["kadın","hediye","unisex"]};
  const gList = gMap[gender] || [gender, "unisex"];

  const scored = DB.map(p => {
    let s = 0;
    if (p.gender.some(g => gList.includes(g))) s += 28;
    if (p.mood.includes(dbMood))               s += 22;
    if (p.occasion.includes(occasion))         s += 18;
    if (p.family.includes(family))             s += 14;
    if (p.budget.includes(budget))             s += 10;
    if (p.season && (p.season.includes(season) || p.season.includes("tüm_sezonlar"))) s += 10;
    if (p.ageGroup && (p.ageGroup.includes(age) || p.ageGroup.includes("tüm_yaşlar"))) s += 8;
    return {...p, score:s};
  }).sort((a,b) => b.score - a.score);

  const out = []; const brands = new Set();
  for (const p of scored) {
    if (out.length >= 9) break;
    if (!brands.has(p.brand) || out.length < 5) { out.push(p); brands.add(p.brand); }
  }
  if (out.length < 5) { for (const p of scored) { if (!out.find(x=>x.id===p.id)) { out.push(p); if(out.length>=7)break; }}}
  return out.slice(0, 8);
}

/* ══ BÜTÇE SIRASI ve ALTERNATİF BULUCU ══ */
const BUDGET_ORDER = ["ekonomik","orta","premium","lüks"];

function findAlternatives(perfume) {
  const currentBudgetIdx = BUDGET_ORDER.findIndex(b => perfume.budget.includes(b));
  const cheaperBudgets = BUDGET_ORDER.slice(0, Math.max(currentBudgetIdx, 1));
  if (cheaperBudgets.length === 0) return [];

  return DB
    .filter(p =>
      p.id !== perfume.id &&
      p.family.some(f => perfume.family.includes(f)) &&
      p.budget.some(b => cheaperBudgets.includes(b)) &&
      !p.budget.every(b => perfume.budget.includes(b))
    )
    .sort((a, b) => {
      const aFam = a.family.filter(f => perfume.family.includes(f)).length;
      const bFam = b.family.filter(f => perfume.family.includes(f)).length;
      if (bFam !== aFam) return bFam - aFam;
      const aMood = a.mood.filter(m => perfume.mood.includes(m)).length;
      const bMood = b.mood.filter(m => perfume.mood.includes(m)).length;
      return bMood - aMood;
    })
    .slice(0, 4);
}

/* ══════════════════ CSS ══════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --rose:#e8386d;--rose2:#ff6b9d;--peach:#ff9966;--gold:#f0a500;
  --teal:#00b8a9;--violet:#9b59b6;--sky:#4a9eff;
  --cream:#fffbf7;--sand:#fdf0e6;--text:#2c1810;--muted:#9b7b6e;
  --border:#f0ddd4;--white:#fff;
}
body{background:var(--cream);font-family:'DM Sans',sans-serif;color:var(--text);}
.app{
  min-height:100vh;
  background:
    radial-gradient(ellipse 90% 50% at 50% -15%,rgba(255,105,135,.22) 0%,transparent 55%),
    radial-gradient(ellipse 55% 35% at 95% 15%,rgba(255,153,102,.16) 0%,transparent 45%),
    radial-gradient(ellipse 45% 40% at 0% 70%,rgba(0,184,169,.1) 0%,transparent 50%),
    radial-gradient(ellipse 40% 30% at 80% 85%,rgba(155,89,182,.1) 0%,transparent 45%),
    linear-gradient(175deg,#fff8f5 0%,#fdf4ee 50%,#fff9f7 100%);
}
.wrap{max-width:720px;margin:0 auto;padding:52px 24px 80px;}

/* NAV */
.top-nav{display:flex;justify-content:flex-end;margin-bottom:32px;animation:up .6s both;}
.fav-nav-btn{
  display:flex;align-items:center;gap:8px;
  background:white;border:1.5px solid var(--border);border-radius:30px;
  padding:8px 18px;cursor:pointer;transition:all .2s;
  font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:var(--muted);
  box-shadow:0 2px 10px rgba(180,80,60,.07);
}
.fav-nav-btn:hover{border-color:var(--rose);color:var(--rose);}
.fav-count{
  background:var(--rose);color:white;border-radius:50%;
  width:20px;height:20px;display:flex;align-items:center;justify-content:center;
  font-size:11px;font-weight:700;
}

/* HERO */
.hero{text-align:center;margin-bottom:56px;animation:up .9s cubic-bezier(.16,1,.3,1) both;}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,#fff0e8,#ffe4f0);
  border:1.5px solid rgba(232,56,109,.25);border-radius:40px;padding:7px 18px;
  font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  color:var(--rose);margin-bottom:24px;box-shadow:0 4px 16px rgba(232,56,109,.12);
}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(40px,7.5vw,70px);font-weight:900;line-height:1.0;color:var(--text);margin-bottom:10px;}
.hero h1 em{font-style:italic;font-weight:400;background:linear-gradient(135deg,var(--rose) 0%,var(--peach) 50%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.hero-tagline{font-size:13px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:16px;}
.hero-desc{font-size:15px;color:var(--muted);line-height:1.7;max-width:440px;margin:0 auto 28px;}
.hero-stats{display:flex;justify-content:center;gap:0;background:white;border-radius:20px;padding:6px;box-shadow:0 4px 24px rgba(180,80,60,.1);border:1.5px solid var(--border);max-width:360px;margin:0 auto;}
.stat{flex:1;padding:14px 10px;text-align:center;border-radius:14px;transition:background .2s;}
.stat:hover{background:var(--sand);}
.stat-num{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;background:linear-gradient(135deg,var(--rose),var(--peach));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;}
.stat-sep{width:1px;background:var(--border);margin:8px 0;}
.stat-lbl{font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-top:4px;}


/* PROGRESS */
.prog-wrap{margin-bottom:40px;animation:up .8s .1s both;}
.prog-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.prog-label{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:linear-gradient(135deg,var(--rose),var(--peach));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.prog-pct{font-size:12px;color:var(--muted);font-weight:500;}
.prog-track{height:7px;background:#f0e0d8;border-radius:8px;overflow:hidden;}
.prog-fill{height:100%;background:linear-gradient(90deg,var(--rose) 0%,var(--rose2) 40%,var(--peach) 70%,var(--gold) 100%);border-radius:8px;transition:width .6s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(232,56,109,.35);}

/* SORU */
.q-card{animation:up .45s cubic-bezier(.16,1,.3,1) both;}
.q-badge{display:inline-flex;align-items:center;gap:7px;background:var(--sand);border:1.5px solid var(--border);border-radius:30px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:18px;}
.q-text{font-family:'Playfair Display',serif;font-size:clamp(22px,4vw,36px);font-weight:700;color:var(--text);line-height:1.2;margin-bottom:28px;}
.opts{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.opt{background:var(--white);border:2px solid var(--border);border-radius:20px;padding:22px 18px;cursor:pointer;text-align:left;transition:all .22s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;box-shadow:0 2px 10px rgba(180,80,60,.07);}
.opt-glow{position:absolute;inset:0;border-radius:20px;background:radial-gradient(circle at 30% 30%,rgba(232,56,109,.08),transparent 65%);opacity:0;transition:opacity .25s;}
.opt:hover{border-color:var(--rose2);transform:translateY(-3px);box-shadow:0 12px 32px rgba(232,56,109,.15);}
.opt:hover .opt-glow{opacity:1;}
.opt.sel{border-color:var(--rose);background:linear-gradient(135deg,#fff4f7,#fff9f0);box-shadow:0 0 0 3px rgba(232,56,109,.13),0 12px 32px rgba(232,56,109,.15);transform:translateY(-3px);}
.opt.sel .opt-glow{opacity:1;}
.sel-check{position:absolute;top:11px;right:11px;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--rose),var(--rose2));display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;font-weight:800;opacity:0;transform:scale(0) rotate(-30deg);transition:all .28s cubic-bezier(.16,1,.3,1);box-shadow:0 4px 12px rgba(232,56,109,.4);}
.opt.sel .sel-check{opacity:1;transform:scale(1) rotate(0);}
.opt-emoji{font-size:30px;display:block;margin-bottom:10px;transition:transform .22s;}
.opt:hover .opt-emoji,.opt.sel .opt-emoji{transform:scale(1.2) rotate(-5deg);}
.opt-label{font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px;}
.opt-desc{font-size:12px;color:var(--muted);line-height:1.4;}

/* BUTON */
.next-btn{width:100%;margin-top:22px;padding:18px;background:linear-gradient(135deg,var(--rose) 0%,var(--rose2) 45%,var(--peach) 75%,var(--gold) 100%);background-size:200% 100%;border:none;border-radius:16px;color:white;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;letter-spacing:.06em;cursor:pointer;transition:all .25s;box-shadow:0 8px 28px rgba(232,56,109,.35);position:relative;overflow:hidden;}
.next-btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.12);opacity:0;transition:opacity .2s;}
.next-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 16px 40px rgba(232,56,109,.45);}
.next-btn:hover::after{opacity:1;}
.next-btn:disabled{opacity:.3;cursor:not-allowed;transform:none;box-shadow:none;}

/* LOADING */
.loading{text-align:center;padding:70px 0;animation:up .5s both;}
.ldr{position:relative;width:120px;height:120px;margin:0 auto 36px;}
.lr{position:absolute;inset:0;border-radius:50%;border:3.5px solid transparent;animation:spin linear infinite;}
.lr1{border-top-color:var(--rose);animation-duration:.9s;}
.lr2{inset:16px;border-right-color:var(--peach);animation-duration:1.5s;animation-direction:reverse;}
.lr3{inset:32px;border-bottom-color:var(--gold);animation-duration:2.1s;}
.load-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:32px;animation:pulse 1.4s ease infinite;}
.loading h2{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--text);margin-bottom:10px;}
.load-sub{font-size:13px;color:var(--muted);letter-spacing:.1em;}
.load-dots{display:flex;justify-content:center;gap:7px;margin-top:18px;}
.ld{width:9px;height:9px;border-radius:50%;animation:bounce 1.4s ease infinite;}
.ld:nth-child(1){background:var(--rose);}
.ld:nth-child(2){background:var(--peach);animation-delay:.2s;}
.ld:nth-child(3){background:var(--gold);animation-delay:.4s;}

/* SONUÇLAR */
.res-hero{text-align:center;margin-bottom:44px;animation:up .6s both;}
.res-hero h2{font-family:'Playfair Display',serif;font-size:clamp(30px,5.5vw,50px);font-weight:900;color:var(--text);margin-bottom:8px;}
.res-hero h2 em{font-style:italic;font-weight:400;background:linear-gradient(135deg,var(--rose),var(--peach),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.res-sub{font-size:13px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;}
.cards{display:grid;gap:16px;}

/* KART */
.card{background:var(--white);border:1.5px solid var(--border);border-radius:24px;padding:28px;position:relative;overflow:hidden;transition:all .28s cubic-bezier(.16,1,.3,1);animation:up .5s ease both;box-shadow:0 4px 20px rgba(180,80,60,.08);}
.card-bar{position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--rose),var(--peach),var(--gold));border-radius:4px 4px 0 0;opacity:0;transition:opacity .3s;}
.card:hover{border-color:rgba(232,56,109,.3);transform:translateY(-5px);box-shadow:0 20px 48px rgba(180,80,60,.14);}
.card:hover .card-bar{opacity:1;}
.card:nth-child(1){animation-delay:0s;}.card:nth-child(2){animation-delay:.07s;}.card:nth-child(3){animation-delay:.14s;}.card:nth-child(4){animation-delay:.21s;}.card:nth-child(5){animation-delay:.28s;}.card:nth-child(6){animation-delay:.35s;}.card:nth-child(7){animation-delay:.42s;}.card:nth-child(8){animation-delay:.49s;}
.card-inner{display:flex;gap:20px;align-items:flex-start;}
.card-inner svg{flex-shrink:0;transition:transform .35s cubic-bezier(.16,1,.3,1),filter .35s;}
.card:hover .card-inner svg{transform:scale(1.07) rotate(-2deg);filter:drop-shadow(0 8px 16px rgba(0,0,0,.18));}
.card-body{flex:1;min-width:0;}
.card-name{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:var(--text);line-height:1.2;}
.card-brand{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;background:linear-gradient(135deg,var(--rose),var(--peach));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-top:4px;}
.card-badges{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;}
.match-pill{flex-shrink:0;background:linear-gradient(135deg,#fff7e0,#ffe8b0);border:1.5px solid rgba(240,165,0,.4);border-radius:30px;padding:5px 13px;font-size:12px;font-weight:800;color:#a06000;white-space:nowrap;box-shadow:0 2px 8px rgba(240,165,0,.2);}
.season-tag{background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1px solid #a5d6a7;border-radius:20px;padding:4px 10px;font-size:11px;font-weight:600;color:#388e3c;white-space:nowrap;}
.fav-btn{
  width:36px;height:36px;border-radius:50%;
  border:1.5px solid var(--border);background:white;
  cursor:pointer;transition:all .22s;
  display:flex;align-items:center;justify-content:center;
  font-size:18px;flex-shrink:0;
  box-shadow:0 2px 8px rgba(180,80,60,.08);
}
.fav-btn:hover{border-color:var(--rose);transform:scale(1.12);}
.fav-btn.active{border-color:var(--rose);background:#fff0f4;}
.card-desc{font-size:13.5px;line-height:1.65;color:var(--muted);margin-bottom:14px;}
.notes{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:20px;}
.note{background:linear-gradient(135deg,#fff5f7,#fff0ea);border:1px solid rgba(232,56,109,.15);border-radius:30px;padding:4px 13px;font-size:11.5px;color:var(--rose);font-weight:600;}
.card-foot{display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1.5px solid var(--sand);}
.price{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--text);}
.price small{font-family:'DM Sans',sans-serif;font-size:11px;color:var(--muted);font-weight:400;margin-left:4px;}
.buy-btn{background:linear-gradient(135deg,var(--rose),var(--rose2));border:none;border-radius:12px;padding:11px 22px;color:white;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;letter-spacing:.07em;cursor:pointer;transition:all .22s;box-shadow:0 4px 16px rgba(232,56,109,.3);}
.buy-btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 10px 28px rgba(232,56,109,.45);}

/* FAVORİLER SAYFASI */
.fav-page{animation:up .5s both;}
.fav-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;}
.fav-header h2{font-family:'Playfair Display',serif;font-size:clamp(26px,5vw,40px);font-weight:900;color:var(--text);}
.fav-header h2 em{font-style:italic;background:linear-gradient(135deg,var(--rose),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.back-btn{display:flex;align-items:center;gap:8px;background:white;border:1.5px solid var(--border);border-radius:30px;padding:8px 18px;cursor:pointer;transition:all .2s;font-size:13px;font-weight:600;color:var(--muted);font-family:'DM Sans',sans-serif;}
.back-btn:hover{border-color:var(--rose);color:var(--rose);}
.fav-empty{text-align:center;padding:60px 20px;}
.fav-empty-icon{font-size:56px;margin-bottom:16px;}
.fav-empty h3{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--text);margin-bottom:8px;}
.fav-empty p{font-size:14px;color:var(--muted);}

/* ALTERNATİF MODAL */
.alt-modal{max-width:580px;}
.alt-header{margin-bottom:20px;}
.alt-header h3{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--text);margin-bottom:4px;}
.alt-header p{font-size:13px;color:var(--muted);}
.alt-original{
  display:flex;align-items:center;gap:12px;
  background:var(--sand);border:1.5px solid var(--border);border-radius:14px;
  padding:12px 16px;margin-bottom:20px;
}
.alt-original-info strong{display:block;font-size:14px;font-weight:700;color:var(--text);}
.alt-original-info small{font-size:12px;color:var(--muted);}
.alt-original-price{margin-left:auto;font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--rose);white-space:nowrap;}
.alt-arrow{text-align:center;font-size:20px;margin-bottom:16px;color:var(--muted);}
.alt-grid{display:grid;gap:10px;margin-bottom:16px;}
.alt-card{
  display:flex;align-items:center;gap:14px;
  background:white;border:1.5px solid var(--border);border-radius:16px;
  padding:14px 16px;cursor:pointer;transition:all .22s;
  text-align:left;
}
.alt-card:hover{border-color:var(--rose);background:#fff5f7;transform:translateX(4px);box-shadow:0 4px 16px rgba(232,56,109,.12);}
.alt-card-body{flex:1;min-width:0;}
.alt-card-name{font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.alt-card-brand{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;background:linear-gradient(135deg,var(--rose),var(--peach));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.alt-card-notes{font-size:11px;color:var(--muted);margin-top:3px;}
.alt-card-price{
  flex-shrink:0;text-align:right;
}
.alt-card-price strong{display:block;font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:var(--text);}
.alt-save-badge{
  display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);
  color:white;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;margin-top:3px;
}
.alt-empty{text-align:center;padding:24px;color:var(--muted);font-size:14px;}
.alt-btn{
  background:transparent;border:1.5px solid rgba(232,56,109,.3);border-radius:10px;
  padding:7px 13px;color:var(--rose);font-family:'DM Sans',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:.05em;cursor:pointer;
  transition:all .2s;white-space:nowrap;
}
.alt-btn:hover{background:rgba(232,56,109,.07);border-color:var(--rose);}
.restart-wrap{margin-top:36px;text-align:center;animation:up .6s .6s both;}
.restart-btn{background:transparent;border:2px solid var(--border);border-radius:16px;padding:13px 32px;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .22s;}
.restart-btn:hover{border-color:var(--rose);color:var(--rose);background:rgba(232,56,109,.05);}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(44,24,16,.45);backdrop-filter:blur(14px);z-index:400;display:flex;align-items:flex-end;justify-content:center;animation:fadeIn .22s ease;}
@media(min-width:600px){.overlay{align-items:center;padding:24px;}}
.modal{background:white;border-radius:28px 28px 0 0;padding:26px 28px 44px;width:100%;max-width:520px;animation:slideUp .32s cubic-bezier(.16,1,.3,1);box-shadow:0 -8px 48px rgba(180,80,60,.15);}
@media(min-width:600px){.modal{border-radius:28px;animation:popUp .32s cubic-bezier(.16,1,.3,1);}}
.modal-pill{width:42px;height:5px;border-radius:5px;background:var(--border);margin:0 auto 22px;}
@media(min-width:600px){.modal-pill{display:none;}}
.modal h3{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--text);margin-bottom:4px;}
.modal-brand{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;background:linear-gradient(135deg,var(--rose),var(--peach));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:24px;display:block;}
.shop-list{display:grid;gap:10px;margin-bottom:16px;}
.shop-btn{display:flex;align-items:center;gap:14px;padding:14px 18px;background:var(--cream);border:1.5px solid var(--border);border-radius:16px;cursor:pointer;transition:all .2s;text-align:left;font-family:'DM Sans',sans-serif;}
.shop-btn:hover{border-color:var(--rose);background:#fff5f7;transform:translateX(5px);box-shadow:0 4px 16px rgba(232,56,109,.12);}
.shop-btn-top{border-color:rgba(0,0,0,.18);background:linear-gradient(135deg,#fafafa,#fff5f7);box-shadow:0 2px 12px rgba(0,0,0,.07);}
.shop-btn-top:hover{border-color:rgba(0,0,0,.35);background:linear-gradient(135deg,#f5f5f5,#fff0f4);}
.shop-badge{
  display:inline-block;margin-left:8px;
  background:linear-gradient(135deg,var(--rose),var(--peach));
  color:white;border-radius:20px;padding:2px 8px;
  font-size:10px;font-weight:700;letter-spacing:.04em;vertical-align:middle;
}
.shop-arrow{margin-left:auto;font-size:16px;color:var(--muted);transition:transform .2s;}
.shop-btn:hover .shop-arrow{transform:translateX(3px);color:var(--rose);}
.shop-icon{font-size:24px;flex-shrink:0;}
.shop-text strong{display:block;font-size:13.5px;font-weight:700;color:var(--text);margin-bottom:2px;}
.shop-text small{font-size:12px;color:var(--muted);}
.modal-close{width:100%;padding:13px;background:transparent;border:1.5px solid var(--border);border-radius:14px;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;}
.modal-close:hover{border-color:var(--rose);color:var(--rose);}

/* ANİMASYONLAR */
@keyframes up     {from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn {from{opacity:0} to{opacity:1}}
@keyframes spin   {to{transform:rotate(360deg)}}
@keyframes pulse  {0%,100%{opacity:.5;transform:scale(.88)} 50%{opacity:1;transform:scale(1.08)}}
@keyframes bounce {0%,80%,100%{transform:scale(.55);opacity:.3} 40%{transform:scale(1.2);opacity:1}}
@keyframes slideUp{from{transform:translateY(55px);opacity:0} to{transform:translateY(0);opacity:1}}
@keyframes popUp  {from{transform:scale(.9) translateY(14px);opacity:0} to{transform:scale(1) translateY(0);opacity:1}}
`;

/* ══════════════════ ANA COMPONENT ══════════════════ */
const SEASON_LABELS = {ilkbahar:"🌸 İlkbahar",yaz:"☀️ Yaz",sonbahar:"🍂 Sonbahar",kış:"❄️ Kış",tüm_sezonlar:"🌈 Her Mevsim"};

/* ═══════ PARFÜM ŞİŞESİ SVG BİLEŞENİ ═══════ */
// Her parfümün renk temasına ve aile karakterine göre farklı şişe tipi
function PerfumeBottle({ perfume }) {
  const c = perfume.color || "linear-gradient(160deg,#fce4ec,#f48fb1,#e91e63)";
  // Renk paletini gradient'ten çıkar
  const colors = c.match(/#[0-9a-fA-F]{6}/g) || ["#f48fb1","#e91e63","#880e4f"];
  const [c1, c2, c3] = [colors[0]||"#f8bbd0", colors[1]||"#e91e63", colors[2]||"#880e4f"];

  // Şişe tipini aileye göre belirle
  const fam = perfume.family?.[0] || "çiçeksi";
  const isOud = fam === "oryantal" || fam === "odunsu";
  const isFresh = fam === "narenciye";
  const isFloral = fam === "çiçeksi";

  const id = `bottle-${perfume.id}`;

  return (
    <svg viewBox="0 0 90 130" xmlns="http://www.w3.org/2000/svg" style={{width:"90px",height:"130px",flexShrink:0}}>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1}/>
          <stop offset="50%" stopColor={c2}/>
          <stop offset="100%" stopColor={c3}/>
        </linearGradient>
        <linearGradient id={`shine-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)"/>
        </linearGradient>
        <linearGradient id={`liquid-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={c3} stopOpacity="0.7"/>
        </linearGradient>
        <filter id={`shadow-${id}`}>
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
        <clipPath id={`clip-${id}`}>
          {isOud
            ? <path d="M28,40 Q28,35 35,32 L38,22 Q39,18 45,18 Q51,18 52,22 L55,32 Q62,35 62,40 L62,112 Q62,118 56,118 L34,118 Q28,118 28,112 Z"/>
            : isFresh
            ? <rect x="22" y="30" width="46" height="86" rx="10"/>
            : <path d="M30,45 Q26,40 26,35 L32,28 Q36,24 38,20 L38,16 Q38,14 45,14 Q52,14 52,16 L52,20 Q54,24 58,28 L64,35 Q64,40 60,45 L60,112 Q60,118 52,118 L38,118 Q30,118 30,112 Z"/>
          }
        </clipPath>
      </defs>

      {/* Şişe gövdesi */}
      <g filter={`url(#shadow-${id})`}>
        {isOud ? (
          <path d="M28,40 Q28,35 35,32 L38,22 Q39,18 45,18 Q51,18 52,22 L55,32 Q62,35 62,40 L62,112 Q62,118 56,118 L34,118 Q28,118 28,112 Z"
            fill={`url(#bg-${id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        ) : isFresh ? (
          <rect x="22" y="30" width="46" height="86" rx="10"
            fill={`url(#bg-${id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        ) : (
          <path d="M30,45 Q26,40 26,35 L32,28 Q36,24 38,20 L38,16 Q38,14 45,14 Q52,14 52,16 L52,20 Q54,24 58,28 L64,35 Q64,40 60,45 L60,112 Q60,118 52,118 L38,118 Q30,118 30,112 Z"
            fill={`url(#bg-${id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        )}
      </g>

      {/* Sıvı efekti - şişenin içi */}
      <g clipPath={`url(#clip-${id})`}>
        <rect x="0" y="50" width="90" height="80" fill={`url(#liquid-${id})`} opacity="0.4"/>
        {/* Sıvı dalgası */}
        <path d={`M15,58 Q30,52 45,58 Q60,64 75,58 L75,130 L15,130 Z`}
          fill={c2} opacity="0.25"/>
      </g>

      {/* Cam parlaması */}
      <g clipPath={`url(#clip-${id})`}>
        <ellipse cx="36" cy="65" rx="7" ry="30" fill={`url(#shine-${id})`} opacity="0.7"/>
        <ellipse cx="32" cy="45" rx="4" ry="8" fill="rgba(255,255,255,0.4)"/>
      </g>

      {/* Kapak/atomizer */}
      {isOud ? (
        <>
          <rect x="38" y="6" width="14" height="14" rx="3" fill={c3}/>
          <rect x="42" y="2" width="6" height="6" rx="2" fill={c3}/>
        </>
      ) : isFresh ? (
        <>
          <rect x="30" y="14" width="30" height="18" rx="4" fill={c3}/>
          <rect x="38" y="8" width="14" height="8" rx="3" fill={c3}/>
          <rect x="42" y="4" width="6" height="5" rx="1.5" fill={c3}/>
        </>
      ) : (
        <>
          <rect x="36" y="6" width="18" height="10" rx="3" fill={c3}/>
          <rect x="40" y="2" width="10" height="6" rx="2" fill={c3}/>
        </>
      )}

      {/* Etiket */}
      <g clipPath={`url(#clip-${id})`}>
        <rect x={isOud?33:isFloral?31:31}
              y="68" width={isOud?24:isFloral?28:28} height={isOud?28:22} rx="2"
              fill="rgba(255,255,255,0.88)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
        <text x="45" y="80" textAnchor="middle" fontSize="4.5" fontWeight="800"
          fontFamily="serif" fill={c3} letterSpacing="0.5">
          {perfume.brand?.toUpperCase().slice(0,8)}
        </text>
        <line x1={isOud?36:34} y1="83" x2={isOud?54:56} y2="83" stroke={c2} strokeWidth="0.6" opacity="0.7"/>
        <text x="45" y="89" textAnchor="middle" fontSize="3.5" fontWeight="600"
          fontFamily="sans-serif" fill={c3} letterSpacing="0.2">
          {perfume.name?.slice(0,12)}
        </text>
        {isOud && (
          <text x="45" y="93" textAnchor="middle" fontSize="3" fill={c3} opacity="0.7">
            {perfume.family?.[0]?.toUpperCase()}
          </text>
        )}
      </g>

      {/* Alt yansıma */}
      <ellipse cx="45" cy="120" rx="20" ry="3" fill={c2} opacity="0.15"/>
    </svg>
  );
}

export default function App() {
  const [page,       setPage]       = useState("home");   // home | quiz | results | favorites
  const [step,       setStep]       = useState(0);
  const [answers,    setAnswers]    = useState({});
  const [selected,   setSelected]   = useState(null);
  const [results,    setResults]    = useState([]);
  const [modal,      setModal]      = useState(null);
  const [altModal,   setAltModal]   = useState(null); // alternatif modal
  const [animKey,    setAnimKey]    = useState(0);
  const [tick,       setTick]       = useState(0);
  const [favorites,  setFavorites]  = useState([]);

  const total = QS.length;
  const curQ  = QS[step] || null;
  const pct   = step >= 0 ? Math.round((step / total) * 100) : 100;
  const loadTexts = ["100 parfüm taranıyor...","Koku profili oluşturuluyor...","Mevsim ve yaş filtresi uygulanıyor...","En iyi eşleşmeler seçiliyor..."];

  useEffect(() => {
    if (page !== "quiz" || step !== -1) return;
    const t = setInterval(() => setTick(p => (p+1) % loadTexts.length), 850);
    return () => clearInterval(t);
  }, [page, step]);

  function startQuiz() { setPage("quiz"); setStep(0); setAnimKey(k=>k+1); }

  function next() {
    const ans = {...answers, [curQ.id]: selected};
    setAnswers(ans); setSelected(null);
    if (step < total - 1) { setAnimKey(k=>k+1); setStep(s=>s+1); }
    else {
      setStep(-1);
      setTimeout(() => { setResults(filterPerfumes(ans)); setPage("results"); setStep(0); }, 2800);
    }
  }

  function restart() {
    setPage("home"); setStep(0); setAnswers({}); setSelected(null); setResults([]);
    setAnimKey(k=>k+1);
  }

  function toggleFav(id) {
    setFavorites(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  }

  function descFor(p) {
    if (p.family.includes("çiçeksi") && p.mood.includes("romantik"))
      return `${p.brand}'ın bu zarif çiçeksi bestesi şakayık ve gül notalarıyla romantik anlarınızın ayrılmaz parçası olacak.`;
    if (p.family.includes("oryantal"))
      return `${p.brand}'dan oryantal sıcaklık; amber ve egzotik baharatların dansıyla gittiğiniz her yerde iz bırakan bir imza.`;
    if (p.family.includes("odunsu"))
      return `${p.brand}'ın odunsu kompozisyonu sedir ve sandal ağacının toprağa bağlı derinliğiyle sofistike bir karakter çizer.`;
    if (p.family.includes("narenciye"))
      return `${p.brand}'dan ferahlatıcı narenciye şöleni; bergamot ve citrus notalarının enerjisiyle güne canlı bir başlangıç.`;
    return `${p.brand}'ın özenle yaratılan bu parfümü, profilinize kusursuz uyum sağlayan benzersiz bir koku deneyimi sunar.`;
  }

  const favPerfumes = DB.filter(p => favorites.includes(p.id));

  /* ────── RENDER ────── */
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  return (
    <>
      <div className="app">
        <div className="wrap">

          {/* NAV */}
          <div className="top-nav">
            <button className="fav-nav-btn" onClick={() => setPage(page==="favorites"?"home":"favorites")}>
              ♡ Favorilerim
              {favorites.length > 0 && <span className="fav-count">{favorites.length}</span>}
            </button>
          </div>

          {/* ── HOME ── */}
          {page === "home" && (
            <>
              <div className="hero">
                <div className="hero-badge">✦ Yapay Zeka Parfüm Danışmanı</div>
                <h1>Kokunuzu <em>Keşfedin</em></h1>
                <div className="hero-tagline">Kişisel Parfüm Rehberi</div>
                <p className="hero-desc">7 soruyu yanıtlayın; mevsim, yaş ve karakterinize özel parfümler gelsin.</p>
                <div className="hero-stats">
                  <div className="stat"><div className="stat-num">97</div><div className="stat-lbl">Parfüm</div></div>
                  <div className="stat-sep"/>
                  <div className="stat"><div className="stat-num">55+</div><div className="stat-lbl">Marka</div></div>
                  <div className="stat-sep"/>
                  <div className="stat"><div className="stat-num">7</div><div className="stat-lbl">Soru</div></div>
                </div>
              </div>

              <button className="next-btn" onClick={startQuiz}>✦ Teste Başla</button>
            </>
          )}

          {/* ── QUIZ ── */}
          {page === "quiz" && step >= 0 && (
            <>
              <div className="prog-wrap">
                <div className="prog-row">
                  <span className="prog-label">Soru {step+1} / {total}</span>
                  <span className="prog-pct">{pct}% tamamlandı</span>
                </div>
                <div className="prog-track"><div className="prog-fill" style={{width:`${pct}%`}}/></div>
              </div>
              <div className="q-card" key={animKey}>
                <div className="q-badge">✦ Soru {step+1}</div>
                <div className="q-text">{curQ.text}</div>
                <div className="opts">
                  {curQ.options.map(o => (
                    <button key={o.value} className={`opt${selected===o.value?" sel":""}`} onClick={()=>setSelected(o.value)}>
                      <div className="opt-glow"/>
                      <span className="sel-check">✓</span>
                      <span className="opt-emoji">{o.emoji}</span>
                      <div className="opt-label">{o.label}</div>
                      <div className="opt-desc">{o.desc}</div>
                    </button>
                  ))}
                </div>
                <button className="next-btn" disabled={!selected} onClick={next}>
                  {step < total-1 ? "Sonraki Soru →" : "✦ Parfümlerimi Göster"}
                </button>
              </div>
            </>
          )}

          {/* ── LOADING ── */}
          {page === "quiz" && step === -1 && (
            <div className="loading">
              <div className="ldr">
                <div className="lr lr1"/><div className="lr lr2"/><div className="lr lr3"/>
                <div className="load-center">🌸</div>
              </div>
              <h2>{loadTexts[tick]}</h2>
              <div className="load-sub">Koku profili &amp; mevsim filtresi uygulanıyor</div>
              <div className="load-dots"><div className="ld"/><div className="ld"/><div className="ld"/></div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {page === "results" && (
            <>
              <div className="res-hero">
                <h2>Size Özel <em>Seçimler</em></h2>
                <div className="res-sub">{results.length} parfüm · kişisel &amp; mevsimsel öneri</div>
              </div>
              <div className="cards">
                {results.map((p,i) => (
                  <div key={p.id} className="card">
                    <div className="card-bar"/>
                    <div className="card-inner">
                      <PerfumeBottle perfume={p} />
                      <div className="card-body">
                        <div className="card-top">
                          <div>
                            <div className="card-name">{p.name}</div>
                            <div className="card-brand">{p.brand}</div>
                          </div>
                          <div className="card-badges">
                            <span className="match-pill">%{p.match} uyum</span>
                            {p.season && <span className="season-tag">{SEASON_LABELS[p.season[0]] || p.season[0]}</span>}
                            <button className={`fav-btn${favorites.includes(p.id)?" active":""}`} onClick={()=>toggleFav(p.id)} title="Favoriye Ekle">
                              {favorites.includes(p.id) ? "❤️" : "🤍"}
                            </button>
                          </div>
                        </div>
                        <p className="card-desc">{descFor(p)}</p>
                        <div className="notes">{p.notes.map((n,j)=><span key={j} className="note">{n}</span>)}</div>
                        <div className="card-foot">
                          <div className="price">{p.price} <small>100ml</small></div>
                          <div style={{display:"flex",gap:"8px"}}>
                            <button className="alt-btn" onClick={()=>setAltModal(p)}>💡 Uygun Alternatif</button>
                            <button className="buy-btn" onClick={()=>setModal(p)}>Satın Al →</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="restart-wrap">
                <button className="restart-btn" onClick={restart}>↺ Yeniden Başla</button>
              </div>
            </>
          )}

          {/* ── FAVORİLER ── */}
          {page === "favorites" && (
            <div className="fav-page">
              <div className="fav-header">
                <h2>❤️ <em>Favorilerim</em></h2>
                <button className="back-btn" onClick={()=>setPage(results.length?"results":"home")}>← Geri</button>
              </div>
              {favPerfumes.length === 0 ? (
                <div className="fav-empty">
                  <div className="fav-empty-icon">🤍</div>
                  <h3>Henüz favori yok</h3>
                  <p>Parfüm kartlarındaki 🤍 ikonuna tıklayarak favorilere ekleyebilirsiniz.</p>
                </div>
              ) : (
                <div className="cards">
                  {favPerfumes.map((p,i) => (
                    <div key={p.id} className="card">
                      <div className="card-bar"/>
                      <div className="card-inner">
                        <PerfumeBottle perfume={p} />
                        <div className="card-body">
                          <div className="card-top">
                            <div>
                              <div className="card-name">{p.name}</div>
                              <div className="card-brand">{p.brand}</div>
                            </div>
                            <div className="card-badges">
                              <span className="match-pill">%{p.match} uyum</span>
                              <button className="fav-btn active" onClick={()=>toggleFav(p.id)}>❤️</button>
                            </div>
                          </div>
                          <p className="card-desc">{descFor(p)}</p>
                          <div className="notes">{p.notes.map((n,j)=><span key={j} className="note">{n}</span>)}</div>
                          <div className="card-foot">
                            <div className="price">{p.price} <small>100ml</small></div>
                            <div style={{display:"flex",gap:"8px"}}>
                              <button className="alt-btn" onClick={()=>setAltModal(p)}>💡 Uygun Alternatif</button>
                              <button className="buy-btn" onClick={()=>setModal(p)}>Satın Al →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-pill"/>
            <h3>{modal.name}</h3>
            <span className="modal-brand">{modal.brand} · {modal.price}</span>
            <div className="shop-list">
              {getShops(modal.name, modal.brand, modal.sephoraSlug).map((s,i)=>(
                <button key={i} className={`shop-btn${i===0?" shop-btn-top":""}`}
                  onClick={()=>{window.open(s.url,"_blank");setModal(null);}}>
                  <span className="shop-icon">{s.icon}</span>
                  <div className="shop-text">
                    <strong>{s.label}{s.badge && <span className="shop-badge">{s.badge}</span>}</strong>
                    <small>{s.desc}</small>
                  </div>
                  <span className="shop-arrow">→</span>
                </button>
              ))}
            </div>
            <button className="modal-close" onClick={()=>setModal(null)}>Kapat</button>
          </div>
        </div>
      )}

      {/* ALTERNATİF MODAL */}
      {altModal && (
        <AltModal perfume={altModal} onClose={()=>setAltModal(null)} onBuy={(p)=>{setAltModal(null);setModal(p);}} />
      )}
    </>
  );
}

function AltModal({ perfume, onClose, onBuy }) {
  const alts = findAlternatives(perfume);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal alt-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-pill"/>
        <div className="alt-header">
          <h3>💡 Uygun Alternatifler</h3>
          <p>Benzer kokusu olan daha uygun fiyatlı seçenekler</p>
        </div>
        <div className="alt-original">
          <PerfumeBottle perfume={perfume} />
          <div className="alt-original-info">
            <strong>{perfume.name}</strong>
            <small>{perfume.brand} · {perfume.family.join(", ")}</small>
          </div>
          <div className="alt-original-price">{perfume.price}</div>
        </div>
        <div className="alt-arrow">↓ Bunlara da bakın</div>
        {alts.length === 0 ? (
          <div className="alt-empty">
            Bu parfüm zaten en uygun fiyatlı kategoride 🎉<br/>Daha ekonomik seçenek yok.
          </div>
        ) : (
          <div className="alt-grid">
            {alts.map(a => (
              <div key={a.id} className="alt-card" onClick={()=>onBuy(a)}>
                <PerfumeBottle perfume={a} />
                <div className="alt-card-body">
                  <div className="alt-card-name">{a.name}</div>
                  <div className="alt-card-brand">{a.brand}</div>
                  <div className="alt-card-notes">{a.notes.slice(0,3).join(" · ")}</div>
                </div>
                <div className="alt-card-price">
                  <strong>{a.price}</strong>
                  <div className="alt-save-badge">Daha uygun</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="modal-close" onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
}
