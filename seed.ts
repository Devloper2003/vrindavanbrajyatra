import { db } from './src/lib/db'

async function seed() {
  console.log('🌱 Seeding database...')

  // Seed Blogs
  const existingBlogs = await db.blog.count()
  if (existingBlogs === 0) {
    await db.blog.createMany({
      data: [
        {
          title: 'Top 10 Must-Visit Temples in Vrindavan for Every Devotee',
          slug: 'top-10-must-visit-temples-vrindavan',
          excerpt: 'Vrindavan, the land of Lord Krishna, is home to thousands of temples. Here are the top 10 temples that every devotee must visit for a complete spiritual experience in Braj Bhoomi.',
          content: `<h2>Top 10 Must-Visit Temples in Vrindavan</h2>
<p>Vrindavan, the sacred land where Lord Krishna spent His childhood, is home to over 5,000 temples. Each temple holds a unique spiritual significance and tells a story of divine love.</p>
<h3>1. Banke Bihari Temple</h3>
<p>The most famous temple in Vrindavan, Banke Bihari Temple houses the beautiful deity of Lord Krishna in His tribhanga posture. The darshan here is unique and deeply moving.</p>
<h3>2. ISKCON Temple</h3>
<p>Built by the International Society for Krishna Consciousness, this magnificent temple attracts devotees from around the world.</p>
<h3>3. Prem Mandir</h3>
<p>A breathtakingly beautiful white marble temple depicting scenes from Krishna's leelas through intricate carvings and stunning lighting displays.</p>
<h3>4. Radha Raman Temple</h3>
<p>This ancient temple houses the self-manifested deity of Radha Raman, one of the most revered deities in Vrindavan.</p>
<h3>5. Madan Mohan Temple</h3>
<p>One of the oldest temples in Vrindavan, located near the Kali Ghat on the banks of Yamuna.</p>`,
          category: 'Temples & History',
          featuredImage: '/temple-1.png',
          published: true,
        },
        {
          title: 'Complete Guide to Govardhan Parikrama — Distance, Route & Tips',
          slug: 'govardhan-parikrama-complete-guide',
          excerpt: 'The Govardhan Parikrama is one of the most sacred pilgrimages in Braj Bhoomi. This comprehensive guide covers the route, distance, significance, and essential tips for devotees.',
          content: `<h2>Complete Guide to Govardhan Parikrama</h2>
<p>The Govardhan Parikrama is one of the most spiritually significant pilgrimages in Braj Bhoomi. Lord Krishna lifted the entire Govardhan Hill on His little finger to protect the residents of Braj.</p>
<h3>Significance</h3>
<p>According to the Padma Purana, performing the Govardhan Parikrama burns away all sins and grants liberation.</p>
<h3>Route & Distance</h3>
<p>The complete parikrama covers approximately 21 kilometers, passing through Radha Kund, Daan Ghati, Kusum Sarovar, and more.</p>
<h3>Tips</h3>
<p>Start early morning, carry water, wear comfortable shoes, and book a local guide for the best experience.</p>`,
          category: 'Braj Yatra Guides',
          featuredImage: '/govardhan.png',
          published: true,
        },
        {
          title: 'Best Time to Visit Braj Bhoomi — A Season-Wise Guide',
          slug: 'best-time-to-visit-braj-bhoomi',
          excerpt: 'Planning a Braj Yatra? Know the best time to visit Vrindavan, Mathura, and surrounding areas with this comprehensive season-wise guide.',
          content: `<h2>Best Time to Visit Braj Bhoomi</h2>
<p>Braj Bhoomi has a unique spiritual atmosphere that changes with every season. Each season brings its own festivals and experiences.</p>
<h3>Winter (October — March) ✨ RECOMMENDED</h3>
<p>Winter is the best time to visit. The weather is pleasant (8-25°C), making temple visits and parikrama comfortable.</p>
<h3>Spring (February — March)</h3>
<p>Spring in Braj means Holi! Experience the unique Lathmar Holi in Barsana and Phoolon ki Holi in Vrindavan.</p>
<h3>Summer (April — June)</h3>
<p>Hot but fewer crowds. Plan temple visits before 10 AM and after 5 PM.</p>
<h3>Monsoon (July — September)</h3>
<p>Monsoon transforms Braj into a green paradise. Janmashtami celebrations are the highlight!</p>`,
          category: 'Travel Tips',
          featuredImage: '/holi-festival.png',
          published: true,
        },
      ],
    })
    console.log('✅ Blogs seeded')
  } else {
    console.log('ℹ️ Blogs already exist, skipping')
  }

  // Seed Gallery Images
  const existingGallery = await db.galleryImage.count()
  if (existingGallery === 0) {
    await db.galleryImage.createMany({
      data: [
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
      ],
    })
    console.log('✅ Gallery images seeded')
  } else {
    console.log('ℹ️ Gallery images already exist, skipping')
  }

  console.log('🎉 Seeding complete!')
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect())
