const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const users = [
  {
    _id: new mongoose.Types.ObjectId("60d5ec49f1b2f9a7d1234561"),
    name: {
      first: "Uri",
      middle: "the",
      last: "User",
    },
    phone: "050-1234567",
    email: "user@gmail.com",
    password: bcrypt.hashSync("User123!", 10),
    image: {
      url: "http://127.0.0.1:3000/images/profiles/user.svg",
      alt: "User Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Haifa",
      street: "Lotus",
      houseNumber: 15,
      zip: 111111,
    },
    isAdmin: false,
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ec49f1b2f9a7d1234562"),
    name: {
      first: "Benny",
      middle: "the",
      last: "Business",
    },
    phone: "052-1234567",
    email: "biz@gmail.com",
    password: bcrypt.hashSync("Biz123!", 8),
    image: {
      url: "http://127.0.0.1:3000/images/profiles/business.svg",
      alt: "Business Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Tel Aviv",
      street: "Sderot Begin",
      houseNumber: 62,
      zip: 222222,
    },
    isAdmin: false,
  },
  {
    _id: new mongoose.Types.ObjectId("60d5ec49f1b2f9a7d1234563"),
    name: {
      first: "Arik",
      middle: "the",
      last: "Admin",
    },
    phone: "054-1234567",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("Admin123!", 8),
    image: {
      url: "http://127.0.0.1:3000/images/profiles/admin.svg",
      alt: "Admin Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Jerusalem",
      street: "King George",
      houseNumber: 120,
      zip: 333333,
    },
    isAdmin: true,
  },
];

// Gallery Images seed data
const galleryImages = [
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f6a"),
    title: "1",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865311/gallery/aqst7skbtj7t39x9ziwn.jpg",
      alt: "Gallery Image 1",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f6c"),
    title: "2",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865781/gallery/atbcildsc84bicktghb2.jpg",
      alt: "Gallery Image 2",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f6e"),
    title: "3",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865777/gallery/auwoafgt8hi3lvn8uvql.jpg",
      alt: "Gallery Image 3",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f70"),
    title: "4",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865547/gallery/b0rf2mmsa4siftknziic.jpg",
      alt: "Gallery Image 4",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f72"),
    title: "5",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865572/gallery/bys91pvobxiykylnh2fa.jpg",
      alt: "Gallery Image 5",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f74"),
    title: "6",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865436/gallery/cgtb2zkq3oqfu510wb7e.jpg",
      alt: "Gallery Image 6",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f76"),
    title: "7",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865309/gallery/ciitaadcjbapkhceefed.jpg",
      alt: "Gallery Image 7",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f78"),
    title: "8",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865290/gallery/ciqxn1x7swd1a14avwhv.jpg",
      alt: "Gallery Image 8",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f7a"),
    title: "9",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865843/gallery/csmyn2t1qjwtwqog4pj3.jpg",
      alt: "Gallery Image 9",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f7c"),
    title: "10",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865761/gallery/cvrdcwhc11sorgr1mdio.jpg",
      alt: "Gallery Image 10",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f7e"),
    title: "11",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865681/gallery/dkal414wh3ldc1exolmp.jpg",
      alt: "Gallery Image 11",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f80"),
    title: "12",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865337/gallery/dwcyzaagnmyxvc5zutkw.jpg",
      alt: "Gallery Image 12",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f82"),
    title: "13",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865840/gallery/e0c22oaad9pnkbyrhm53.jpg",
      alt: "Gallery Image 13",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f84"),
    title: "14",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865341/gallery/e20oibz3oy02vbf93n7e.jpg",
      alt: "Gallery Image 14",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f86"),
    title: "15",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865682/gallery/ehrve6ddirsdk4o5gkvg.jpg",
      alt: "Gallery Image 15",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f88"),
    title: "16",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865661/gallery/eifsoab1fsundyyzncpe.jpg",
      alt: "Gallery Image 16",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f8a"),
    title: "17",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865660/gallery/emashyaqoypm9rstvvpx.jpg",
      alt: "Gallery Image 17",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f8c"),
    title: "18",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865435/gallery/exan401porqsl5ek5hp8.jpg",
      alt: "Gallery Image 18",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f8e"),
    title: "19",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865310/gallery/ezasdowcqodjb5sq5jmp.jpg",
      alt: "Gallery Image 19",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f90"),
    title: "20",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865784/gallery/f2y6irwg98d5akg3ws2l.jpg",
      alt: "Gallery Image 20",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f92"),
    title: "21",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865778/gallery/feixs89dyfkzbblpgba9.jpg",
      alt: "Gallery Image 21",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f94"),
    title: "22",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865575/gallery/ghozm1kmi960iw7c2tgm.jpg",
      alt: "Gallery Image 22",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f96"),
    title: "23",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865523/gallery/hdmlmvcqybdi8n2nb0go.jpg",
      alt: "Gallery Image 23",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66c58cf94f1b6847727b8f98"),
    title: "24",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865801/gallery/hgyuelqi1o3zwtokdtp4.jpg",
      alt: "Gallery Image 23",
    },
  },
];

const products = [
  {
    _id: new mongoose.Types.ObjectId("66c5ce4b073adbb5e9dd7e32"),
    title: "גוון 302",
    description:
      "גוון 302 טורקיז מנצנץ, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865880/products/dzzxjahwpztcbujrqk1s.jpg",
      alt: "Product Image 1",
    },
    price: 40,
    bizNumber: 1,
    likes: [],
    createdAt: new Date("2024-08-21T11:23:56.002Z"),
    updatedAt: new Date("2024-08-21T11:23:56.002Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5ce86073adbb5e9dd7e36"),
    title: "גוון 266",
    description:
      "גוון 266 סגול בהיר, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865878/products/l2mfnrobzzka10awbcrj.jpg",
      alt: "Product Image 2",
    },
    price: 40,
    bizNumber: 2,
    likes: [],
    createdAt: new Date("2024-08-21T11:24:54.693Z"),
    updatedAt: new Date("2024-08-21T11:24:54.693Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5cebe073adbb5e9dd7e3a"),
    title: "גוון 234",
    description:
      "גוון 234 שחור, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865882/products/imwfmqmavo3iolfe9nwb.jpg",
      alt: "Product Image 3",
    },
    price: 40,
    bizNumber: 3,
    likes: [],
    createdAt: new Date("2024-08-21T11:25:50.547Z"),
    updatedAt: new Date("2024-08-21T11:25:50.547Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5ceed073adbb5e9dd7e3e"),
    title: "גוון 40",
    description:
      "גוון 40 אדום, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865881/products/lwqb3kql4jlxctlfa4ep.jpg",
      alt: "Product Image 4",
    },
    price: 40,
    bizNumber: 4,
    likes: [],
    createdAt: new Date("2024-08-21T11:26:37.974Z"),
    updatedAt: new Date("2024-08-21T11:26:37.974Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5cf27073adbb5e9dd7e42"),
    title: "גוון 31",
    description:
      "גוון 31 ורוד זוהר, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865882/products/ijgpdirbspsndhdjjtrz.jpg",
      alt: "Product Image 5",
    },
    price: 40,
    bizNumber: 5,
    likes: [],
    createdAt: new Date("2024-08-21T11:27:35.926Z"),
    updatedAt: new Date("2024-08-21T11:27:35.926Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5cf8f073adbb5e9dd7e46"),
    title: "גוון 054",
    description:
      "גוון 054 סגול כחול, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865883/products/jpbnfujc8d2878afnngs.jpg",
      alt: "Product Image 6",
    },
    price: 40,
    bizNumber: 6,
    likes: [],
    createdAt: new Date("2024-08-21T11:29:19.828Z"),
    updatedAt: new Date("2024-08-21T11:29:19.828Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5cfbf073adbb5e9dd7e4a"),
    title: "גוון 152",
    description:
      "גוון 152 כחול כהה, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865884/products/dbit8pnvpiklqzql9za6.jpg",
      alt: "Product Image 7",
    },
    price: 40,
    bizNumber: 7,
    likes: [],
    createdAt: new Date("2024-08-21T11:30:07.706Z"),
    updatedAt: new Date("2024-08-21T11:30:07.706Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5cfe7073adbb5e9dd7e4e"),
    title: "גוון 84",
    description:
      "גוון 84 כתום בוהק, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865885/products/srsyv1sgrvaqkzchxaba.jpg",
      alt: "Product Image 8",
    },
    price: 40,
    bizNumber: 8,
    likes: [],
    createdAt: new Date("2024-08-21T11:30:47.375Z"),
    updatedAt: new Date("2024-08-21T11:30:47.375Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5d01f073adbb5e9dd7e52"),
    title: "גוון 353",
    description:
      "גוון 353 סגלגל, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865886/products/n5hbbfzys0jxwzlnpran.jpg",
      alt: "Product Image 9",
    },
    price: 40,
    bizNumber: 9,
    likes: [],
    createdAt: new Date("2024-08-21T11:31:43.987Z"),
    updatedAt: new Date("2024-08-21T11:31:43.987Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5d040073adbb5e9dd7e56"),
    title: "גוון 198",
    description:
      "גוון 198 ירוק זית, 15 מ''ל של חברת RIO. רמת איטום מושלמת מהשכבה הראשונה, בעל מברשת גמישה ונוחה לשימוש המסייעת במריחה מדוייקת.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865887/products/jcidi2kzptw7nikv3lpb.jpg",
      alt: "Product Image 10",
    },
    price: 40,
    bizNumber: 10,
    likes: [],
    createdAt: new Date("2024-08-21T11:32:16.809Z"),
    updatedAt: new Date("2024-08-21T11:32:16.809Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5d107073adbb5e9dd7e5a"),
    title: "סט מכחולים",
    description:
      "סט 4 מכחולים איכותיים XS,S,M,L בעלי מברשת גמישה, דקה ונוחה לציורים.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865907/products/l2xkwa0fhbool9eybrz3.jpg",
      alt: "Product Image 11",
    },
    price: 80,
    bizNumber: 11,
    likes: [],
    createdAt: new Date("2024-08-21T11:35:35.691Z"),
    updatedAt: new Date("2024-08-21T11:35:35.691Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5d192073adbb5e9dd7e5e"),
    title: "צבתית",
    description: "צבתית סטאלקס 8*20",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865907/products/mpbbvftnroastzokivhb.jpg",
      alt: "Product Image 12",
    },
    price: 120,
    bizNumber: 12,
    likes: [],
    createdAt: new Date("2024-08-21T11:37:54.436Z"),
    updatedAt: new Date("2024-08-21T11:37:54.436Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5d1fe073adbb5e9dd7e62"),
    title: "ראשי הסרה",
    description:
      "ראשי הסרה תוצרת רוסיה בעלי להבים חדים להסרה מהירה וקלה של צבעים ובייסים.",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865908/products/iqr8vdmh5qjcr0krusvm.jpg",
      alt: "Product Image 13",
    },
    price: 70,
    bizNumber: 13,
    likes: [],
    createdAt: new Date("2024-08-21T11:39:42.348Z"),
    updatedAt: new Date("2024-08-21T11:39:42.348Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5d26a073adbb5e9dd7e66"),
    title: "מפרידי פנינה",
    description: "מפרידי אצבעות פנינה לפדיקור",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865909/products/n9uyja90kt79ajegaigd.jpg",
      alt: "Product Image 14",
    },
    price: 30,
    bizNumber: 14,
    likes: [],
    createdAt: new Date("2024-08-21T11:41:30.364Z"),
    updatedAt: new Date("2024-08-21T11:41:30.364Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66c5d2f9073adbb5e9dd7e6e"),
    title: "תנור כלים",
    description: "תנור חיטוי ועיקור כלים",
    image: {
      url: "https://res.cloudinary.com/drvvjiatz/image/upload/v1722865940/products/hxxpbouun7wr1qtgeaem.jpg",
      alt: "Product Image 15",
    },
    price: 350,
    bizNumber: 15,
    likes: [],
    createdAt: new Date("2024-08-21T11:43:53.000Z"),
    updatedAt: new Date("2024-08-21T11:43:53.000Z"),
  },
];

module.exports = { users, galleryImages, products };
