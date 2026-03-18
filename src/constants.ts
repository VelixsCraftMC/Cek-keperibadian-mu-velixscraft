import { Question, SurveyResult, Category } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Bagaimana gaya berpakaian favoritmu saat keluar rumah?",
    answers: [
      { text: "Maskulin, rapi, dan fungsional", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 2 } },
      { text: "Imut, warna pastel, dan penuh aksesoris lucu", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 1, jujur_cewek: 1, jujur_cowok: 0 } },
      { text: "Feminin, elegan, dan terlihat berkelas", scores: { normal: 2, femboy: 0, femgirl: 5, abnormal: 0, jujur_cewek: 2, jujur_cowok: 0 } },
      { text: "Sesuatu yang nyentrik, aneh, dan mencolok", scores: { normal: 0, femboy: 1, femgirl: 1, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 2,
    text: "Apa yang biasanya kamu lakukan di waktu luang?",
    answers: [
      { text: "Olahraga berat atau gaming kompetitif", scores: { normal: 4, femboy: 1, femgirl: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 3 } },
      { text: "Melakukan rutinitas skincare atau dandan", scores: { normal: 0, femboy: 4, femgirl: 5, abnormal: 0, jujur_cewek: 3, jujur_cowok: 0 } },
      { text: "Cosplay atau mengoleksi barang-barang estetik", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 2, jujur_cewek: 1, jujur_cowok: 0 } },
      { text: "Berdiskusi dengan bayangan sendiri", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 3,
    text: "Minuman apa yang paling menggambarkan kepribadianmu?",
    answers: [
      { text: "Kopi hitam pekat atau air mineral dingin", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 4 } },
      { text: "Milk tea manis dengan boba kenyal", scores: { normal: 1, femboy: 4, femgirl: 4, abnormal: 0, jujur_cewek: 4, jujur_cowok: 0 } },
      { text: "Jus buah segar tanpa pemanis buatan", scores: { normal: 3, femboy: 1, femgirl: 3, abnormal: 0, jujur_cewek: 5, jujur_cowok: 5 } },
      { text: "Ramuan rahasia yang warnanya berubah-ubah", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 4,
    text: "Bagaimana caramu menyapa orang baru?",
    answers: [
      { text: "Halo, senang berkenalan denganmu", scores: { normal: 5, femboy: 0, femgirl: 2, abnormal: 0, jujur_cewek: 3, jujur_cowok: 3 } },
      { text: "Haiii~! (dengan senyum paling manis)", scores: { normal: 1, femboy: 4, femgirl: 5, abnormal: 0, jujur_cewek: 4, jujur_cowok: 0 } },
      { text: "Nyaa~ atau UwU (sambil malu-malu)", scores: { normal: 0, femboy: 5, femgirl: 2, abnormal: 3, jujur_cewek: 0, jujur_cowok: 0 } },
      { text: "Hanya menatap sampai mereka merasa canggung", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 5,
    text: "Apa pendapatmu tentang mengenakan rok?",
    answers: [
      { text: "Pakaian formal yang sopan untuk wanita", scores: { normal: 5, femboy: 0, femgirl: 3, abnormal: 0, jujur_cewek: 4, jujur_cowok: 0 } },
      { text: "Sangat nyaman, bebas, dan terlihat imut!", scores: { normal: 0, femboy: 5, femgirl: 5, abnormal: 0, jujur_cewek: 2, jujur_cowok: 0 } },
      { text: "Biasa saja, tergantung situasinya", scores: { normal: 3, femboy: 1, femgirl: 1, abnormal: 0, jujur_cewek: 1, jujur_cowok: 1 } },
      { text: "Saya lebih suka pakai jubah gaib", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 6,
    text: "Warna apa yang paling mewakili energimu?",
    answers: [
      { text: "Biru laut atau Hitam elegan", scores: { normal: 5, femboy: 1, femgirl: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 5 } },
      { text: "Pink cerah atau Putih bersih", scores: { normal: 0, femboy: 5, femgirl: 5, abnormal: 0, jujur_cewek: 5, jujur_cowok: 0 } },
      { text: "Ungu misterius atau Kuning ceria", scores: { normal: 2, femboy: 3, femgirl: 3, abnormal: 1, jujur_cewek: 3, jujur_cowok: 3 } },
      { text: "Warna yang hanya bisa didengar, bukan dilihat", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 7,
    text: "Reaksi spontanmu saat melihat kucing jalanan?",
    answers: [
      { text: "Kasihan, ingin memberi makan", scores: { normal: 4, femboy: 1, femgirl: 2, abnormal: 0, jujur_cewek: 5, jujur_cowok: 5 } },
      { text: "KYAAA! GEMES BANGET MAU CULIK!", scores: { normal: 0, femboy: 4, femgirl: 5, abnormal: 0, jujur_cewek: 4, jujur_cowok: 0 } },
      { text: "Langsung meong-meong balik ke dia", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 2, jujur_cewek: 0, jujur_cowok: 0 } },
      { text: "Mencoba ritual pemanggilan arwah kucing", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 8,
    text: "Gaya tertawamu di media sosial?",
    answers: [
      { text: "Wkwkwk atau Hahaha (standar)", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 1, jujur_cowok: 5 } },
      { text: "Hehehe~ atau Hihi (manis)", scores: { normal: 1, femboy: 5, femgirl: 4, abnormal: 0, jujur_cewek: 5, jujur_cowok: 0 } },
      { text: "Aksjdhfksjdh (keyboard smash heboh)", scores: { normal: 0, femboy: 3, femgirl: 5, abnormal: 2, jujur_cewek: 4, jujur_cowok: 0 } },
      { text: "Simbol-simbol kuno yang tidak terbaca", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 9,
    text: "Apa impian terbesarmu di masa depan?",
    answers: [
      { text: "Menjadi orang sukses dan dihormati", scores: { normal: 5, femboy: 1, femgirl: 1, abnormal: 0, jujur_cewek: 2, jujur_cowok: 5 } },
      { text: "Menjadi idol atau influencer terkenal", scores: { normal: 1, femboy: 4, femgirl: 5, abnormal: 0, jujur_cewek: 5, jujur_cowok: 0 } },
      { text: "Menjadi maid/butler yang paling imut", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 2, jujur_cewek: 1, jujur_cowok: 0 } },
      { text: "Membangun kerajaan di planet Mars", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 10,
    text: "Aksesoris apa yang wajib kamu pakai?",
    answers: [
      { text: "Jam tangan atau kacamata hitam", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 0, jujur_cowok: 5 } },
      { text: "Choker, pita, atau bando telinga kucing", scores: { normal: 0, femboy: 5, femgirl: 4, abnormal: 1, jujur_cewek: 2, jujur_cowok: 0 } },
      { text: "Anting, kalung, atau cincin cantik", scores: { normal: 2, femboy: 2, femgirl: 5, abnormal: 0, jujur_cewek: 5, jujur_cowok: 0 } },
      { text: "Rantai besi atau jimat pelindung", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 11,
    text: "Bagaimana perasaanmu saat ini?",
    answers: [
      { text: "Fokus, tenang, dan siap bekerja", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 1, jujur_cowok: 5 } },
      { text: "Merasa sangat cantik/ganteng dan bahagia", scores: { normal: 2, femboy: 4, femgirl: 4, abnormal: 0, jujur_cewek: 5, jujur_cowok: 3 } },
      { text: "Ingin dimanja dan dipeluk erat", scores: { normal: 0, femboy: 5, femgirl: 5, abnormal: 1, jujur_cewek: 4, jujur_cowok: 0 } },
      { text: "Saya merasa seperti glitch dalam matriks", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 12,
    text: "Menurutmu, apa itu cinta?",
    answers: [
      { text: "Tanggung jawab dan kesetiaan mutlak", scores: { normal: 5, femboy: 1, femgirl: 2, abnormal: 0, jujur_cewek: 3, jujur_cowok: 5 } },
      { text: "Sesuatu yang manis, indah, dan berbunga", scores: { normal: 2, femboy: 4, femgirl: 5, abnormal: 0, jujur_cewek: 5, jujur_cowok: 0 } },
      { text: "Headpats, pelukan, dan perhatian penuh", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 1, jujur_cewek: 4, jujur_cowok: 0 } },
      { text: "Cinta adalah konspirasi pemerintah", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 13,
    text: "Jika kamu menemukan dompet di jalan, apa yang kamu lakukan?",
    answers: [
      { text: "Mencari pemiliknya lewat identitas di dalam", scores: { normal: 4, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 5, jujur_cowok: 5 } },
      { text: "Menyerahkannya ke kantor polisi terdekat", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 4, jujur_cowok: 5 } },
      { text: "Berharap ada hadiah kalau dikembalikan", scores: { normal: 2, femboy: 3, femgirl: 3, abnormal: 1, jujur_cewek: 2, jujur_cowok: 2 } },
      { text: "Memakan dompetnya untuk menyerap energinya", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 14,
    text: "Bagaimana caramu menghadapi masalah?",
    answers: [
      { text: "Dihadapi dengan kepala dingin dan logika", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 2, jujur_cowok: 5 } },
      { text: "Curhat ke teman sambil menangis sedikit", scores: { normal: 1, femboy: 4, femgirl: 5, abnormal: 0, jujur_cewek: 5, jujur_cowok: 0 } },
      { text: "Bersembunyi di bawah selimut yang hangat", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 2, jujur_cewek: 3, jujur_cowok: 0 } },
      { text: "Masalah tidak ada jika saya tidak ada", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 15,
    text: "Apa yang paling kamu hargai dari orang lain?",
    answers: [
      { text: "Kecerdasan dan kemandirian mereka", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 1, jujur_cowok: 4 } },
      { text: "Kelembutan hati dan kasih sayang mereka", scores: { normal: 1, femboy: 4, femgirl: 5, abnormal: 0, jujur_cewek: 5, jujur_cowok: 2 } },
      { text: "Kejujuran mereka yang apa adanya", scores: { normal: 3, femboy: 2, femgirl: 2, abnormal: 0, jujur_cewek: 5, jujur_cowok: 5 } },
      { text: "Kemampuan mereka untuk tidak terlihat", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  },
  {
    id: 16,
    text: "Terakhir, bagaimana kamu ingin diingat?",
    answers: [
      { text: "Sebagai orang yang berguna dan sukses", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0, jujur_cewek: 2, jujur_cowok: 5 } },
      { text: "Sebagai sosok yang cantik dan menginspirasi", scores: { normal: 1, femboy: 3, femgirl: 5, abnormal: 0, jujur_cewek: 5, jujur_cowok: 0 } },
      { text: "Sebagai pribadi yang jujur dan tulus", scores: { normal: 3, femboy: 2, femgirl: 2, abnormal: 0, jujur_cewek: 5, jujur_cowok: 5 } },
      { text: "Sebagai legenda urban yang menakutkan", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5, jujur_cewek: 0, jujur_cowok: 0 } },
    ]
  }
];

export const RESULTS: Record<Category, SurveyResult> = {
  femboy: {
    category: 'femboy',
    title: "The Adorable Femboy",
    description: "Kamu adalah perpaduan sempurna antara keimutan dan keberanian untuk menjadi diri sendiri. Dengan pesona yang tak tertahankan, kamu suka mengekspresikan sisi lembutmu dan selalu menjadi pusat perhatian yang menggemaskan!",
    color: "bg-pink-400",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop"
  },
  femgirl: {
    category: 'femgirl',
    title: "The Elegant Femgirl",
    description: "Kamu sangat feminin, peduli dengan penampilan, dan memiliki aura yang anggun. Kamu suka hal-hal yang estetik dan cantik!",
    color: "bg-rose-400",
    imageUrl: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000&auto=format&fit=crop"
  },
  normal: {
    category: 'normal',
    title: "The Balanced Normal",
    description: "Kamu adalah orang yang stabil dan mengikuti norma sosial dengan baik. Kamu praktis, logis, dan tidak terlalu suka hal-hal yang berlebihan.",
    color: "bg-blue-400",
    imageUrl: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1000&auto=format&fit=crop"
  },
  abnormal: {
    category: 'abnormal',
    title: "The Chaos Abnormal",
    description: "Cara berpikirmu sangat unik, bahkan mungkin sedikit aneh bagi orang lain. Kamu tidak peduli dengan aturan dunia ini dan hidup di dimensimu sendiri!",
    color: "bg-purple-600",
    imageUrl: "https://images.unsplash.com/photo-1614583225154-5feade0473c2?q=80&w=1000&auto=format&fit=crop"
  },
  jujur_cewek: {
    category: 'jujur_cewek',
    title: "The Honest Sweetheart",
    description: "Kamu adalah sosok cewek yang sangat tulus dan apa adanya. Kejujuranmu adalah kecantikan utamamu, membuat orang lain merasa sangat nyaman dan percaya padamu di setiap situasi.",
    color: "bg-emerald-400",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop"
  },
  jujur_cowok: {
    category: 'jujur_cowok',
    title: "The Honest Gentleman",
    description: "Kamu adalah pria sejati yang memegang teguh kata-katamu. Kejujuran dan integritasmu adalah kekuatan terbesarmu yang sangat dikagumi oleh orang-orang di sekitarmu.",
    color: "bg-teal-600",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
  }
};
