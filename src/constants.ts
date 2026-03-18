import { Question, SurveyResult, Category } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Bagaimana gaya berpakaian favoritmu?",
    answers: [
      { text: "Maskulin dan rapi", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0 } },
      { text: "Imut dan berwarna pastel", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 1 } },
      { text: "Feminin dan elegan", scores: { normal: 2, femboy: 0, femgirl: 5, abnormal: 0 } },
      { text: "Apapun yang aneh dan mencolok", scores: { normal: 0, femboy: 1, femgirl: 1, abnormal: 5 } },
    ]
  },
  {
    id: 2,
    text: "Apa hobi utamamu di waktu luang?",
    answers: [
      { text: "Olahraga atau gaming kompetitif", scores: { normal: 4, femboy: 1, femgirl: 0, abnormal: 0 } },
      { text: "Skincare dan dandan", scores: { normal: 0, femboy: 4, femgirl: 5, abnormal: 0 } },
      { text: "Cosplay atau koleksi barang lucu", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 2 } },
      { text: "Berbicara dengan diri sendiri", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 3,
    text: "Pilih minuman favoritmu:",
    answers: [
      { text: "Kopi hitam atau air putih", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0 } },
      { text: "Milk tea atau boba", scores: { normal: 1, femboy: 4, femgirl: 4, abnormal: 0 } },
      { text: "Jus buah segar", scores: { normal: 3, femboy: 1, femgirl: 3, abnormal: 0 } },
      { text: "Minuman berenergi dicampur kecap", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 4,
    text: "Bagaimana caramu menyapa teman?",
    answers: [
      { text: "Woi, apa kabar?", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0 } },
      { text: "Halo~ (dengan nada ceria)", scores: { normal: 1, femboy: 4, femgirl: 4, abnormal: 0 } },
      { text: "Nyaa~ atau UwU", scores: { normal: 0, femboy: 5, femgirl: 2, abnormal: 3 } },
      { text: "(Hanya menatap tajam)", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 5,
    text: "Apa pendapatmu tentang rok?",
    answers: [
      { text: "Hanya untuk wanita", scores: { normal: 5, femboy: 0, femgirl: 2, abnormal: 0 } },
      { text: "Sangat nyaman dan lucu!", scores: { normal: 0, femboy: 5, femgirl: 5, abnormal: 0 } },
      { text: "Biasa saja", scores: { normal: 3, femboy: 1, femgirl: 1, abnormal: 0 } },
      { text: "Saya lebih suka pakai karung", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 6,
    text: "Pilih warna yang paling menggambarkanmu:",
    answers: [
      { text: "Biru atau Hitam", scores: { normal: 5, femboy: 1, femgirl: 0, abnormal: 0 } },
      { text: "Pink atau Putih", scores: { normal: 0, femboy: 5, femgirl: 5, abnormal: 0 } },
      { text: "Ungu atau Kuning", scores: { normal: 2, femboy: 3, femgirl: 3, abnormal: 1 } },
      { text: "Warna yang tidak bisa dilihat manusia", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 7,
    text: "Apa reaksi kamu saat melihat kucing?",
    answers: [
      { text: "Lucu ya", scores: { normal: 4, femboy: 1, femgirl: 2, abnormal: 0 } },
      { text: "KYAAA! GEMES BANGET!", scores: { normal: 0, femboy: 4, femgirl: 5, abnormal: 0 } },
      { text: "Menirukan suaranya (Meow~)", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 2 } },
      { text: "Mencoba berkomunikasi secara telepati", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 8,
    text: "Bagaimana caramu tertawa di chat?",
    answers: [
      { text: "Wkwkwk atau Hahaha", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0 } },
      { text: "Hehehe~ atau Hihi", scores: { normal: 1, femboy: 5, femgirl: 4, abnormal: 0 } },
      { text: "Aksjdhfksjdh (Keyboard smash)", scores: { normal: 0, femboy: 3, femgirl: 5, abnormal: 2 } },
      { text: "55555 atau ( )", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 9,
    text: "Apa cita-citamu?",
    answers: [
      { text: "Sukses dan kaya raya", scores: { normal: 5, femboy: 1, femgirl: 1, abnormal: 0 } },
      { text: "Menjadi idol atau influencer", scores: { normal: 1, femboy: 4, femgirl: 5, abnormal: 0 } },
      { text: "Menjadi maid yang imut", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 2 } },
      { text: "Menguasai galaksi lain", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 10,
    text: "Pilih aksesoris favoritmu:",
    answers: [
      { text: "Jam tangan", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0 } },
      { text: "Choker atau pita", scores: { normal: 0, femboy: 5, femgirl: 4, abnormal: 1 } },
      { text: "Anting atau kalung", scores: { normal: 2, femboy: 2, femgirl: 5, abnormal: 0 } },
      { text: "Topeng gas", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 11,
    text: "Bagaimana perasaanmu hari ini?",
    answers: [
      { text: "Biasa saja, produktif", scores: { normal: 5, femboy: 0, femgirl: 0, abnormal: 0 } },
      { text: "Merasa cantik/ganteng dan ceria", scores: { normal: 2, femboy: 4, femgirl: 4, abnormal: 0 } },
      { text: "Ingin dimanja", scores: { normal: 0, femboy: 5, femgirl: 5, abnormal: 1 } },
      { text: "Saya merasa seperti entitas digital", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  },
  {
    id: 12,
    text: "Terakhir, apa itu cinta?",
    answers: [
      { text: "Komitmen dan kasih sayang", scores: { normal: 5, femboy: 1, femgirl: 2, abnormal: 0 } },
      { text: "Sesuatu yang manis dan indah", scores: { normal: 2, femboy: 4, femgirl: 5, abnormal: 0 } },
      { text: "Headpats dan pelukan", scores: { normal: 0, femboy: 5, femgirl: 3, abnormal: 1 } },
      { text: "Cinta adalah bug dalam sistem", scores: { normal: 0, femboy: 0, femgirl: 0, abnormal: 5 } },
    ]
  }
];

export const RESULTS: Record<Category, SurveyResult> = {
  femboy: {
    category: 'femboy',
    title: "The Adorable Femboy",
    description: "Kamu memiliki jiwa yang sangat imut dan suka mengekspresikan sisi femininmu meskipun kamu laki-laki. Kamu suka barang-barang lucu dan perhatian!",
    color: "bg-pink-400",
    imageUrl: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000&auto=format&fit=crop" // Anime girl style
  },
  femgirl: {
    category: 'femgirl',
    title: "The Elegant Femgirl",
    description: "Kamu sangat feminin, peduli dengan penampilan, dan memiliki aura yang anggun. Kamu suka hal-hal yang estetik dan cantik!",
    color: "bg-rose-400",
    imageUrl: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop" // Elegant anime girl
  },
  normal: {
    category: 'normal',
    title: "The Balanced Normal",
    description: "Kamu adalah orang yang stabil dan mengikuti norma sosial dengan baik. Kamu praktis, logis, dan tidak terlalu suka hal-hal yang berlebihan.",
    color: "bg-blue-400",
    imageUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop" // Sigma/Cool anime male
  },
  abnormal: {
    category: 'abnormal',
    title: "The Chaos Abnormal",
    description: "Cara berpikirmu sangat unik, bahkan mungkin sedikit aneh bagi orang lain. Kamu tidak peduli dengan aturan dunia ini dan hidup di dimensimu sendiri!",
    color: "bg-purple-600",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop" // Chaotic/Unique anime style
  }
};
