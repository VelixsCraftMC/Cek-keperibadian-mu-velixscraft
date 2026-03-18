import { Question, SurveyResult, Category } from './types';

export const PERSONALITY_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Bagaimana gaya berpakaian favoritmu saat keluar rumah?",
    answers: [
      { text: "Maskulin, rapi, dan fungsional", scores: { normal: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 100 } as any },
      { text: "Imut, warna pastel, dan penuh aksesoris lucu", scores: { normal: 0, femboy: 100, tomboy: 60, abnormal: 20, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Feminin, elegan, dan terlihat berkelas", scores: { normal: 40, femboy: 0, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Sesuatu yang nyentrik, aneh, dan mencolok", scores: { normal: 0, femboy: 20, tomboy: 20, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 2,
    text: "Apa yang biasanya kamu lakukan di waktu luang?",
    answers: [
      { text: "Olahraga berat atau gaming kompetitif", scores: { normal: 80, femboy: 20, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 100 } as any },
      { text: "Melakukan rutinitas skincare atau dandan", scores: { normal: 0, femboy: 80, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Cosplay atau mengoleksi barang-barang estetik", scores: { normal: 0, femboy: 100, tomboy: 60, abnormal: 40, jujur_cewek: 60, jujur_cowok: 0 } as any },
      { text: "Berdiskusi dengan bayangan sendiri", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 3,
    text: "Minuman apa yang paling menggambarkan kepribadianmu?",
    answers: [
      { text: "Kopi hitam pekat atau air mineral dingin", scores: { normal: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 100 } as any },
      { text: "Milk tea manis dengan boba kenyal", scores: { normal: 20, femboy: 80, tomboy: 80, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Jus buah segar tanpa pemanis buatan", scores: { normal: 60, femboy: 20, tomboy: 60, abnormal: 0, jujur_cewek: 80, jujur_cowok: 80 } as any },
      { text: "Ramuan rahasia yang warnanya berubah-ubah", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 4,
    text: "Bagaimana caramu menyapa orang baru?",
    answers: [
      { text: "Halo, senang berkenalan denganmu", scores: { normal: 100, femboy: 0, tomboy: 40, abnormal: 0, jujur_cewek: 60, jujur_cowok: 100 } as any },
      { text: "Haiii~! (dengan senyum paling manis)", scores: { normal: 20, femboy: 80, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Nyaa~ atau UwU (sambil malu-malu)", scores: { normal: 0, femboy: 100, tomboy: 40, abnormal: 60, jujur_cewek: 40, jujur_cowok: 0 } as any },
      { text: "Hanya menatap sampai mereka merasa canggung", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 5,
    text: "Warna apa yang paling mewakili energimu?",
    answers: [
      { text: "Biru laut atau Hitam elegan", scores: { normal: 100, femboy: 20, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 100 } as any },
      { text: "Pink cerah atau Putih bersih", scores: { normal: 0, femboy: 100, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Ungu misterius atau Kuning ceria", scores: { normal: 40, femboy: 60, tomboy: 60, abnormal: 20, jujur_cewek: 60, jujur_cowok: 60 } as any },
      { text: "Warna yang hanya bisa didengar, bukan dilihat", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 6,
    text: "Reaksi spontanmu saat melihat kucing jalanan?",
    answers: [
      { text: "Kasihan, ingin memberi makan", scores: { normal: 80, femboy: 20, tomboy: 40, abnormal: 0, jujur_cewek: 100, jujur_cowok: 100 } as any },
      { text: "KYAAA! GEMES BANGET MAU CULIK!", scores: { normal: 0, femboy: 80, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Langsung meong-meong balik ke dia", scores: { normal: 0, femboy: 100, tomboy: 60, abnormal: 40, jujur_cewek: 60, jujur_cowok: 0 } as any },
      { text: "Mencoba ritual pemanggilan arwah kucing", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 7,
    text: "Apa impian terbesarmu di masa depan?",
    answers: [
      { text: "Menjadi orang sukses dan dihormati", scores: { normal: 100, femboy: 20, tomboy: 20, abnormal: 0, jujur_cewek: 40, jujur_cowok: 100 } as any },
      { text: "Menjadi idol atau influencer terkenal", scores: { normal: 20, femboy: 80, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Menjadi maid/butler yang paling imut", scores: { normal: 0, femboy: 100, tomboy: 60, abnormal: 40, jujur_cewek: 20, jujur_cowok: 0 } as any },
      { text: "Membangun kerajaan di planet Mars", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 8,
    text: "Aksesoris apa yang wajib kamu pakai?",
    answers: [
      { text: "Jam tangan atau kacamata hitam", scores: { normal: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 100 } as any },
      { text: "Choker, pita, atau bando telinga kucing", scores: { normal: 0, femboy: 100, tomboy: 80, abnormal: 20, jujur_cewek: 40, jujur_cowok: 0 } as any },
      { text: "Anting, kalung, atau cincin cantik", scores: { normal: 40, femboy: 40, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Rantai besi atau jimat pelindung", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 9,
    text: "Bagaimana perasaanmu saat ini?",
    answers: [
      { text: "Fokus, tenang, dan siap bekerja", scores: { normal: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 20, jujur_cowok: 100 } as any },
      { text: "Merasa sangat cantik/ganteng dan bahagia", scores: { normal: 40, femboy: 80, tomboy: 80, abnormal: 0, jujur_cewek: 100, jujur_cowok: 60 } as any },
      { text: "Ingin dimanja dan dipeluk erat", scores: { normal: 0, femboy: 100, tomboy: 100, abnormal: 20, jujur_cewek: 80, jujur_cowok: 0 } as any },
      { text: "Saya merasa seperti glitch dalam matriks", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 10,
    text: "Menurutmu, apa itu cinta?",
    answers: [
      { text: "Tanggung jawab dan kesetiaan mutlak", scores: { normal: 100, femboy: 20, tomboy: 40, abnormal: 0, jujur_cewek: 60, jujur_cowok: 100 } as any },
      { text: "Sesuatu yang manis, indah, dan berbunga", scores: { normal: 40, femboy: 80, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Headpats, pelukan, dan perhatian penuh", scores: { normal: 0, femboy: 100, tomboy: 60, abnormal: 20, jujur_cewek: 80, jujur_cowok: 0 } as any },
      { text: "Cinta adalah konspirasi pemerintah", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 11,
    text: "Jika kamu menemukan dompet di jalan, apa yang kamu lakukan?",
    answers: [
      { text: "Mencari pemiliknya lewat identitas di dalam", scores: { normal: 80, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 100, jujur_cowok: 100 } as any },
      { text: "Menyerahkannya ke kantor polisi terdekat", scores: { normal: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 100, jujur_cowok: 100 } as any },
      { text: "Berharap ada hadiah kalau dikembalikan", scores: { normal: 40, femboy: 60, tomboy: 60, abnormal: 20, jujur_cewek: 40, jujur_cowok: 40 } as any },
      { text: "Memakan dompetnya untuk menyerap energinya", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 12,
    text: "Bagaimana caramu menghadapi masalah?",
    answers: [
      { text: "Dihadapi dengan kepala dingin dan logika", scores: { normal: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 40, jujur_cowok: 100 } as any },
      { text: "Curhat ke teman sambil menangis sedikit", scores: { normal: 20, femboy: 80, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Bersembunyi di bawah selimut yang hangat", scores: { normal: 0, femboy: 100, tomboy: 60, abnormal: 40, jujur_cewek: 60, jujur_cowok: 0 } as any },
      { text: "Masalah tidak ada jika saya tidak ada", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 13,
    text: "Terakhir, bagaimana kamu ingin diingat?",
    answers: [
      { text: "Sebagai orang yang berguna dan sukses", scores: { normal: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 40, jujur_cowok: 100 } as any },
      { text: "Sebagai sosok yang cantik dan menginspirasi", scores: { normal: 20, femboy: 60, tomboy: 100, abnormal: 0, jujur_cewek: 100, jujur_cowok: 0 } as any },
      { text: "Sebagai pribadi yang jujur dan tulus", scores: { normal: 60, femboy: 40, tomboy: 40, abnormal: 0, jujur_cewek: 100, jujur_cowok: 100 } as any },
      { text: "Sebagai legenda urban yang menakutkan", scores: { normal: 0, femboy: 0, tomboy: 0, abnormal: 100, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 14,
    text: "Bagaimana gaya ketawamu saat chatting?",
    answers: [
      { text: "Wkwkwkw (Klasik dan santai)", scores: { normal: 100, jujur_cowok: 80, jujur_cewek: 80, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Awokawok (Sedikit liar dan unik)", scores: { normal: 0, abnormal: 100, femboy: 40, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Hahahaha (Formal tapi ekspresif)", scores: { normal: 80, jujur_cowok: 60, jujur_cewek: 60, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Hehehe atau Hihihi (Imut dan misterius)", scores: { normal: 0, femboy: 100, tomboy: 80, abnormal: 20, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 15,
    text: "Apa hobi yang paling kamu nikmati?",
    answers: [
      { text: "Membaca buku atau menulis", scores: { normal: 100, jujur_cewek: 80, femboy: 0, tomboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Bermain game atau coding", scores: { normal: 60, jujur_cowok: 100, femboy: 40, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Menonton anime atau menggambar", scores: { normal: 0, femboy: 100, abnormal: 60, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Jalan-jalan atau shopping", scores: { normal: 60, tomboy: 100, femboy: 0, abnormal: 0, jujur_cewek: 80, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 16,
    text: "Hewan apa yang ingin kamu pelihara?",
    answers: [
      { text: "Anjing (Setia dan tangguh)", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Kucing (Manja dan menggemaskan)", scores: { normal: 0, femboy: 100, tomboy: 100, jujur_cewek: 100, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Burung atau Ikan (Tenang)", scores: { normal: 80, jujur_cowok: 60, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Ular atau Laba-laba (Eksotis)", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 17,
    text: "Genre film apa yang paling kamu suka?",
    answers: [
      { text: "Action atau Thriller", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Romance atau Drama", scores: { normal: 0, tomboy: 100, jujur_cewek: 100, femboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Horror atau Sci-Fi", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Slice of Life atau Komedi", scores: { normal: 60, femboy: 100, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 18,
    text: "Tempat liburan impianmu?",
    answers: [
      { text: "Gunung yang sejuk", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Pantai yang indah", scores: { normal: 0, tomboy: 100, jujur_cewek: 100, femboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Kota besar yang modern", scores: { normal: 80, femboy: 60, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Kamar sendiri (Introvert life)", scores: { normal: 0, abnormal: 100, femboy: 80, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 19,
    text: "Bagaimana caramu belajar yang paling efektif?",
    answers: [
      { text: "Mendengarkan musik", scores: { normal: 60, femboy: 80, tomboy: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Suasana yang sangat tenang", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Sambil ngemil atau minum kopi", scores: { normal: 0, tomboy: 100, jujur_cewek: 100, femboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "SKS (Sistem Kebut Semalam)", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 20,
    text: "Apa yang kamu lakukan saat sedang marah?",
    answers: [
      { text: "Diam seribu bahasa", scores: { normal: 100, jujur_cewek: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Meledak-ledak dan frontal", scores: { normal: 0, abnormal: 80, jujur_cowok: 100, femboy: 0, tomboy: 0, jujur_cewek: 0 } as any },
      { text: "Menangis sendirian", scores: { normal: 0, femboy: 100, tomboy: 100, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Tertawa jahat (Villain arc)", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 21,
    text: "Bagaimana reaksimu saat dipuji oleh orang lain?",
    answers: [
      { text: "Tersenyum sopan dan bilang terima kasih", scores: { normal: 100, jujur_cowok: 80, jujur_cewek: 80, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Wajah memerah dan jadi salah tingkah", scores: { normal: 0, femboy: 100, tomboy: 80, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Langsung memuji balik mereka", scores: { normal: 60, jujur_cewek: 100, tomboy: 80, femboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Bertanya 'Apa maumu sebenarnya?'", scores: { normal: 0, abnormal: 100, jujur_cowok: 60, femboy: 0, tomboy: 0, jujur_cewek: 0 } as any },
    ]
  },
  {
    id: 22,
    text: "Apa jenis musik yang paling sering kamu dengar?",
    answers: [
      { text: "Pop atau lagu-lagu yang sedang hits", scores: { normal: 100, jujur_cewek: 80, jujur_cowok: 80, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Lagu-lagu anime atau J-Pop", scores: { normal: 0, femboy: 100, abnormal: 60, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Rock, Metal, atau EDM", scores: { normal: 60, jujur_cowok: 100, abnormal: 40, femboy: 0, tomboy: 0, jujur_cewek: 0 } as any },
      { text: "Lagu klasik atau instrumental", scores: { normal: 80, tomboy: 80, jujur_cewek: 60, femboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 23,
    text: "Bagaimana caramu menghabiskan uang?",
    answers: [
      { text: "Menabung untuk masa depan", scores: { normal: 100, jujur_cowok: 100, jujur_cewek: 100, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Membeli barang-barang imut dan koleksi", scores: { normal: 0, femboy: 100, tomboy: 80, abnormal: 40, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Traktir teman-teman atau keluarga", scores: { normal: 80, jujur_cowok: 60, jujur_cewek: 100, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Membeli barang aneh yang tidak berguna", scores: { normal: 0, abnormal: 100, femboy: 40, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 24,
    text: "Apa yang kamu lakukan jika melihat teman sedang sedih?",
    answers: [
      { text: "Memberikan solusi yang logis", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Mendengarkan dan memeluk mereka", scores: { normal: 0, femboy: 80, tomboy: 100, jujur_cewek: 100, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Mengajak mereka makan atau jalan-jalan", scores: { normal: 80, jujur_cewek: 80, jujur_cowok: 60, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Menceritakan lelucon yang sangat garing", scores: { normal: 0, abnormal: 100, femboy: 40, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 25,
    text: "Bagaimana caramu mengambil keputusan?",
    answers: [
      { text: "Berpikir panjang dan menganalisis risiko", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Mengikuti kata hati dan perasaan", scores: { normal: 0, femboy: 80, tomboy: 100, jujur_cewek: 100, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Bertanya pendapat orang lain dulu", scores: { normal: 80, jujur_cewek: 60, femboy: 40, tomboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Lempar koin atau asal pilih saja", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 26,
    text: "Apa yang paling kamu benci dari orang lain?",
    answers: [
      { text: "Kebohongan dan ketidaktulusan", scores: { normal: 100, jujur_cowok: 100, jujur_cewek: 100, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Kekasaran dan perilaku yang tidak sopan", scores: { normal: 80, femboy: 80, tomboy: 100, jujur_cewek: 80, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Orang yang terlalu membosankan", scores: { normal: 0, abnormal: 100, femboy: 40, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Orang yang terlalu berisik", scores: { normal: 60, jujur_cowok: 60, femboy: 0, tomboy: 0, abnormal: 40, jujur_cewek: 0 } as any },
    ]
  },
  {
    id: 27,
    text: "Bagaimana caramu berpakaian saat acara formal?",
    answers: [
      { text: "Jas atau kemeja rapi", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Gaun yang cantik dan feminin", scores: { normal: 0, tomboy: 100, jujur_cewek: 100, femboy: 0, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Kostum yang unik tapi tetap sopan", scores: { normal: 0, femboy: 100, abnormal: 60, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Apa saja yang nyaman dipakai", scores: { normal: 80, jujur_cowok: 40, jujur_cewek: 40, abnormal: 40, femboy: 0, tomboy: 0 } as any },
    ]
  },
  {
    id: 28,
    text: "Apa yang kamu lakukan saat merasa bosan?",
    answers: [
      { text: "Scrolling media sosial tanpa henti", scores: { normal: 100, femboy: 40, tomboy: 40, abnormal: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Tidur atau melamun", scores: { normal: 80, abnormal: 60, femboy: 40, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
      { text: "Mencari kesibukan baru atau belajar", scores: { normal: 100, jujur_cowok: 100, jujur_cewek: 100, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Mengajak bicara benda mati", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 29,
    text: "Bagaimana caramu menunjukkan kasih sayang?",
    answers: [
      { text: "Memberikan bantuan atau tindakan nyata", scores: { normal: 100, jujur_cowok: 100, femboy: 0, tomboy: 0, abnormal: 0, jujur_cewek: 0 } as any },
      { text: "Memberikan hadiah atau kejutan manis", scores: { normal: 0, tomboy: 100, jujur_cewek: 100, femboy: 60, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Melalui kata-kata pujian dan perhatian", scores: { normal: 80, jujur_cewek: 80, femboy: 80, tomboy: 80, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Dengan cara yang aneh dan sulit dimengerti", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  },
  {
    id: 30,
    text: "Apa yang kamu lakukan jika kamu bisa menjadi tidak terlihat selama satu hari?",
    answers: [
      { text: "Membantu orang lain secara diam-diam", scores: { normal: 100, jujur_cowok: 80, jujur_cewek: 80, femboy: 0, tomboy: 0, abnormal: 0 } as any },
      { text: "Masuk ke tempat-tempat yang dilarang", scores: { normal: 0, abnormal: 100, jujur_cowok: 60, femboy: 0, tomboy: 0, jujur_cewek: 0 } as any },
      { text: "Mendengarkan apa yang orang katakan tentangku", scores: { normal: 60, femboy: 80, tomboy: 80, jujur_cewek: 60, abnormal: 0, jujur_cowok: 0 } as any },
      { text: "Hanya ingin tahu rasanya jadi hantu", scores: { normal: 0, abnormal: 100, femboy: 0, tomboy: 0, jujur_cewek: 0, jujur_cowok: 0 } as any },
    ]
  }
];

export const TASTE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Apa camilan favoritmu saat menonton film?",
    answers: [
      { text: "Popcorn karamel yang legit", scores: { manis: 100, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 20 } as any },
      { text: "Keripik kentang yang renyah", scores: { manis: 0, asin: 100, pedas: 0, asam: 0, pahit: 0, gurih: 60 } as any },
      { text: "Makaroni pedas level tinggi", scores: { manis: 0, asin: 20, pedas: 100, asam: 0, pahit: 0, gurih: 40 } as any },
      { text: "Kacang goreng bawang", scores: { manis: 0, asin: 40, pedas: 0, asam: 0, pahit: 0, gurih: 100 } as any },
    ]
  },
  {
    id: 2,
    text: "Pilih minuman untuk menemani harimu yang panas:",
    answers: [
      { text: "Es teh manis atau boba", scores: { manis: 100, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Lemonade yang sangat asam", scores: { manis: 20, asin: 0, pedas: 0, asam: 100, pahit: 0, gurih: 0 } as any },
      { text: "Kopi hitam tanpa gula", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 100, gurih: 20 } as any },
      { text: "Air kelapa muda segar", scores: { manis: 40, asin: 20, pedas: 0, asam: 0, pahit: 0, gurih: 40 } as any },
    ]
  },
  {
    id: 3,
    text: "Bagaimana perasaanmu tentang cokelat hitam (dark chocolate)?",
    answers: [
      { text: "Terlalu pahit, saya tidak suka", scores: { manis: 80, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Sangat suka, rasa pahitnya elegan", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 100, gurih: 20 } as any },
      { text: "Biasa saja, lebih suka cokelat susu", scores: { manis: 60, asin: 0, pedas: 0, asam: 0, pahit: 20, gurih: 40 } as any },
      { text: "Suka kalau ada campuran garam lautnya", scores: { manis: 40, asin: 80, pedas: 0, asam: 0, pahit: 40, gurih: 20 } as any },
    ]
  },
  {
    id: 4,
    text: "Saat makan bakso, apa yang paling banyak kamu tambahkan?",
    answers: [
      { text: "Sambal yang banyak sampai merah", scores: { manis: 0, asin: 0, pedas: 100, asam: 0, pahit: 0, gurih: 40 } as any },
      { text: "Kecap manis yang melimpah", scores: { manis: 100, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 20 } as any },
      { text: "Cuka atau perasan jeruk nipis", scores: { manis: 0, asin: 0, pedas: 0, asam: 100, pahit: 0, gurih: 20 } as any },
      { text: "Garam atau penyedap rasa tambahan", scores: { manis: 0, asin: 100, pedas: 0, asam: 0, pahit: 0, gurih: 60 } as any },
    ]
  },
  {
    id: 5,
    text: "Pilih buah favoritmu:",
    answers: [
      { text: "Mangga matang yang manis", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Jeruk nipis atau kedondong", scores: { manis: 0, asin: 0, pedas: 0, asam: 5, pahit: 0, gurih: 0 } as any },
      { text: "Durian yang legit dan gurih", scores: { manis: 3, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Pare (kalau dianggap buah)", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 5, gurih: 0 } as any },
    ]
  },
  {
    id: 6,
    text: "Bagaimana seleramu terhadap masakan Padang?",
    answers: [
      { text: "Suka bumbunya yang gurih dan berempah", scores: { manis: 0, asin: 1, pedas: 2, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Suka sambal ijonya yang pedas", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 2 } as any },
      { text: "Suka rendangnya yang agak manis", scores: { manis: 4, asin: 0, pedas: 1, asam: 0, pahit: 0, gurih: 3 } as any },
      { text: "Suka daun singkongnya yang agak pahit", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 4, gurih: 2 } as any },
    ]
  },
  {
    id: 7,
    text: "Apa sarapan idealmu?",
    answers: [
      { text: "Bubur ayam dengan banyak kaldu", scores: { manis: 0, asin: 2, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Roti bakar selai cokelat/strawberry", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Nasi uduk yang gurih dan asin", scores: { manis: 0, asin: 4, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Hanya minum jamu pahit", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 5, gurih: 0 } as any },
    ]
  },
  {
    id: 8,
    text: "Pilih jenis mie instan favoritmu:",
    answers: [
      { text: "Mie goreng original (gurih)", scores: { manis: 1, asin: 2, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Mie kuah soto (asam segar)", scores: { manis: 0, asin: 1, pedas: 1, asam: 5, pahit: 0, gurih: 2 } as any },
      { text: "Mie pedas mampus", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 1 } as any },
      { text: "Mie goreng aceh (rempah kuat)", scores: { manis: 0, asin: 1, pedas: 3, asam: 0, pahit: 0, gurih: 5 } as any },
    ]
  },
  {
    id: 9,
    text: "Bagaimana pendapatmu tentang rujak?",
    answers: [
      { text: "Suka bumbu kacangnya yang manis pedas", scores: { manis: 4, asin: 0, pedas: 4, asam: 0, pahit: 0, gurih: 2 } as any },
      { text: "Suka buahnya yang asam-asam segar", scores: { manis: 0, asin: 0, pedas: 0, asam: 5, pahit: 0, gurih: 0 } as any },
      { text: "Suka kalau ada tambahan garam", scores: { manis: 0, asin: 5, pedas: 0, asam: 0, pahit: 0, gurih: 1 } as any },
      { text: "Tidak suka, terlalu campur aduk", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 2, gurih: 0 } as any },
    ]
  },
  {
    id: 10,
    text: "Pilih dessert favoritmu:",
    answers: [
      { text: "Ice cream vanilla/cokelat", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Cheesecake (gurih asin)", scores: { manis: 2, asin: 3, pedas: 0, asam: 0, pahit: 0, gurih: 4 } as any },
      { text: "Salad buah saus yogurt (asam)", scores: { manis: 2, asin: 0, pedas: 0, asam: 5, pahit: 0, gurih: 1 } as any },
      { text: "Matcha asli yang pahit", scores: { manis: 1, asin: 0, pedas: 0, asam: 0, pahit: 5, gurih: 1 } as any },
    ]
  },
  {
    id: 11,
    text: "Saat memasak sendiri, apa yang paling sering kamu cicipi?",
    answers: [
      { text: "Apakah sudah cukup manis?", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Apakah sudah cukup asin?", scores: { manis: 0, asin: 5, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Apakah sudah cukup gurih/sedap?", scores: { manis: 0, asin: 1, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Apakah sudah cukup pedas?", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 0 } as any },
    ]
  },
  {
    id: 12,
    text: "Pilih aroma makanan yang paling menggoda:",
    answers: [
      { text: "Aroma kue yang baru dipanggang", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Aroma sate yang sedang dibakar", scores: { manis: 1, asin: 1, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Aroma tumisan bawang dan terasi", scores: { manis: 0, asin: 2, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Aroma jeruk nipis yang segar", scores: { manis: 0, asin: 0, pedas: 0, asam: 5, pahit: 0, gurih: 0 } as any },
    ]
  },
  {
    id: 13,
    text: "Terakhir, rasa apa yang paling tidak bisa kamu tinggalkan?",
    answers: [
      { text: "Rasa Manis (Mood booster)", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Rasa Pedas (Penambah nafsu makan)", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Rasa Gurih (Kenikmatan hakiki)", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Rasa Asam (Kesegaran luar biasa)", scores: { manis: 0, asin: 0, pedas: 0, asam: 5, pahit: 0, gurih: 0 } as any },
    ]
  },
  {
    id: 14,
    text: "Rasa apa yang paling kamu cari saat cuaca sedang dingin?",
    answers: [
      { text: "Sup hangat yang sangat gurih", scores: { manis: 0, asin: 1, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Cokelat panas yang manis", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Wedang jahe yang pedas hangat", scores: { manis: 1, asin: 0, pedas: 5, asam: 0, pahit: 1, gurih: 0 } as any },
      { text: "Kopi pahit untuk menghangatkan diri", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 5, gurih: 1 } as any },
    ]
  },
  {
    id: 15,
    text: "Saat cuaca sangat panas, apa yang paling menyegarkan bagimu?",
    answers: [
      { text: "Es krim buah yang manis", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Rujak cuka yang sangat asam", scores: { manis: 0, asin: 0, pedas: 1, asam: 5, pahit: 0, gurih: 0 } as any },
      { text: "Minuman isotonik yang agak asin", scores: { manis: 0, asin: 5, pedas: 0, asam: 1, pahit: 0, gurih: 0 } as any },
      { text: "Es kopi susu yang gurih", scores: { manis: 2, asin: 0, pedas: 0, asam: 0, pahit: 1, gurih: 4 } as any },
    ]
  },
  {
    id: 16,
    text: "Apa rasa camilan wajib saat menonton pertandingan olahraga?",
    answers: [
      { text: "Kacang atom yang gurih", scores: { manis: 0, asin: 2, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Kuaci yang asin", scores: { manis: 0, asin: 5, pedas: 0, asam: 0, pahit: 0, gurih: 1 } as any },
      { text: "Cilok bumbu pedas", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 2 } as any },
      { text: "Donat mini yang manis", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
    ]
  },
  {
    id: 17,
    text: "Rasa apa yang membantumu lebih fokus saat belajar/bekerja?",
    answers: [
      { text: "Permen karet rasa mint (segar)", scores: { manis: 2, asin: 0, pedas: 0, asam: 3, pahit: 0, gurih: 0 } as any },
      { text: "Kopi hitam (pahit)", scores: { manis: 0, asin: 0, pedas: 0, asam: 0, pahit: 5, gurih: 1 } as any },
      { text: "Camilan gurih (micin life)", scores: { manis: 0, asin: 1, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Cokelat susu (manis)", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
    ]
  },
  {
    id: 18,
    text: "Saat sedang stres, rasa apa yang menjadi pelarianmu?",
    answers: [
      { text: "Makanan super pedas (biar berkeringat)", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 1 } as any },
      { text: "Kue-kue manis (sugar rush)", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Gorengan yang asin dan gurih", scores: { manis: 0, asin: 3, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Minuman asam yang segar", scores: { manis: 0, asin: 0, pedas: 0, asam: 5, pahit: 0, gurih: 0 } as any },
    ]
  },
  {
    id: 19,
    text: "Rasa apa yang paling dominan saat kumpul keluarga besar?",
    answers: [
      { text: "Opor atau Rendang yang gurih", scores: { manis: 0, asin: 1, pedas: 1, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Aneka kue basah yang manis", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Asinan buah yang asam segar", scores: { manis: 1, asin: 0, pedas: 0, asam: 5, pahit: 0, gurih: 0 } as any },
      { text: "Sambal goreng yang pedas", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 2 } as any },
    ]
  },
  {
    id: 20,
    text: "Jika sedang kencan, rasa apa yang ingin kamu bagi bersama pasangan?",
    answers: [
      { text: "Dessert manis yang romantis", scores: { manis: 5, asin: 0, pedas: 0, asam: 0, pahit: 0, gurih: 0 } as any },
      { text: "Pasta atau Pizza yang gurih", scores: { manis: 0, asin: 2, pedas: 0, asam: 0, pahit: 0, gurih: 5 } as any },
      { text: "Makanan pedas biar makin seru", scores: { manis: 0, asin: 0, pedas: 5, asam: 0, pahit: 0, gurih: 1 } as any },
      { text: "Sushi dengan wasabi yang menyengat", scores: { manis: 0, asin: 1, pedas: 3, asam: 0, pahit: 2, gurih: 4 } as any },
    ]
  }
];

export const PERSONALITY_RESULTS: Record<string, SurveyResult> = {
  femboy: {
    category: 'femboy',
    title: "The Adorable Femboy",
    description: "Kamu adalah perpaduan sempurna antara keimutan dan keberanian untuk menjadi diri sendiri. Dengan pesona yang tak tertahankan, kamu suka mengekspresikan sisi lembutmu dan selalu menjadi pusat perhatian yang menggemaskan!",
    tooltip: "Suka mengekspresikan sisi lembut dan imut dengan percaya diri.",
    color: "bg-pink-400",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop"
  },
  tomboy: {
    category: 'tomboy',
    title: "The Cool Tomboy",
    description: "Kamu adalah cewek yang mandiri, tangguh, dan tidak takut untuk tampil apa adanya. Dengan gaya yang santai dan jiwa petualang, kamu memiliki pesona unik yang membuat orang lain merasa nyaman di dekatmu!",
    tooltip: "Mandiri, tangguh, dan memiliki gaya yang santai serta berjiwa petualang.",
    color: "bg-indigo-500",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
  },
  normal: {
    category: 'normal',
    title: "The Balanced Normal",
    description: "Kamu adalah orang yang stabil dan mengikuti norma sosial dengan baik. Kamu praktis, logis, dan tidak terlalu suka hal-hal yang berlebihan.",
    tooltip: "Stabil, logis, dan mengikuti norma sosial dengan baik.",
    color: "bg-blue-400",
    imageUrl: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1000&auto=format&fit=crop"
  },
  abnormal: {
    category: 'abnormal',
    title: "The Chaos Abnormal",
    description: "Cara berpikirmu sangat unik, bahkan mungkin sedikit aneh bagi orang lain. Kamu tidak peduli dengan aturan dunia ini dan hidup di dimensimu sendiri!",
    tooltip: "Unik, eksentrik, dan memiliki cara pandang dunia yang berbeda.",
    color: "bg-purple-600",
    imageUrl: "https://images.unsplash.com/photo-1614583225154-5feade0473c2?q=80&w=1000&auto=format&fit=crop"
  },
  jujur_cewek: {
    category: 'jujur_cewek',
    title: "The Honest Sweetheart",
    description: "Kamu adalah sosok cewek yang sangat tulus dan apa adanya. Kejujuranmu adalah kecantikan utamamu, membuat orang lain merasa sangat nyaman dan percaya padamu di setiap situasi.",
    tooltip: "Tulus, jujur, dan apa adanya dalam setiap perkataan.",
    color: "bg-emerald-400",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop"
  },
  jujur_cowok: {
    category: 'jujur_cowok',
    title: "The Honest Gentleman",
    description: "Kamu adalah pria sejati yang memegang teguh kata-katamu. Kejujuran dan integritasmu adalah kekuatan terbesarmu yang sangat dikagumi oleh orang-orang di sekitarmu.",
    tooltip: "Berintegritas tinggi, jujur, dan memegang teguh janji.",
    color: "bg-teal-600",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
  }
};

export const TASTE_RESULTS: Record<string, SurveyResult> = {
  manis: {
    category: 'manis',
    title: "Si Pecinta Manis",
    description: "Kamu adalah orang yang ceria dan menyukai kenyamanan. Rasa manis bagimu adalah sumber energi dan kebahagiaan. Kamu cenderung memiliki kepribadian yang lembut dan mudah disukai orang lain.",
    tooltip: "Ceria, lembut, dan menyukai kenyamanan hidup.",
    color: "bg-pink-400",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop"
  },
  asin: {
    category: 'asin',
    title: "Si Penggemar Asin",
    description: "Kamu adalah orang yang praktis dan apa adanya. Kamu menyukai hal-hal yang jelas dan tegas. Rasa asin memberikan sensasi kepuasan yang nyata bagimu dalam setiap hidangan.",
    tooltip: "Praktis, apa adanya, dan menyukai kejelasan.",
    color: "bg-blue-400",
    imageUrl: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?q=80&w=1000&auto=format&fit=crop"
  },
  pedas: {
    category: 'pedas',
    title: "Si Penantang Pedas",
    description: "Kamu adalah pemberani yang menyukai tantangan dan petualangan. Rasa pedas bagimu adalah adrenalin. Kamu tidak takut mencoba hal baru dan selalu penuh semangat dalam menjalani hidup.",
    tooltip: "Pemberani, penuh semangat, dan menyukai tantangan.",
    color: "bg-red-500",
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1000&auto=format&fit=crop"
  },
  asam: {
    category: 'asam',
    title: "Si Penyuka Asam",
    description: "Kamu adalah pribadi yang segar dan unik. Kamu menyukai kejutan dan hal-hal yang membangkitkan semangat. Rasa asam bagimu adalah simbol kesegaran dan kecerdasan dalam berpikir.",
    tooltip: "Segar, unik, dan memiliki pemikiran yang cerdas.",
    color: "bg-yellow-400",
    imageUrl: "https://images.unsplash.com/photo-1591333139245-2b411c9d7b7c?q=80&w=1000&auto=format&fit=crop"
  },
  pahit: {
    category: 'pahit',
    title: "Si Penikmat Pahit",
    description: "Kamu adalah sosok yang dewasa, tenang, and mendalam. Kamu bisa menghargai sisi lain dari kehidupan yang mungkin tidak disukai orang lain. Bagimu, rasa pahit memiliki keindahan dan filosofi tersendiri.",
    tooltip: "Dewasa, tenang, dan memiliki pemikiran yang mendalam.",
    color: "bg-stone-700",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop"
  },
  gurih: {
    category: 'gurih',
    title: "Si Ahli Gurih (Umami)",
    description: "Kamu adalah penikmat kuliner sejati yang menghargai keseimbangan. Kamu menyukai kedalaman rasa dan kenyamanan. Kamu cenderung menjadi orang yang hangat dan bisa menyatukan berbagai perbedaan.",
    tooltip: "Hangat, seimbang, dan bisa menyatukan perbedaan.",
    color: "bg-orange-500",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
  }
};
