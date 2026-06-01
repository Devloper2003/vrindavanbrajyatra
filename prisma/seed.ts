import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Blogs
  const blog1 = await prisma.blog.upsert({
    where: { slug: 'top-10-must-visit-temples-vrindavan' },
    update: {},
    create: {
      title: 'Top 10 Must-Visit Temples in Vrindavan for Every Devotee',
      slug: 'top-10-must-visit-temples-vrindavan',
      excerpt: 'Vrindavan, the land of Lord Krishna, is home to thousands of temples. Here are the top 10 temples that every devotee must visit for a complete spiritual experience in Braj Bhoomi.',
      content: '<h2>Top 10 Must-Visit Temples in Vrindavan</h2><p>Vrindavan, the sacred land where Lord Krishna spent His childhood, is home to over 5,000 temples. Each temple holds a unique spiritual significance and tells a story of divine love. Here are the top 10 temples that every devotee must visit:</p><h3>1. Banke Bihari Temple</h3><p>The most famous temple in Vrindavan, Banke Bihari Temple houses the beautiful deity of Lord Krishna in His "tribhanga" posture. The darshan here is unique — the curtains are drawn periodically to shield the Lord from the intense love of His devotees.</p><h3>2. ISKCON Temple (Krishna Balaram Mandir)</h3><p>Built by the International Society for Krishna Consciousness, this magnificent temple attracts devotees from around the world. The evening kirtan here is an experience not to be missed.</p><h3>3. Prem Mandir</h3><p>A breathtakingly beautiful white marble temple depicting scenes from Krishna leelas through intricate carvings and stunning lighting displays.</p><h3>4. Radha Raman Temple</h3><p>This ancient temple houses the self-manifested deity of Radha Raman, one of the most revered deities in Vrindavan.</p><h3>5. Madan Mohan Temple</h3><p>One of the oldest temples in Vrindavan, located near the Kali Ghat on the banks of Yamuna.</p><h3>6. Radha Vallabh Temple</h3><p>Known for its unique tradition where Radha and Krishna are worshipped together as one.</p><h3>7. Shahji Temple</h3><p>Famous for its spiral pillars and beautiful architecture.</p><h3>8. Rangaji Temple</h3><p>Built in Dravidian architectural style, this temple is unique in Vrindavan.</p><h3>9. Nidhivan</h3><p>The most mystical place in Vrindavan, where Krishna performs His Raas Leela every night.</p><h3>10. Seva Kunj</h3><p>The garden where Radha and Krishna would meet, charged with devotion.</p><h2>Tips for Temple Visits</h2><ul><li>Visit early morning for the best darshan experience</li><li>Dress modestly and remove shoes before entering</li><li>Book a local guide for proper darshan planning</li></ul>',
      category: 'Temples & History',
      featuredImage: '/temple-1.png',
      published: true,
    },
  })

  const blog2 = await prisma.blog.upsert({
    where: { slug: 'govardhan-parikrama-complete-guide' },
    update: {},
    create: {
      title: 'Complete Guide to Govardhan Parikrama — Distance, Route & Tips',
      slug: 'govardhan-parikrama-complete-guide',
      excerpt: 'The Govardhan Parikrama is one of the most sacred pilgrimages in Braj Bhoomi. This comprehensive guide covers the route, distance, significance, and essential tips for devotees.',
      content: '<h2>Complete Guide to Govardhan Parikrama</h2><p>The Govardhan Parikrama (circumambulation of Govardhan Hill) is one of the most spiritually significant pilgrimages in Braj Bhoomi. It is believed that Lord Krishna lifted the entire Govardhan Hill on His little finger to protect the residents of Braj from the wrath of Indra.</p><h3>Significance</h3><p>According to the Padma Purana, performing the Govardhan Parikrama burns away all sins and grants liberation. The hill itself is considered a form of Lord Krishna.</p><h3>Route & Distance</h3><p>The complete Govardhan Parikrama covers approximately 21 kilometers (14 miles). The route passes through: Radha Kund & Shyam Kund, Daan Ghati, Kusum Sarovar, Govind Kund, Punchari Ka Lotha, Mansi Ganga.</p><h3>How Long Does It Take?</h3><p>Walking the complete parikrama takes about 5-7 hours at a moderate pace. For those unable to walk, vehicle parikrama options are available.</p><h3>Essential Tips</h3><ul><li>Start early morning (4-5 AM) to avoid the heat</li><li>Carry sufficient water and light snacks</li><li>Wear comfortable walking shoes</li><li>Best time: October to March</li></ul>',
      category: 'Braj Yatra Guides',
      featuredImage: '/govardhan.png',
      published: true,
    },
  })

  const blog3 = await prisma.blog.upsert({
    where: { slug: 'best-time-to-visit-braj-bhoomi' },
    update: {},
    create: {
      title: 'Best Time to Visit Braj Bhoomi — A Season-Wise Guide',
      slug: 'best-time-to-visit-braj-bhoomi',
      excerpt: 'Planning a Braj Yatra? Know the best time to visit Vrindavan, Mathura, and surrounding areas. This season-wise guide helps you plan the perfect spiritual journey.',
      content: '<h2>Best Time to Visit Braj Bhoomi</h2><p>Braj Bhoomi, the sacred land of Lord Krishna, has a unique spiritual atmosphere that changes with every season. Each season brings its own festivals and special experiences.</p><h3>Winter (October — March) — RECOMMENDED</h3><p>Winter is the best time to visit. The weather is pleasant (8-25°C), making temple visits and parikrama comfortable. This season includes Kartik Month, Govardhan Puja, and Sharad Purnima.</p><h3>Spring (February — March)</h3><p>Spring in Braj means Holi! Experience Lathmar Holi in Barsana, Phoolon ki Holi in Vrindavan, and the unique Widows Holi celebration.</p><h3>Summer (April — June)</h3><p>Summer is hot (35-45°C) but fewer crowds mean peaceful darshan. Plan temple visits before 10 AM and after 5 PM.</p><h3>Monsoon (July — September)</h3><p>The monsoon transforms Braj into a lush green paradise. Janmashtami, the biggest festival, is celebrated with great grandeur in Mathura and Vrindavan.</p><h2>Our Recommendation</h2><p>For the most comfortable experience, visit between October and March. For unique festivals, plan around Holi or Janmashtami.</p>',
      category: 'Travel Tips',
      featuredImage: '/holi-festival.png',
      published: true,
    },
  })

  // Seed Gallery Images
  const galleryImages = [
    { src: '/temple-1.png', alt: 'Banke Bihari Temple in Vrindavan', category: 'Temples' },
    { src: '/yamuna-aarti.png', alt: 'Yamuna Aarti ceremony at Vrindavan ghat', category: 'Darshan' },
    { src: '/yatra-group.png', alt: 'Devotees on Braj Yatra pilgrimage', category: 'Yatra Groups' },
    { src: '/holi-festival.png', alt: 'Holi festival celebrations in Braj', category: 'Festivals' },
    { src: '/govardhan.png', alt: 'Govardhan Hill sacred parikrama path', category: 'Temples' },
    { src: '/barsana.png', alt: 'Barsana - Shri Radha Rani Temple', category: 'Temples' },
    { src: '/mathura.png', alt: 'Mathura city - Birthplace of Lord Krishna', category: 'Darshan' },
    { src: '/nandgaon.png', alt: 'Nandgaon village - Home of Nanda Maharaj', category: 'Darshan' },
    { src: '/krishna-flute.png', alt: 'Lord Krishna playing His divine flute', category: 'Darshan' },
    { src: '/hero-bg.png', alt: 'Vrindavan sunrise over the holy Yamuna', category: 'Darshan' },
  ]

  for (const img of galleryImages) {
    await prisma.galleryImage.upsert({
      where: { id: img.src.replace('/', '').replace('.png', '') },
      update: {},
      create: img,
    })
  }

  console.log('✅ Seed data created successfully!')
  console.log(` - ${3} blogs`)
  console.log(` - ${galleryImages.length} gallery images`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
